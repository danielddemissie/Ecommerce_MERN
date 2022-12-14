import Joi from "joi";
import * as dotenv from "dotenv";
dotenv.config();

const envSchema = Joi.object({
  MONGO_URL_DEV: Joi.string().required().description("MongoDb connection URL"),
  MONGO_URL_PROD: Joi.string().required().description("MongoDb connection URL"),
  PORT: Joi.string().required().description("PORT"),
  JWT_SECRET_KEY: Joi.string().required().description("JWT secrete"),
  STRIPE_KEY: Joi.string().required().description("Stripe secrete key"),
  NODE_ENV: Joi.string()
    .allow("development", "test", "production")
    .default("development"),
})
  .unknown()
  .required();

const { error, value } = envSchema.validate(process.env);

if (error) throw new Error(`evn variables error ${error.message}`);

export const port = value.PORT;
export const jwtSecrete = value.JWT_SECRET_KEY;
export const stripeKey = value.STRIPE_KEY;
export const nodeEnv = value.NODE_ENV;
export const mongoUrl =
  nodeEnv === "development" ? value.MONGO_URL_DEV : value.MONGO_URL_PROD;
