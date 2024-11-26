import { v4 as uuidv4 } from "uuid";
import discordServerRepository from "../repositories/discordServerRepository.js";

import CustomError from "../utils/CustomError.js";
import { StatusCodes } from "http-status-codes";
import categoryRepository from "../repositories/categoryRepository.js";
import mongoose from "mongoose";
import channelRepository from "../repositories/channelRepository.js";

// helper func
const isUserAdminOfServer = (server, userId) => {
  return server.members.find(
    (members) =>
      (members.memberId.toString() === userId ||
        members.memberId._id.toString() === userId) &&
      members.role == "admin"
  );
};

const isUserPartOfServer = (server, userId) => {
  return server.members.find(
    (members) => members.memberId.toString() == userId
  );
};

const isCategoryIsPartOfServer = (server, categoryName) => {
  return server.categories.find(
    (category) => category.name.toLowerCase() === categoryName.toLowerCase()
  );
};

export const CreateServerService = async (serverData) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    const response = await discordServerRepository.create(
      {
        name: serverData.name,
        description: serverData.description,
        joinCode,
      },
      { session }
    );

    await discordServerRepository.addUserToServer(
      response._id,
      serverData.owner,
      "admin",
      { session }
    );

    const category = await discordServerRepository.addCategoryToServer(
      response._id,
      "general",
      { session }
    );

    if (!category || !category.id) {
      throw new CustomError(
        "Category creation failed",
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Cannot retrieve category ID"
      );
    }

    const addChannel = await categoryRepository.addChannelToCategory(
      category.id,
      "general",
      { session }
    );

    if (!addChannel) {
      throw new CustomError(
        "Cannot create a channel",
        StatusCodes.BAD_REQUEST,
        "Check create server service"
      );
    }

    await session.commitTransaction();
    session.endSession();

    // Re-fetch the server with all changes
    const updatedServer = await discordServerRepository.getServerDetailsById(
      response._id
    );
    return updatedServer;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getAllServersUserPartOfService = async (userId) => {
  try {
    const response = await discordServerRepository.getAllServersUserPartOf(
      userId
    );
    if (response.length == 0) {
      throw new CustomError(
        "User is not part of any server",
        StatusCodes.NOT_FOUND,
        "server not found"
      );
    }
    return response;
  } catch (error) {
    console.log("get service error", error);
    throw error;
  }
};

export const deleteServerService = async (serverId, userId) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
  
    // Fetch the server and validate
    const server = await discordServerRepository.getServerDetailsById(serverId);
    if (!server) {
      throw new CustomError(
        "Server does not exist",
        StatusCodes.NOT_FOUND,
        "not found"
      );
    }
  
    // Check admin permissions
    const isValidAdmin = await isUserAdminOfServer(server, userId);
    if (!isValidAdmin) {
      throw new CustomError(
        "User is not allowed to delete the server",
        StatusCodes.BAD_REQUEST,
        "Admin role required"
      );
    }
  
    // Collect all channel IDs
    const channelIds = server.categories.flatMap(category =>
      category.channels.map(channel => channel._id)
    );
  
    console.log(channelIds)
    // Delete channels
    const deleteChannelResponse = await channelRepository.deleteMany(
      channelIds,
      { session }
    );
  
    // Validate channel deletion
    if (deleteChannelResponse.deletedCount !== channelIds.length) {
      throw new CustomError(
        "Not all channels deleted properly",
        StatusCodes.FORBIDDEN,
        "Transaction failed"
      );
    }
  
    // Delete categories
    const deleteCategoriesResponse = await categoryRepository.deleteMany(
      server.categories,
      { session }
    );
  
    // Validate category deletion
    if (deleteCategoriesResponse.deletedCount !== server.categories.length) {
      throw new CustomError(
        "Not all categories deleted properly",
        StatusCodes.FORBIDDEN,
        "Transaction failed"
      );
    }
  
    // Delete server
    const response = await discordServerRepository.delete(serverId, { session });
  
    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    return response;
  } catch (error) {
    // Rollback transaction
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.log("delete service error:", error);
    throw error;
  }
  
};

export const updateServerService = async (serverId, serverData, userId) => {
  try {
    const server = await discordServerRepository.getById(serverId);
    if (!server) {
      throw new CustomError(
        "Server dose not exits",
        StatusCodes.NOT_FOUND,
        "not found"
      );
    }
    const isValidAdmin = await isUserAdminOfServer(server, userId);
    if (!isValidAdmin) {
      throw new CustomError(
        "User is not allowed to update the server",
        StatusCodes.BAD_REQUEST,
        "Admin role required"
      );
    }
    const response = await discordServerRepository.update(serverId, serverData);
    return response;
  } catch (error) {
    console.log("update service", error);
    throw error;
  }
};

export const getServerService = async (serverId, userId) => {
  try {
    const server = await discordServerRepository.getById(serverId);
    if (!server) {
      throw new CustomError(
        "Server dose not exits",
        StatusCodes.NOT_FOUND,
        "not found"
      );
    }
    const isMember = isUserPartOfServer(server, userId);
    if (!isMember) {
      throw new CustomError(
        "User is not a part of server",
        StatusCodes.FORBIDDEN,
        "Not allowed"
      );
    }
    return server;
  } catch (error) {
    console.log("get server service", error);
    throw error;
  }
};

export const addNewCategoryToServerService = async (
  serverId,
  categoryName,
  userId
) => {
  try {
    const server = await discordServerRepository.getServerDetailsById(serverId);
    if (!server) {
      throw new CustomError("server dost not exits", StatusCodes.NOT_FOUND);
    }
    const isValidAdmin = isUserAdminOfServer(server, userId);
    if (!isValidAdmin) {
      throw new CustomError(
        "User not allowed to add category to the server",
        StatusCodes.FORBIDDEN
      );
    }
    const isCategoryIsPartOf = isCategoryIsPartOfServer(server, categoryName);
    if (isCategoryIsPartOf) {
      throw new CustomError("Category already exits", StatusCodes.UNAUTHORIZED);
    }
    const response = await discordServerRepository.addCategoryToServer(
      serverId,
      categoryName
    );
    return response;
  } catch (error) {
    console.log("add channel service error", error);
    throw error;
  }
};

export const addNewChannelToServerService = async (serverId, userId) => {};

export const addMemberToServerService = async (serverId, userId) => {};

export const getServerByJoinCodeService = async () => {};
