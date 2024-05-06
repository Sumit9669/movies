import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { MongoCollections } from '@constants/mongo.constant';
import { ITVShow } from './interfaces/movies.interface';

/** mongoose schema for institute users
 */
export const tvShowSchema: Schema = new Schema(
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

    episodes: {
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
export const tvShowModel = mongoose.model<ITVShow>(
  MongoCollections.tvShows,
  tvShowSchema
);
