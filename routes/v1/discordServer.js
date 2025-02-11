import express from "express";

import {
  addMemberToServerByJoinCodeController,
  addMemberToServerController,
  addNewCategoryToServerController,
  addNewChannelToCategoryController,
  createDiscordServerController,
  deleteServerController,
  getAllServersUserPartOfController,
  getServerController,
  updateServerController,
} from "../../controllers/discordServerController.js";
import isAuthenticate from "../../middlewares/authMiddleware.js";
import {
  addCategoryToServerSchema,
  addChannelToServerSchema,
  addMemberToServerSchema,
  createServerSchema,
} from "../../validators/zodSchema/serverSchema.js";
import { validate } from "../../validators/zodValidator.js";
import { addMemberToServerByJoinCode } from "../../services/discordServerService.js";

const router = express.Router();

router.post("/create",isAuthenticate,validate(createServerSchema),createDiscordServerController);
router.get("/", isAuthenticate, getAllServersUserPartOfController);
router.delete("/:serverId", isAuthenticate, deleteServerController);
router.put("/:serverId", isAuthenticate, updateServerController);
router.get("/:serverId", isAuthenticate, getServerController);
router.put("/:serverId/categories",isAuthenticate,validate(addCategoryToServerSchema),addNewCategoryToServerController);
router.put("/:serverId/categories/:categoryId/channels",isAuthenticate,validate(addChannelToServerSchema),addNewChannelToCategoryController);
router.put("/:serverId/users",isAuthenticate,addMemberToServerByJoinCodeController);
router.put("/:serverId/join",isAuthenticate,validate(addMemberToServerSchema),addMemberToServerController);
export default router;
