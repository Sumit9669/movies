import mongoose, { Schema } from 'mongoose';

import { MongoCollections } from '@constants/mongo.constant';
import { IMovie } from './interfaces/movies.interface';

/** mongoose schema for institute users
 */
export const myWatchListSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      trim: true,
      required: true,
    },

    contentId: {
      type: String,
      trim: true,
      required: true,
    },
    watchedOn: {
      type: Date,
      trim: true,
      required: true,
    },

    rating: {
      type: Number,
      trim: true,
      required: false,
      default: null,
    },
    type: {
      type: String,
      trim: true,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

// Complex export so that findByCredential static method can be added to schema.
export const moviesModel = mongoose.model<IMovie>(
  MongoCollections.watch_list,
  myWatchListSchema
);
