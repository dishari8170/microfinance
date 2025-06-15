import mongoose from "mongoose";
import {bool} from "yup";




const homeschema = new mongoose.Schema({

    code:String,
    by:String,
    to:String,
    agent:String,
    amount:Number,
    member:String,
    isSaving:{default:true,type:Boolean},
    remark:String,
    iscr:{default:true,type:Boolean},

    type:{default:0,type:Number},

},{timestamps:true});




module.exports = mongoose.models.transactionDB || mongoose.model("transactionDB", homeschema);


