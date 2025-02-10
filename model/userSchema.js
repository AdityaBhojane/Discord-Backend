import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true, 'schema : username is required'],
        unique:[true, 'schema : username already exist'],
        minLength:[3, 'schema : must be at least 3 characters '],
        match:[
            /^[a-zA-Z0-9]+$/,
            'schema : username must contain only letters and numbers'
        ]
    },
    password:{
        type:String,
        minLength:[4, 'schema : must be at least 3 characters '],
        require:[true , 'schema : password is required'],
    },
    email:{
        type:String,
        require:[true, 'schema : email is required'],
        unique:[true, 'schema : email is already exits'],
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "schema : enter valid email"
        ]
    },
    friends:[{
        friendId: {
            type:mongoose.Schema.ObjectId,
            ref:"User"
        },
        status:{
            type:String,
            enum:['pending', 'accepted', 'declined'],
            default: 'pending'
        }
    }],
    avatar:{
        type:String
    }
},
{timestamps:true}
);

userSchema.pre('save', function saveUser(next){
    const user = this;
    const SALT = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;
    // user.avatar = `https://robohash.org/${user.username}`;
    next();
});

const User = mongoose.model('User',userSchema );

export default User;