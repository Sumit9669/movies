// Delete a document

import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string
const uri = `mongodb://${process.env.NOSQL_DB_USER || ""}:${
  process.env.NOSQL_DB_PASS || ""
}@${process.env.NOSQL_DB_HOST}​​​​​​​​:${
  process.env.NOSQL_DB_PORT
}​​​​​​​​​​​​​​​​?connectTimeoutMS=10000`;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("my_movies_list");
    database.createCollection("movies");
    database.createCollection("users");
    database.createCollection("tv_shows");
    database.createCollection("user_watch_lists");
    const movies = database.collection("movies");
    const users = database.collection("users");
    const tvShowa = database.collection("tv_shows");

    const userDoc = {
      username: "testUser",
      preferences: {
        favoriteGenres: [],
        dislikedGenres: [],
      },
    };
    const movieDoc = {
      title: "legend of Gong",
      description:
        "Tribe aihilated by king , solo surviver of tribe named gong wished to take revenge from king.",
      genres: ["Action", "Drama"],
      releaseDate: Date,
      director: "Lui Wang",
      actors: ["NIama", "Curi Kong", "Lai ba"],
    };
    const tvShowDoc = {
      title: "legend of li",
      description:
        "A phinux who never suppose to be born, lead the world towards destruction.",
      genres: ["Action", "RomCom"],
      episodes: [
        {
          episodeNumber: 1,
          seasonNumber: 1,
          releaseDate: Date,
          director: "Kui Ba",
          actors: ["Ro lin", "Shin ma", "Tri Chi"],
        },
      ],
    };

    const [userDetail, movieDetail, tvShowDetail] = await Promise.all([
      users.insertOne(userDoc),
      movies.insertOne(movieDoc),
      tvShowa.insertOne(tvShowDoc),
    ]);

    /* Print a message that indicates whether the operation deleted a
    document */
    console.log(
      `users documents were inserted with the _id: ${userDetail.insertedId}`
    );
  } finally {
    // Close the connection after the operation completes
    await client.close();
    process.exit(1);
  }
}
// Run the program and print any thrown exceptions
run().catch(console.dir);
