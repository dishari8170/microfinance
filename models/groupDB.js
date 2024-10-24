import mongoose from "mongoose";
const homeschema
    = new mongoose.Schema(
    {

        branchName:String,
        group_code:String,
        opening_date:String,
        group_branch:String,
        collection_code:String,
        collector_name:String,
        group_name:String,
        group_head:String,
        phone_no:String,
        address:String,
        member_code:String,
        name:String,}
);

module.exports = mongoose.models.groupDB || mongoose.model("groupDB", homeschema);
