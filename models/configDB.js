import mongoose from "mongoose";



const homeschema = new mongoose.Schema({

    branch:String,
    saving: { type: Number, default: 100000000 },
    loan: { type: Number, default: 100000000 },

});




module.exports = mongoose.models.configDB || mongoose.model("configDB", homeschema);


