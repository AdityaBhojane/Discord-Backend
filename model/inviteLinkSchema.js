import mongoose from "mongoose";

const inviteLinkSchema = new mongoose.Schema({
    link:{
        type:String,
    },
    serverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Server"
    }
},
{timestamps:true});

const inviteLink = mongoose.model("inviteLink",inviteLinkSchema);

export default inviteLink;