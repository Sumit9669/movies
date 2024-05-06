import Joi from 'joi';

export const ProcessEnvKeysSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().trim().required(),
    SERVICE_PORT: Joi.string().trim().required(),
    HOST: Joi.string().trim().required(),
    NOSQL_DB_USER: Joi.string().trim().required(),
    NOSQL_DB_PASS: Joi.string().trim().required(),
    NOSQL_DB_HOST: Joi.string(),
    NOSQL_DB_PORT: Joi.string(),
    AXIOS_TIMEOUT: Joi.string().trim().required(),
  })
  .options({ allowUnknown: true });
