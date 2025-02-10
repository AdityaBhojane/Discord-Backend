import channelRepository from "../repositories/channelRepository.js";


export const updateChannelService = async (channelId, channelData) => {
    try {
        const updatedChannel = await channelRepository.update(channelId, channelData);
        return updatedChannel;
    } catch (error) {
        throw error;
    }
}

export const getChannelService = async (channelId) => {
    try {
        const getChannel = await channelRepository.getById(channelId);
        return getChannel;
    } catch (error) {
        throw error;
    }
}

export const deleteChannelService = async (channelId) => {
    try {
        const deletedChannel = await channelRepository.delete(channelId);
        return deletedChannel;
    } catch (error) {
        throw error;
    }
}