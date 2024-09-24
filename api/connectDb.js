import mongoose from "mongoose";

const connectDb = (url)=>{
    mongoose.connect(url)
        .then(()=>console.log("Connected to database"))
        .catch((err)=>console.log(err));
    
}

export default connectDb;