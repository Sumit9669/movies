import logger from "@shared/logger";
import mongoose from "mongoose";
import app from "@server";

class Database {
  /**
   * Get DB Instance
   */
  public static async getDBInstance() {
    if (!Database.instance) {
      try {
        console.log("mongo connection created");
        Database.instance = new Database();
      } catch (error: any) {
        console.log("Mongo Connection ERROR! " + error);
        process.exit(1);
      }
    }

    return Database.instance;
  }

  constructor() {
    const url = `mongodb://${this.user}:${this.pass}@${this.host}​​​​​​​​:${this.port}​​​​​​​​​​​​​​​​?connectTimeoutMS=10000`;
    const clientOption = {
      socketTimeoutMS: 30000,
      useNewUrlParser: true,
      autoIndex: false,
      useUnifiedTopology: true,
    };

    const db = mongoose.createConnection(url, clientOption);

    db.on(
      "error",
      console.error.bind(console, "MongoDB Connection Error>> : ")
    );
    db.once("open", () => {
      console.log("client MongoDB Connection ok!");
    });

    process.on("SIGINT", () => {
      mongoose.connection.close();
      process.exit(0);
    });

    app.set("DB", db);
  }

  private static instance: any = null;
  private host: string = process.env.NOSQL_DB_HOST || "localhost";
  private user: string = process.env.NOSQL_DB_USER || "";
  private pass: string = process.env.NOSQL_DB_PASS || "";
  private port: string = process.env.NOSQL_DB_PORT || "27017";
}

export { Database };
