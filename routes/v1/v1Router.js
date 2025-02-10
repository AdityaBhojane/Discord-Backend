import express from 'express';
import authRouter from './authRouter.js'
import serverRouter from './discordServer.js'
import messageRouter from './messageRouter.js';
import channelRouter from './channelRouter.js';
import categoryRouter from './categoryRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/servers', serverRouter);
router.use('/messages', messageRouter);
router.use('/channel', channelRouter);
router.use('/category', categoryRouter);

export default router;