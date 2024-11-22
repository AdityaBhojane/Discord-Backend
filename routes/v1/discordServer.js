import express from 'express';

import { createDiscordServerController, getAllServersUserPartOfController } from '../../controllers/discordServerController.js';
import isAuthenticate from '../../middlewares/authMiddleware.js';
import { createServerSchema } from '../../validators/zodSchema/serverSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/create',isAuthenticate,validate(createServerSchema), createDiscordServerController);
router.get('/',isAuthenticate, getAllServersUserPartOfController);


export default router;