import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "Channel name is required"],
        trim:true,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    }
},
{timestamps:true});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel