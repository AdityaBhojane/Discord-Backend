import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";

export default async function connectDB (){
    try {
        await mongoose.connect(MONGO_URL);
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}

// omega cluster