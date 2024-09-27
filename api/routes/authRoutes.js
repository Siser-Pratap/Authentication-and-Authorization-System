import express from 'express';
import { signup } from '../controller/authController.js';
import { signin } from '../controller/authController.js';
import {google} from '../controller/authController.js';

const authRouter = express.Router();


authRouter.post("/signup", signup);
authRouter.post("/signin",signin);
authRouter.post("/google",google);

export default authRouter;