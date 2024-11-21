import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "channel name is required"]
    },
    ChanelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel',
        require:[true, "Server id is required"]
    }
},
{timestamps:true});

const Category = mongoose.model('Category', categorySchema);

export default Category;