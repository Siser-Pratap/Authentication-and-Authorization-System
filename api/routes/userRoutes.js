import express from 'express';
import { test } from '../controller/userController.js';
import { updateUser } from '../controller/userController.js';
import { verifyToken } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get("/", test);


export default userRouter;