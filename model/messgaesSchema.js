import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    body:{
        type:String,
        required:[true, "content is required"],
        trim:true
    },
    image:{
        type:String,
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "sender id is required"]
    },
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Channel",
        required:[true, "Channel id is required"]
    },
    serverId:{
        type:mongoose.Schema.ObjectId,
        ref:"Server",
        required:[true, "Server id is required"]
    },
},{timestamps:true});

const Message = mongoose.model("Message", messageSchema);

export default Message;