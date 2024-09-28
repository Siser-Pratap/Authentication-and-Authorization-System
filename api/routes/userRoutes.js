import express from 'express';
import { test } from '../controller/userController.js';
import { updateUser } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get("/", test);
userRouter.post('/update/:id', verifyToken, updateUser);

export default userRouter;