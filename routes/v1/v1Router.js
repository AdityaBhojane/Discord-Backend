import express from 'express';
import authRouter from './authRouter.js'
import serverRouter from './discordServer.js'
import messageRouter from './messageRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/servers', serverRouter);
router.use('/messages', messageRouter);

export default router;