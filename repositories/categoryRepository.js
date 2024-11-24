import Category from "../model/categorySchema.js";
import crudRepository from "./CrudRepo.js";


const categoryRepository = {
    ...crudRepository(Category),
    getCategoryDetailsByServerId:async(categoryId)=>{
        const response = await Category.findById(categoryId);
        return response
    }
};

export default categoryRepository;