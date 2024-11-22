import express from 'express';
import userRouter from './userRouter.js'
import serverRouter from './discordServer.js'

const router = express.Router();

router.use('/users', userRouter);
router.use('/servers', serverRouter)

export default router;