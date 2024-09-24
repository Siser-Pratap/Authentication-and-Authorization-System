import express from 'express';
import { signup } from '../controller/authController.js';

const authRouter = express.Router();


authRouter.get("/", signup);

export default authRouter;