import { v4 as uuidv4 } from "uuid";
import discordServerRepository from "../repositories/discordServerRepository.js";

import CustomError from "../utils/CustomError.js";
import { StatusCodes } from "http-status-codes";
import categoryRepository from "../repositories/categoryRepository.js";
import errorMap from "zod/locales/en.js";

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
  try {
    const joinCode = uuidv4().substring(0, 6).toUpperCase();

    const response = await discordServerRepository.create({
      name: serverData.name,
      description: serverData.description,
      joinCode,
    });

    await discordServerRepository.addUserToServer(
      response._id,
      serverData.owner,
      "admin"
    );

    const updatedServer = await discordServerRepository.addCategoryToServer(
      response._id,
      "general"
    );
    return updatedServer;
  } catch (error) {
    if (error.name == "ValidationError") {
      throw new CustomError("Validation Error", StatusCodes.BAD_REQUEST, error);
    }
    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new CustomError(
        "server with a same name already exits",
        StatusCodes.BAD_REQUEST,
        error
      );
    }
    throw error;
  }
};

export const getAllServersUserPartOfService = async (userId) => {
  try {
    const response = await discordServerRepository.getAllServersUserPartOf(
      userId
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("get service error", error);
    throw error;
  }
};

export const deleteServerService = async (serverId, userId) => {
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
        "User is not allowed to delete the server",
        StatusCodes.BAD_REQUEST,
        "Admin role required"
      );
    }
    await categoryRepository.deleteMany(server.categories);
    console.log(serverId);
    const response = await discordServerRepository.delete(serverId);
    return response;
  } catch (error) {
    console.log("delete service", error);
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
