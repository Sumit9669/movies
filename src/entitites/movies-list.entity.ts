import mongoose, { Schema } from 'mongoose';

import { MongoCollections } from '@constants/mongo.constant';
import { IMovie } from './interfaces/movies.interface';

/** mongoose schema for institute users
 */
export const movieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: false,
    },
    genre: {
      type: String,
      trim: true,
      required: false,
    },

    releaseDate: {
      type: Date,
      trim: true,
      required: false,
    },

    director: {
      type: String,
      trim: true,
      required: false,
    },
    actors: {
      type: Array,
      trim: true,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

// Complex export so that findByCredential static method can be added to schema.
export const moviesModel = mongoose.model<IMovie>(
  MongoCollections.movies,
  movieSchema
);
