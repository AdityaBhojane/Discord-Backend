import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, "Category name is required"],
        trim:true
    },
    serverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Server',
    }
},
{timestamps:true});

const Category = mongoose.model('Category', categorySchema);

export default Category;