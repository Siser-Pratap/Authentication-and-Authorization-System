import { errorHandler } from '../error/error.js';
import bcryptjs from 'bcryptjs';
import user from '../models/user.js';
import jwt from 'jsonwebtoken';

export const test = (req, res)=>{
    res.status(200).json({message:"Success"});
}


export const updateUser = async(req, res, next) => {
    if (req.body.id !== req.params.id){
            return next(errorHandler(401, 'You can update only your account'));
        };
    try{    
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updateUser = await user.findByIdAndUpdate(
            req.params.id,{
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    photo: req.body.photo,
                },
        },{new: true}
    );
    const {password, ...rest} = updateUser._doc;
    res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}


export const verifyToken = (req, res, next)=>{
    
    const token = req.cookies.access_token;
    
    if (!token){
        return next(errorHandler(401,'User in not authenticated'));
        }
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if(err){
            return next(errorHandler(403, 'Token is not valid'));
            
        }
        req.user = user;
        next();
    })
}

