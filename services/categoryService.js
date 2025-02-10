import categoryRepository from "../repositories/categoryRepository.js";


export const updateCategoryService = async (categoryId, categoryData) => {
    try {
        const updatedCategory = await categoryRepository.update(categoryId, categoryData);
        return updatedCategory;
    } catch (error) {
        throw error;
    }
}

export const deleteCategoryService = async (categoryId) => {
    try {
        const deletedCategory = await categoryRepository.delete(categoryId);
        return deletedCategory;
    } catch (error) {
        throw error;
    }
}