import mongoose from "mongoose";



const homeschema = new mongoose.Schema({
    parent :String,
    code:String,
    type:String,
    customer:String,
    term:Number,
    rate:Number,
    ltype:Boolean,
    amount:Number,
    tenure:Number,
    doc:{ type: Map,
        of: String,  },
});




module.exports = mongoose.models.loanDB || mongoose.model("loanDB", homeschema);


