import { v4 as uuidv4 } from "uuid";
import discordServerRepository from "../repositories/discordServerRepository.js";

import CustomError from "../utils/CustomError.js";
import { StatusCodes } from "http-status-codes";

// helper func
const isUserAdminOfServer = (server, userId) => {
  return server.members.find(
    (members) =>
      members.memberId._id.toString() === userId && members.role == "admin"
  );
};

const isUserPartOfServer = (server, userId) => {
  return server.find((member) => member.memberId.toString() == userId);
};

const isChannelIsPartOfServer = (server, ChannelName) => {
  return server.find(
    (channel) => channel.name.tolowerCase() == ChannelName.tolowerCase()
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
        'admin'
    );

    const updatedServer = await discordServerRepository.addCategoryToServer(
        response._id,
        "general"
    );
    return updatedServer
  } catch (error) {
    if(error.name == "ValidationError"){
        throw new CustomError("Validation Error", StatusCodes.BAD_REQUEST,error)
    }
    if(error.name === 'MongoServerError' && error.code === 11000){
        throw new CustomError("server with a same name already exits", StatusCodes.BAD_REQUEST,error)
    }
    throw error
  }
};

export const getAllServersUserPartOfService = async (userId)=>{
  try {
    const response = await discordServerRepository.getAllServersUserPartOf(userId);
    console.log(response);
    return response;
  } catch (error) {
    console.log("get service error",error)
    throw error
  }
}
