import { StatusCodes } from 'http-status-codes';

import { AWS_BUCKET_NAME } from '../config/serverConfig.js';
import { getMessagesService } from '../services/messageService.js';

import { s3 } from '../config/awsConfig.js';
import customSuccessResponse from '../utils/common/successResponse.js';
import customErrorResponse from '../utils/common/errorResponse.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await getMessagesService(
      {
        channelId: req.params.channelId
      },
      req.query.page || 1,
      req.query.limit || 20,
      req.user
    );

    return res
      .status(StatusCodes.OK)
      .json(customSuccessResponse( 'Messages Fetched Successfully',messages));
  } catch (error) {
    console.log('get message controller error', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse("something is wrong",error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({error:error});
  }
};

export const getPresignedUrlFromAWS = async (req, res) => {
  try {
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: AWS_BUCKET_NAME,
      Key: `${Date.now()}`,
      Expires: 60 // 1 minute
    });
    return res
          .status(StatusCodes.OK)
          .json(customSuccessResponse('Presigned URL generated successfully',url));
          
  } catch (err) {
    console.log('Error in getPresignedUrlFromAWS', err);
    if(err.statusCode) {
      return res.status(err.statusCode).json(customErrorResponse("something is wrong",err));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({error:err});
  }
}