import express from 'express';
import userRouter from './userRouter.js'
import serverRouter from './discordServer.js'

const router = express.Router();

router.use('/users', userRouter);
router.use('/server', serverRouter)

export default router;