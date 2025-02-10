import { deleteCategoryService, updateCategoryService } from "../services/categoryService.js";


export const updateCategoryController = async (req, res) => {
    try {
        const updatedCategory = await updateCategoryService(req.params.categoryId, req.body);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const deleteCategoryController = async (req, res) => {
    try {
        const deletedCategory = await deleteCategoryService(req.params.categoryId);
        res.status(200).json(deletedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}