import dotenv from 'dotenv'
dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_PORT = process.env.REDIS_PORT;
export const MAIL_ID = process.env.MAIL_ID;
export const MAIL_APP_PASSWORD = process.env.MAIL_APP_PASSWORD;
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_ACCESS_SECRET_ID = process.env.AWS_ACCESS_SECRET_ID;
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

