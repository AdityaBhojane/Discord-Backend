import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig";

export default async function connectDB (){
    try {
        await mongoose.connect(MONGO_URL);
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }

}