import express from "express";
import * as dotenv from "dotenv";
import connectDb from "./connectDb.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { errorHandler } from "./error/error.js";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import user from "./models/user.js";







dotenv.config();


const app = express();

app.use(express.json());
const port = 3000;
connectDb(process.env.MONGODB_URL);





app.listen(port ,()=>{
    console.log("Server running on port " + port);
    
})

app.get("/", async(req, res)=>{
    res.status(200).json({message:"Hello, world!"});

})
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true,
}));
app.use(cookieParser());


const verifyToken = (req, res, next)=>{
    
    const token = req.cookies.token;
    
    
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

const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id){
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


app.use("/api/users", userRouter);
app.post("/api/users/update/:id", verifyToken, updateUser);
app.use("/api/auth", authRouter);

app.use((err, req, res, next)=>{
    const statusCode = res.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        message:message,
        statusCode:statusCode,
    });
})