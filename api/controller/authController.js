import user from "../models/user.js";

export const signup = async(req, res)=>{
    console.log(req.body);
    
    const {username, password, email} = req.body;

    const newUser = new user({username, password, email});
    try {
        await newUser.save();
        res.status(201).json({message:"User created Successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
}