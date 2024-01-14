import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  API_KEY: Joi.string().required(),
});