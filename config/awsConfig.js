import AWS from 'aws-sdk';
import { AWS_ACCESS_KEY_ID, AWS_ACCESS_SECRET_ID, AWS_REGION } from './serverConfig.js';

export const s3 = new AWS.S3({
    region:AWS_REGION,
    accessKeyId:AWS_ACCESS_KEY_ID,
    secretAccessKey:AWS_ACCESS_SECRET_ID
});

