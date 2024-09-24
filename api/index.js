import express from "express";
import * as dotenv from "dotenv";
import connectDb from "./connectDb.js";
import router from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const port = 3000;
connectDb(process.env.MONGODB_URL);

app.get("/", async(req, res)=>{
    res.status(200).json({message:"Hello, world!"});

})


app.use("/api/users", router);

app.listen(port ,()=>{
    console.log("Server running on port " + port);
    
})