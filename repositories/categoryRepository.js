import Category from "../model/categorySchema.js";
import crudRepository from "./CrudRepo.js";


const categoryRepository = {
    ...crudRepository(Category),
};

export default categoryRepository;