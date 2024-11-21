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
        require:[true, "Server id is required"]
    },
    categoryId:{
        type:mongoose.Schema.type.ObjectId,
        ref:"Category",
        require:[true, 'Category id is required']
    }
},
{timestamps:true});

const Channel = mongoose.model("ChannelSchema", channelSchema);

export default Channel