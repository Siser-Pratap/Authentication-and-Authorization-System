import express from "express";
import * as dotenv from "dotenv";
import connectDb from "./connectDb.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";


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


app.use("/api/users", userRouter);
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