import mongoose from "mongoose";
const homeschema
    = new mongoose.Schema(
    {

        branchName:String,
        managerName:String,
        branchCode: String,
        prefix: String,
        address: String,
        phoneNumber: String,
        openingDate:String,}

);

module.exports = mongoose.models.Branch_masterDB || mongoose.model("Branch_masterDB", homeschema);
