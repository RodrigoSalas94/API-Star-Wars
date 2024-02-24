import express from 'express';
import { UserController } from '../controllers/userControllers';

const userRouter = express.Router();
const userControllers = new UserController();

userRouter.post('/register', userControllers.register);
userRouter.post('/login', userControllers.login);

export default userRouter;
