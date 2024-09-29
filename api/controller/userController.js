import { errorHandler } from '../error/error.js';
import bcryptjs from 'bcryptjs';
import user from '../models/user.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export const test = (req, res)=>{
    res.status(200).json({message:"Success"});
}






