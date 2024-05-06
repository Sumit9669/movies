// tslint:disable-next-line: no-var-requires
const Joi = require("joi");

const watchList = Joi.object({
  contentId: Joi.string().required(),
  rating: Joi.string(),
  type: Joi.string().required(),
});
const movieDetail = Joi.object({
  contentId: Joi.string().required(),
});

const movieQueryParam = Joi.object({
  pageNumber: Joi.number(),
  pageSize: Joi.number(),
  genre: Joi.string(),
});

const loginRequest = Joi.object({
  username: Joi.string(),
});

export const MoviesValidation = {
  watchList,
  movieDetail,
  movieQueryParam,
  loginRequest,
};
