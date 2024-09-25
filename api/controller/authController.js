import user from "../models/user.js";
import bcryptjs from "bcryptjs";

export const signup = async(req, res, next)=>{
    
   
    const {username, password, email} = req.body;
    const hashedPassword =bcryptjs.hashSync(password, 10);

    const newUser = new user({username, password:hashedPassword, email});
    try {
        await newUser.save();
        res.status(201).json({message:"User created Successfully"});
    } catch (error) {
        next(error);
    }
    
}