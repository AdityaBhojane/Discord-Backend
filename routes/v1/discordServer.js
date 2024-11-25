import express from "express";

import {
  addNewCategoryToServerController,
  createDiscordServerController,
  deleteServerController,
  getAllServersUserPartOfController,
  getServerController,
  updateServerController,
} from "../../controllers/discordServerController.js";
import isAuthenticate from "../../middlewares/authMiddleware.js";
import { addCategoryToServerSchema, createServerSchema } from "../../validators/zodSchema/serverSchema.js";
import { validate } from "../../validators/zodValidator.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticate,
  validate(createServerSchema),
  createDiscordServerController
);
router.get("/", isAuthenticate, getAllServersUserPartOfController);
router.delete("/:serverId", isAuthenticate, deleteServerController);
router.put("/:serverId", isAuthenticate, updateServerController);
router.get("/:serverId",isAuthenticate, getServerController);
router.put("/:serverId/categories",isAuthenticate,validate(addCategoryToServerSchema),addNewCategoryToServerController)

export default router;
