import { StatusCodes } from "http-status-codes";
import customErrorResponse from "../utils/common/errorResponse.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import userRepository from "../repositories/userRepository.js";

export default async function isAuthenticate(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(customErrorResponse("token is not provided"));
    }
    const response = jwt.verify(token, JWT_SECRET);
    if (!response) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(customErrorResponse("invalid auth token provided"));
    }
    const user = await userRepository.getById(response.id);
    req.user = user.id;
    // console.log(response,user._id)
    next();
  } catch (error) {
    console.log("Auth middleware error", error);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(customErrorResponse("Invalid data sent from the client"));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse('internal server error',error));
  }
}
