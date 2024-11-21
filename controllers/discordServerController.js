import { StatusCodes } from "http-status-codes";
import { CreateServerService } from "../services/discordServerService.js";
import CustomErrorResponse from "../utils/common/errorResponse.js";
import successResponse from "../utils/common/successResponse.js";


export const createDiscordServerController = async (req, res) => {
    try {
      const response = await CreateServerService({
        ...req.body,
        owner: req.user
      });
      return res
        .status(StatusCodes.CREATED)
        .json(successResponse("server created successfully",response));
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json(CustomErrorResponse("something is wrong",error));
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(CustomErrorResponse("Internal server error",error));
    }
  };