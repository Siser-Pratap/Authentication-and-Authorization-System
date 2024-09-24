import express from "express";
import * as dotenv from "dotenv";

const app = express();
const port = 3000;

app.get("/api/users", async(req, res)=>{
    res.send("Hello from Image_Gen");
})

app.listen(port ,(req, res)=>{
    console.log("Server running on port " + port);
})