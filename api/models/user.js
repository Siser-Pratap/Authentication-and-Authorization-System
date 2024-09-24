import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
}, {timestamps:true});

const user = mongoose.model("User", userSchema);

// User represents model name and userSchema represents its structure

export default user;