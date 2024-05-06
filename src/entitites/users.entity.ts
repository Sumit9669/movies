import mongoose, { Schema } from 'mongoose';
import { MongoCollections } from '@constants/mongo.constant';
import { IUser } from './interfaces/movies.interface';

/** mongoose schema for institute users
 */
export const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },

    preferences: {
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
export const userModel = mongoose.model<IUser>(
  MongoCollections.user,
  userSchema
);
