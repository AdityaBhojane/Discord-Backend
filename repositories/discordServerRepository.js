import { getStatusCode, StatusCodes } from "http-status-codes";
import Server from "../model/serverSchema.js";
import CustomError from "../utils/CustomError.js";
import crudRepository from "./CrudRepo.js";
import channelRepository from "./channelRepository.js";
import categoryRepository from "./categoryRepository.js";
import User from "../model/userSchema.js";

const discordServerRepository = {
  ...crudRepository(Server),
  addUserToServer: async (serverId, userId, role) => {
    const server = await Server.findById(serverId);
    if (!server) {
      throw new CustomError("server not found", StatusCodes.NOT_FOUND);
    }
    const validUser = await User.find({ userId });
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
      memberId:userId,
      role,
    });

    await server.save();

    return server;
  },
  addCategoryToServer: async (serverId,categoryName) => {
    const server = await Server.findById(serverId).populate("categories");
    
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
    });

    server.categories.push(category);
    await server.save();

    return server;
  },
  getAllServersUserPartOf: async(userId)=>{
    const response = await Server.find({'members.memberId': userId});
    return response;
  },
  deleteCategory: () => {},
  getUsers: () => {},
  deleteUsers: () => {},
  getAllUsers: () => {},
};

export default discordServerRepository;
