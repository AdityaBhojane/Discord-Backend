import Channel from "../model/channelSchem.js";
import crudRepository from "./CrudRepo.js";



const channelRepository = {
    ...crudRepository(Channel),
    getChannelWithServerDetails: async function (channelId) {
        const channel = await Channel.findById(channelId).populate('serverId');
        return channel;
    }
};

export default channelRepository;