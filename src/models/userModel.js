import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:trusted
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avtar:{
        type:String, //cloudinary url
        required:true
    },
    coverImage:{
        type:String, //cloudinary url
    },
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'password is required']
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})

export const User=mongoose.model("User", userSchema)