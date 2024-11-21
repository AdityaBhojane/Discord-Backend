import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "channel name is required"]
    },
    serverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Server',
        require:[true, "Server id is required"]
    }
},
{timestamps:true});

const Channel = mongoose.model("ChannelSchema", channelSchema);

export default Channel