import { StatusCodes } from "http-status-codes";
import {
  addMemberToServerService,
  addNewCategoryToServerService,
  addNewChannelToServerService,
  CreateServerService,
  deleteServerService,
  getAllServersUserPartOfService,
  getServerService,
  updateServerService,
} from "../services/discordServerService.js";
import customSuccessResponse from "../utils/common/successResponse.js";
import customErrorResponse from "../utils/common/errorResponse.js";

export const createDiscordServerController = async (req, res) => {
  try {
    const response = await CreateServerService({
      ...req.body,
      owner: req.user,
    });
    return res
      .status(StatusCodes.CREATED)
      .json(customSuccessResponse("server created successfully", response));
  } catch (error) {
    console.log("create server controller error", error);
    if (error.statusCode) {
      return res
        .status(error.statusCode)
        .json(customErrorResponse("something is wrong", error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse("Internal server error", error));
  }
};

export const getAllServersUserPartOfController = async (req, res) => {
  try {
    const response = await getAllServersUserPartOfService(req.user);
    return res
      .status(StatusCodes.OK)
      .json(customSuccessResponse("Severs fetched successfully", response));
  } catch (error) {
    console.log("server controller", error);
    res
      .status(StatusCodes.NOT_FOUND)
      .json(customErrorResponse("something is wrong while fetching", error));
  }
};

export const deleteServerController = async (req, res) => {
  try {
    const response = await deleteServerService(req.params.serverId, req.user);

    return res
      .status(StatusCodes.OK)
      .json(customSuccessResponse("server deleted successfully", response));
  } catch (error) {
    console.log("delete controller error", error);
    // check status code for this implementation
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(customErrorResponse("something is wrong while deleting", error));
  }
};

export const updateServerController = async (req, res) => {
  try {
    const response = await updateServerService(
      req.params.serverId,
      req.body,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(customSuccessResponse("server updated successfully", response));
  } catch (error) {
    console.log("update controller error", error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(customErrorResponse("something is wrong while updating", error));
  }
};

export const getServerController = async (req, res) => {
  try {
    const response = await getServerService(req.params.serverId, req.user);
    return res
      .status(StatusCodes.OK)
      .json(customSuccessResponse("server fetched successfully", response));
  } catch (error) {
    console.log("get server controller error", error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        customErrorResponse("something is wrong while getting details", error)
      );
  }
};

export const addNewCategoryToServerController = async (req, res) => {
  try {
    const { serverId } = req.params;
    const { categoryName } = req.body;
    const response = await addNewCategoryToServerService(
      serverId,
      categoryName,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(customSuccessResponse("category created successfully", response));
  } catch (error) {
    console.log("add category controller error", error);
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(
        customErrorResponse(
          "something is wrong with add Category controller",
          error
        )
      );
  }
};

export const addNewChannelToCategoryController = async (req, res) => {
  try {
    const { serverId, categoryId } = req.params;
    const { channelName } = req.body;
    const response = await addNewChannelToServerService(
      serverId,
      categoryId,
      channelName,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(customSuccessResponse("category created successfully", response));
  } catch (error) {
    console.log("add category controller error", error);
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(
        customErrorResponse(
          "something is wrong with add channel controller",
          error
        )
      );
  }
};

export const addMemberToServerController = async (req, res) => {
  try {
    const response = await addMemberToServerService(
      req.params.serverId,
      req.body.memberId,
      req.body.role || 'member',
      req.user
    )
    return res
    .status(StatusCodes.OK)
    .json(customSuccessResponse("member created successfully", response));
  } catch (error) {
    console.log("add category controller error", error);
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(
        customErrorResponse(
          "something is wrong with add add user controller",
          error
        )
      );
  }
};
