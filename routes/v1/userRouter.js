import express from 'express';
import { signIn, signUp } from '../../controllers/userController';

const router = express.Router();

router('/signup',signUp)
router('/signin',signIn)

export default router;