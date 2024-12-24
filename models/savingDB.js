import mongoose from "mongoose";



const homeschema = new mongoose.Schema({
    agent :String,
    code:String,
    name:String,
    member:String,
    employee:String,
    amount:Number,
    date:Date,
    due:{
        type:Number,
        default:0
    },
    total:Number,
    interest:{
        type:Number,
        default:0
    },
    isNormal: {type: Boolean, default: true},
    isActive : {type: Boolean, default: true},
},{timestamps:true});




module.exports = mongoose.models.savingDB || mongoose.model("savingDB", homeschema);


