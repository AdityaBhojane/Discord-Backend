import { StatusCodes } from "http-status-codes";
import { CreateServerService, getAllServersUserPartOfService } from "../services/discordServerService.js";
import customSuccessResponse from "../utils/common/successResponse.js";
import customErrorResponse from "../utils/common/errorResponse.js";


export const createDiscordServerController = async (req, res) => {
    try {
      const response = await CreateServerService({
        ...req.body,
        owner: req.user
      });
      return res
        .status(StatusCodes.CREATED)
        .json(customSuccessResponse("server created successfully",response));
    } catch (error) {
      console.log(error);
      if (error.statusCode) {
        return res.status(error.statusCode).json(customErrorResponse("something is wrong",error));
      }
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(customErrorResponse("Internal server error",error));
    }
};

export const getAllServersUserPartOfController = async(req,res)=>{
  try {
    const response = await getAllServersUserPartOfService(req.user);
    return res.status(StatusCodes.OK).json(customSuccessResponse("Severs fetched successfully", response))
  } catch (error) {
    console.log("server controller", error)
    customErrorResponse("something is wrong while fetching", error)
  }
}

