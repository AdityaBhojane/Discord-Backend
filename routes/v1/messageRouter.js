import express from 'express';

import { getMessages, getPresignedUrlFromAWS } from '../../controllers/messageController.js';
import isAuthenticate from '../../middlewares/authMiddleware.js';


const messageRouter = express.Router();

messageRouter.get('/pre-signed-url', isAuthenticate, getPresignedUrlFromAWS);
messageRouter.get('/:channelId', isAuthenticate, getMessages);


export default messageRouter;