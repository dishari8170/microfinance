// models/branchDB.js
import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({

    code:String,
    saving: { type: Number, default: 0 },
    loan: { type: Number, default: 0 },
    transaction: { type: Number, default: 0 },


    branchName:String,
    managerName:String,
    branchCode: String,
    prefix: String,
    address: String,
    phoneNumber: String,
    openingDate:String,



});

module.exports = mongoose.models.branchDB
    || mongoose.model("branchDB", branchSchema);
