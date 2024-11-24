import { StatusCodes } from "http-status-codes";
import { CreateServerService, deleteServerService, getAllServersUserPartOfService, getServerService, updateServerService } from "../services/discordServerService.js";
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
      console.log('create server controller error',error);
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

export const  deleteServerController = async(req,res)=>{
  try {
    const response = await deleteServerService(
      req.params.serverId,
      req.user
    );

    return res.status(StatusCodes.OK).json(customSuccessResponse('server deleted successfully', response))
  } catch (error) {
    console.log('delete controller error', error);
    // check status code for this implementation
    return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse("something is wrong while deleting", error))
  }
}

export const  updateServerController= async(req,res)=>{
  try {
    const response = await updateServerService(
      req.params.serverId,
      req.body,
      req.user
    );
    return res.status(StatusCodes.OK).json(customSuccessResponse('server updated successfully', response))
  } catch (error) {
    console.log("update controller error", error);
    return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse("something is wrong while updating", error))
  }
}

export const  getServerController= async(req,res)=>{
    try {
      const response = await getServerService(req.params.serverId, req.user);
      return res.status(StatusCodes.OK).json(customSuccessResponse('server fetched successfully', response))
    } catch (error) {
      console.log("get server controller error", error);
      return res.status(StatusCodes.BAD_REQUEST).json(customErrorResponse("something is wrong while getting details", error))
    }
}