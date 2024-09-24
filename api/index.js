import express from "express";
import * as dotenv from "dotenv";
import connectDb from "./connectDb.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";


dotenv.config();

const app = express();
const port = 3000;
connectDb(process.env.MONGODB_URL);

app.get("/", async(req, res)=>{
    res.status(200).json({message:"Hello, world!"});

})


app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(port ,()=>{
    console.log("Server running on port " + port);
    
})