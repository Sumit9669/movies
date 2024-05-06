import { MongoCollections } from './mongo.constant';
import { myWatchListSchema } from 'src/entitites/my-watch-list.entity';
import { movieSchema } from 'src/entitites/movies-list.entity';
import { tvShowSchema } from 'src/entitites/tv-show.entity';
import { userSchema } from 'src/entitites/users.entity';

export const CommonFormat = {
  dateTime: 'YYYY-MM-DD hh:mm:ss',
  date: 'YYYY-MM-DD',
};

export const ExceptionsTerminology = {
  recordAlreadyExists: 'RecordExists',
  generalException: 'GeneralError',
  entityNotFound: 'EntityNotFoundError',
  entitiesNotFound: 'EnititesNotFoundError',
  validationException: 'RequestValidationError',
  internalServerException: 'InternalServerError',
  headerMissing: 'HeaderMissing',
  endPointNotFoundException: 'EndPointNotFoundError',
  serviceUnavailableException: 'EndPointNotFoundError',
  unAuthorisedTokenException: 'UnAuthorisedTokenError',
  invalidRequest: 'InvalidRequestError',
  jwtError: 'Invalid token.',
};

export const SchemaSet = {
  watchList: { schema: myWatchListSchema, name: MongoCollections.watch_list },
  movies: { schema: movieSchema, name: MongoCollections.movies },
  tvShowa: { schema: tvShowSchema, name: MongoCollections.tvShows },
  user: { schema: userSchema, name: MongoCollections.user },
};
