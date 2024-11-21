import dotenv from 'dotenv'
dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '1day';
