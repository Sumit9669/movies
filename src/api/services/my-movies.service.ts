// File imports
import { HttpService } from "@shared/http.service";
import { CommonFunctions } from "@shared/common-functions";
import { SchemaSet } from "@constants/common.constants";
import app from "@server";
import { myWatchListSchema } from "src/entitites/my-watch-list.entity";
import { userSchema } from "src/entitites/users.entity";
import { movieSchema } from "src/entitites/movies-list.entity";
import { isNull } from "lodash";
import MyMoviesException from "src/custom-exceptions/my-movies.exception";
import { GeneralHttpExceptions } from "src/custom-exceptions";
import MessageConstants from "@constants/response.constants";

const commonFunction = new CommonFunctions();

export class MyMoviesService {
  httpService: HttpService;
  constructor() {
    this.httpService = new HttpService();
  }
  /**
   * This TypeScript function retrieves a user's movie watch history and user details based on the
   * provided user ID and filter.
   * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
   * the user for whom you want to retrieve the movies list.
   * @param {any} filter - The `filter` parameter in the `getMyMoviesList` function is currently not
   * being used in the code snippet you provided. If you want to implement filtering based on the
   * `filter` parameter, you can modify the `watchListModel.find()` method to apply the filter
   * conditions.
   * @returns The `getMyMoviesList` function is returning an object that includes user information and a
   * list of watch history. The user information is retrieved from the `userModel` and the watch history
   * is retrieved from the `watchListModel`. The returned object includes the user information and the
   * watch history as `watchHistory`.
   */

  async getMyMoviesList(userId: string, filter: any) {
    let dbConn = app.get("DB");
    const db = await dbConn.useDb(
      "my_movies_list",
      app.get("mongoUseDbConfig")
    );
    dbConn = db;
    const userModel = await dbConn.model(SchemaSet.user.name, userSchema);
    const watchListModel = await dbConn.model(
      SchemaSet.watchList.name,
      myWatchListSchema
    );
    const watchList = await watchListModel
      .find({ userId }, { _id: 0 })
      .limit(10);
    const user = await userModel.findOne({ _id: userId }, { _id: 0 }).lean();
    return {
      ...user,
      watchHistory: watchList,
    };
  }
  /**
   * The function `updateMovieList` updates a user's movie list by adding a movie to their watched list
   * and updating their favorite genres if necessary.
   * @param {string} userId - The `userId` parameter in the `updateMovieList` function represents the
   * unique identifier of the user for whom the movie list is being updated. It is a string type that is
   * used to query and update user-related information in the database.
   * @param body - The `body` parameter in the `updateMovieList` function contains two properties:
   * @returns The `updateMovieList` function is returning a boolean value `true` indicating that the
   * movie list update was successful.
   */

  async updateMovieList(
    userId: string,
    body: {
      contentId: string;
      type: string;
    }
  ) {
    // get movie detail
    let dbConn = app.get("DB");
    const db = await dbConn.useDb(
      "my_movies_list",
      app.get("mongoUseDbConfig")
    );
    dbConn = db;
    const userModel = await dbConn.model(SchemaSet.user.name, userSchema);
    const moviesModel = await dbConn.model(SchemaSet.movies.name, movieSchema);
    const [user, movies] = await Promise.all([
      userModel.findOne({ _id: userId }),
      moviesModel.findOne({ _id: body.contentId }).lean(),
    ]);
    if (isNull(movies)) {
      throw new MyMoviesException(
        GeneralHttpExceptions.EntityNotFoundException,
        MessageConstants.general.entityNotFound
      );
    }
    const watchListModel = await dbConn.model(
      SchemaSet.watchList.name,
      myWatchListSchema
    );
    const genre: string[] = user?.preferences?.favoriteGenres || [];

    if (!genre.includes(movies.genres)) {
      await userModel.findOneAndUpdate(
        { _id: userId },
        {
          preferences: {
            favoriteGenres: [...genre, movies.genres],
            dislikedGenres: user?.preferences?.dislikedGenres ?? [],
          },
        },
        { lean: true, new: true }
      );
    }
    const newWatchedContent = new watchListModel({
      userId,
      contentId: body.contentId,
      watchedOn: new Date(),
      type: body.type,
    });
    await newWatchedContent.save();

    return true;
  }

  /**
   * This TypeScript function removes a movie from a user's watch list in a MongoDB database.
   * @param {string} contentId - The `contentId` parameter in the `removeMovieFromList` function
   * represents the unique identifier of the movie or content that you want to remove from a user's
   * watch list. It is used to specify which specific content should be removed from the list.
   * @param {string} userId - The `userId` parameter in the `removeMovieFromList` function represents
   * the unique identifier of the user whose movie is being removed from the list.
   * @returns The `removeMovieFromList` function returns an object with a message property. The message
   * property value depends on the outcome of the deletion operation:
   * - If a document was successfully deleted, it returns: `{ message: "Successfully deleted one
   * document." }`
   * - If no documents matched the query and hence no documents were deleted, it returns: `{ message:
   * "No documents matched the query. Deleted
   */
  async removeMovieFromList(contentId: string, userId: string) {
    let dbConn = app.get("DB");
    const db = await dbConn.useDb(
      "my_movies_list",
      app.get("mongoUseDbConfig")
    );
    dbConn = db;
    const query = { contentId, userId };
    const watchListModel = await dbConn.model(
      SchemaSet.watchList.name,
      myWatchListSchema
    );
    const moviesModel = await dbConn.model(SchemaSet.movies.name, movieSchema);
    const movies = await moviesModel.findOne({ _id: contentId }).lean();
    if (isNull(movies)) {
      throw new MyMoviesException(
        GeneralHttpExceptions.EntityNotFoundException,
        MessageConstants.general.entityNotFound
      );
    }
    const collectionData = await watchListModel.find(query);
    const deletedDoc = await watchListModel.deleteMany(query);
    if (deletedDoc.deletedCount === 1) {
      return { message: "Successfully deleted one document." };
    } else {
      return {
        message: "No documents matched the query. Deleted 0 documents.",
      };
    }
  }
}
