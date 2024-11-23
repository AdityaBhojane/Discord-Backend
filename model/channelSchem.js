import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "Channel name is required"],
        unique:[true, "Channel name already exits"],
        trim:true
    },
    serverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Server',
    },
    categoryId:{
        type:mongoose.Schema.type.ObjectId,
        ref:"Category",
    }
},
{timestamps:true});

const Channel = mongoose.model("ChannelSchema", channelSchema);

export default Channel