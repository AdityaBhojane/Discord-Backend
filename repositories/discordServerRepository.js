import { getStatusCode, StatusCodes } from "http-status-codes";
import Server from "../model/serverSchema.js";
import CustomError from "../utils/CustomError.js";
import crudRepository from "./CrudRepo.js";
import channelRepository from "./channelRepository.js";
import categoryRepository from "./categoryRepository.js";
import User from "../model/userSchema.js";

const discordServerRepository = {
  ...crudRepository(Server),
  addUserToServer: async (serverId, userId, role, options = {}) => {
    const { session } = options; // Destructure session from options
   
    const server = await Server.findById(serverId).session(session);

    if (!server) {
      throw new CustomError("server not found", StatusCodes.NOT_FOUND);
    }
    const validUser = await User.findById(userId).session(session); 

    if (!validUser) {
      throw new CustomError("user not found", StatusCodes.NOT_FOUND);
    }

    const isUserAlreadyPartOfServer = server.members.find(
      (member) => member.memberId == userId
    );
    if (isUserAlreadyPartOfServer) {
      throw new CustomError("user already added on the server");
    }

    server.members.push({
      memberId: userId,
      role,
    });

    await server.save({ session });
    return server;
  },
  addCategoryToServer: async (serverId, categoryName, options = {}) => {
    const {session} = options;
    const server = await Server.findById(serverId).session(session);

    if (!server) {
      throw new CustomError("Server not found", getStatusCode.NOT_FOUND);
    }

    const isCategoryAlreadyPartOfServer = server.categories.find(
      (category) => category.name === categoryName
    );

    if (isCategoryAlreadyPartOfServer) {
      throw new CustomError(
        "category with same name already exits",
        StatusCodes.FORBIDDEN
      );
    }

    const category = await categoryRepository.create({
      name: categoryName,
      serverId: serverId,
    },{session});

    server.categories.push(category[0]);
    await server.save({session});

    return category;
  },
  getAllServersUserPartOf: async (userId) => {
    const response = await Server.find({ "members.memberId": userId });
    return response;
  },
  addChannelToServer: async (serverId, channelName) => {
    const server = await discordServerRepository
      .getById(serverId)
      .populate("categories");
    if (!server) {
      throw new CustomError(
        "sever is not found to add category",
        StatusCodes.NOT_FOUND
      );
    }
    const isChannelAlreadyPartOfServer = await server.categories.channels.find(
      (channel) => channel.name == channelName
    );
    if (isChannelAlreadyPartOfServer) {
      throw new CustomError(
        "this channel already part of server",
        StatusCodes.FORBIDDEN
      );
    }

    const channel = await channelRepository.create({
      name: channelName,
      serverId: serverId,
    });

    server.categories.channels.push(channel);
    await server.save();
    return server;
  },
  getServerDetailsById: async (serverId) => {
    return await Server.findById(serverId)
      .populate("members.memberId")
      .populate("categories");
  },
  addMemberToServer: () => {},
  getSeverByJoinCode: () => {},
};

export default discordServerRepository;

/**
 * addCategoryToServer:async(serverId, categoryName)=>{
      const server = await discordServerRepository.getById(serverId);
      if(!server){
        throw new CustomError("sever is not found to add category",StatusCodes.NOT_FOUND)
      };
      const isCategoryAlreadyPartOfServer = await server.categories.find(
        (category) => category.name == categoryName
      );
      if(isCategoryAlreadyPartOfServer){
        throw new CustomError("this category already part of server", StatusCodes.FORBIDDEN)
      };

      const category = await categoryRepository.create({
        name:categoryName,
        serverId:serverId
      })

      server.categories.push(category)
      await server.save();
      return server
  },
 */
