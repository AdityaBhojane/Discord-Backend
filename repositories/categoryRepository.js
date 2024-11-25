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
    addChannelToCategory:async(categoryId,channelName)=>{
        const category = await Category.findById(categoryId);

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
        });
    
        category.channels.push(channel);
        await category.save();
    
        return category;
    }
};

export default categoryRepository;