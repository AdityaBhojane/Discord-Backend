import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "Category name is required"],
        unique:[true, "This name already exits"],
        trim:true
    },
    ChannelIds:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel',
        require:[true, "Channel id is required"]
    }
},
{timestamps:true});

const Category = mongoose.model('Category', categorySchema);

export default Category;