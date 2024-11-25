import Channel from "../model/channelSchem.js";
import crudRepository from "./CrudRepo.js";



const channelRepository = {
    ...crudRepository(Channel),

};

export default channelRepository;