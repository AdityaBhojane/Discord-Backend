import { StatusCodes } from 'http-status-codes';
import customErrorResponse from '../utils/common/errorResponse.js';


export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse('Validation error',error)
      );
    }
  };
};
