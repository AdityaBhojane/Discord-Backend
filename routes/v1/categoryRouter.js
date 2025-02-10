import express from 'express';
import isAuthenticate from '../../middlewares/authMiddleware.js';
import { deleteCategoryController, updateCategoryController } from '../../controllers/categoryController.js';



const categoryRouter = express.Router();
categoryRouter.put('/:categoryId', isAuthenticate, updateCategoryController);
categoryRouter.delete('/:categoryId', isAuthenticate, deleteCategoryController);

export default categoryRouter;