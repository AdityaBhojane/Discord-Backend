import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true, "content is required"],
        trim:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "sender id is required"]
    },
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Channel",
        required:[true, "Channel id is required"]
    },
    pinned:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

const Message = mongoose.model("Message", messageSchema);

export default Message;