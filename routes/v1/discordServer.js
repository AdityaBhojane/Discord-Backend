import express from "express";

import {
  createDiscordServerController,
  deleteServerController,
  getAllServersUserPartOfController,
  getServerController,
  updateServerController,
} from "../../controllers/discordServerController.js";
import isAuthenticate from "../../middlewares/authMiddleware.js";
import { createServerSchema } from "../../validators/zodSchema/serverSchema.js";
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

export default router;
