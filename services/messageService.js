import { StatusCodes } from 'http-status-codes';
import channelRepository from '../repositories/channelRepository.js';
import messageRepository from '../repositories/messageRepository.js';


export const getMessagesService = async (messageParams, page, limit, user) => {
  const channelDetails = await channelRepository.getChannelWithServerDetails(
    messageParams.channelId
  );

  const Server = channelDetails.serverId;

  const isMember = isUserMemberOfWorkspace(Server, user);

  if (!isMember) {
    throw new CustomError(
      "User is not a member of the Server",
      StatusCodes.UNAUTHORIZED,
      category
    );
  }

  const messages = await messageRepository.getPaginatedMessaged(
    messageParams,
    page,
    limit
  );
  return messages;
};

export const createMessageService = async (message) => {
  const newMessage = await messageRepository.create(message);
  const messageDetails = await messageRepository.getMessageDetails(
    newMessage[0]._id
  );

  return messageDetails;
};