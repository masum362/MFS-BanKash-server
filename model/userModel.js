import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    pin:{
        type:String,
        required:true,
    },
    balance:{
        type:Number,
        default:0,
    },
    role:{
        type:String,
        default:"user",
        enum:["admin", "agent", "user"]
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","active"]
    }
})

const userModel = new mongoose.model('user',userSchema);

export default userModel;