import mongoose from "mongoose";
import {bool} from "yup";




const homeschema = new mongoose.Schema({

    code:String,
    by:String,
    to:String,
    remark:String,
    iscr:{default:true,type:Boolean},
    amount:Number,

},{timestamps:true});




module.exports = mongoose.models.transactionDB || mongoose.model("transactionDB", homeschema);


