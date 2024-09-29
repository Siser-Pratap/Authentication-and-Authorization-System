import user from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async(req, res, next)=>{
    
   
    const {username, password, email} = req.body;
    const hashedPassword =bcryptjs.hashSync(password, 10);
    
    const userName = await user.findOne({username: username});
    const Email = await user.findOne({email: email});

    if(userName){
        res.json({message:"Username already taken"});
    }

    if(Email){
        res.json({message:"User already registered"});
    }
        
    

    const newUser = new user({username, password:hashedPassword, email});
    try {
        await newUser.save();
        res.status(201).json({message:"User created Successfully"});
    } catch (error) {
        next(error);
    }

    
}

export const signin = async(req, res, next) =>{
    const {email, password} = req.body;
    try {
    const validUser = await user.findOne({email: email});
    if(!validUser){
        res.json({message:"User not found"});
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
        res.json({message:"Invalid credentials"});
    }

    const token = await jwt.sign({id:validUser._id}, process.env.JWT_SECRET_KEY);
    console.log(token);
    const newDate = new Date(Date.now() + 3600000); //1hour
    const {password:hashedPassword, ...rest } = validUser._doc;
    res.cookie('token', token, {httpOnly: true, maxAge: newDate}).status(200).json(rest);



} catch (error) {
    next(error);
}
}


export const google = async(req, res, next)=>{
    const {name, email, photoURL} = req.body;
    try {
        const validUser = await user.findOne({email:email});
        if(validUser){
            const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET_KEY);
            const {password:hashedPassword, ...rest} = validUser._doc;
            const date = new Date(Date.now() + 3600000); //1hour
            res
               .cookie('access_token', token, {
                httpOnly: true,
                expires:date,
               })
               .status(200)
               .json(rest)
        }
        else{
            const generatePassword = Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8);
            const username = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
            const date = new Date(Date.now()+360000);
            const newUser = new user({email:email, password:hashedPassword, username:username, photo:photoURL});
            await newUser.save();
            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET_KEY);
            const {password:hashedPassword2, ...rest} = newUser._doc;
            res
               .cookie("access_token", token,{
                httpOnly: true,
                expires:date,
               })
               .status(200)
               .json(rest) 
           }
    } catch (error) {
      next(error);  
    }
}


