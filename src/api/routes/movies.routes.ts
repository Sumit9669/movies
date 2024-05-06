// Module imports
import { Router, Request, Response } from "express";
import { NextFunction } from "express";
import { createValidator } from "express-joi-validation";

// Files imports
import { MessageConstants } from "@constants/response.constants";
import { GeneralHttpExceptions } from "src/custom-exceptions/general-exceptions.constants";
import MyMoviesException from "src/custom-exceptions/my-movies.exception";
import { MoviesValidation } from "src/schema-validations";
import { MyMoviesService } from "../services/my-movies.service";
import { checkJwt } from "src/middlewares/check-token";
const validator = createValidator({ passError: true });
const basePath = "/books";
const moviesSvc = new MyMoviesService();
class MoviesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get(
      "/my-movies-list/",
      [validator.query(MoviesValidation.movieQueryParam)],
      checkJwt,
      this.getMyMoviesList
    );
    this.router.post(
      "/my-movies-list",
      [validator.body(MoviesValidation.watchList)],
      checkJwt,
      this.addMyMovies
    );
    this.router.delete(
      "/my-movies-list/:contentId",
      [validator.params(MoviesValidation.movieDetail)],
      checkJwt,
      this.deleteMoviesById
    );
  }
  /**
   * @swagger
   * /my-movies-list/{contentId}:
   *  delete:
   *    summary: Remove Movie
   *    security:
   *      - BearerAuth:  []
   *    tags: [My-Movies]
   *    consumes:
   *      application/json
   *    produce:
   *      application/json
   *    description: To remove movie by id
   *    parameters:
   *         - $ref: '#/components/parameters/contentId'
   *    responses:
   *      '200':
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  status:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                   type: string
   *                   example: 'Movie deleted successfully'
   */
  async deleteMoviesById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await moviesSvc.removeMovieFromList(
        (req as any).headers.userId as string,
        req.params.contentId
      );
      return res.json({
        status: true,
        message: MessageConstants.general.deleted,
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof MyMoviesException) {
        throw error;
      } else {
        throw new MyMoviesException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }

  /**
   * @swagger
   * /my-movies-list:
   *  get:
   *    summary: My movie List
   *    security:
   *      - BearerAuth:  []
   *    tags: [My-Movies]
   *    consumes:
   *      application/json
   *    produce:
   *      application/json
   *    description: Get My Movie list
   *    responses:
   *      '200':
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                  status:
   *                    type: boolean
   *                    example: true
   *                  message:
   *                   type: string
   *                   example: 'data fetched'
   */
  async getMyMoviesList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await moviesSvc.getMyMoviesList(
        (req as any).headers.userId as string,
        req.query.filter
      );
      return res.json({
        status: true,
        message: MessageConstants.general.dataFetch,
        data: result,
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof MyMoviesException) {
        throw error;
      } else {
        throw new MyMoviesException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }

  /**
   * @swagger
   * /my-movies-list/:
   *  post:
   *   summary: To create book
   *   description: api to allow user to save movie in watch list
   *   security:
   *     - BearerAuth:  []
   *   tags: [My-Movies]
   *   requestBody:
   *    content:
   *     application/json:
   *      schema:
   *        type: object
   *        properties:
   *          contentId:
   *            type: string
   *            required: true
   *          rating:
   *            type: string
   *            required: true
   *          type:
   *            type: string
   *            required: true
   *   responses:
   *    '200':
   *       description: success
   *
   *
   */

  async addMyMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await moviesSvc.updateMovieList(
        (req as any).headers.userId as string,
        req.body
      );
      return res.json({
        status: true,
        message: MessageConstants.general.saved,
        data: result,
      });
    } catch (error: any) {
      // To check if error type is internal server error or not
      if (error instanceof MyMoviesException) {
        throw error;
      } else {
        throw new MyMoviesException(
          GeneralHttpExceptions.InternalServerException,
          error.message,
          error.stackTrace || error.stack,
          error
        );
      }
    }
  }
}
export = new MoviesRouter().router;
