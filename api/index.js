import express from "express";
import * as dotenv from "dotenv";
import connectDb from "./connectDb.js";

dotenv.config();

const app = express();
const port = 3000;
connectDb(process.env.MONGODB_URL);

app.get("/", async(req, res)=>{
    res.send("Hello from k");

})

app.listen(port ,()=>{
    console.log("Server running on port " + port);
    
})