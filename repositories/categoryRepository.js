import { StatusCodes } from "http-status-codes";
import Category from "../model/categorySchema.js";
import CustomError from "../utils/CustomError.js";
import channelRepository from "./channelRepository.js";
import crudRepository from "./CrudRepo.js";


const categoryRepository = {
    ...crudRepository(Category),
    getCategoryDetailsByServerId:async(categoryId)=>{
        const response = await Category.findById(categoryId);
        return response
    },
    addChannelToCategory:async(categoryId,channelName,options = {})=>{
        const {session} = options;
        const category = await Category.findById(categoryId).session(session);

        if (!category) {
          throw new CustomError("category not found",StatusCodes.NOT_FOUND);
        }

        const isChannelAlreadyPartOfCategory = category.channels.find(
          (channel) => channel.name === channelName
        );
    
        if (isChannelAlreadyPartOfCategory) {
          throw new CustomError(
            "Channel with same name already exits",
            StatusCodes.FORBIDDEN
          );
        }
    
        const channel = await channelRepository.create({
          name: channelName,
          categoryId:categoryId,
        },{session});
    
        category.channels.push(channel[0]);
        await category.save();
    
        return category;
    }
};

export default categoryRepository;