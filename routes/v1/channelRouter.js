import express from 'express';
import isAuthenticate from '../../middlewares/authMiddleware.js';
import { deleteChannelController, getChannelController, updateChannelController } from '../../controllers/channelController.js';


const channelRouter = express.Router();
channelRouter.get('/:channelId', isAuthenticate, getChannelController);
channelRouter.put('/:channelId', isAuthenticate, updateChannelController);
channelRouter.delete('/:channelId', isAuthenticate, deleteChannelController);

export default channelRouter;