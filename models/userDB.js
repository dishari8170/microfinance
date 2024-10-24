import mongoose from "mongoose";
const homeschema
    = new mongoose.Schema(
    {

        user_id:String,
        password:String,
        user_type: String,
        mobile_no: String,
        email_id: String,
       full_name: String,
        log_in_branch:String,}

);

module.exports = mongoose.models.userDB || mongoose.model("userDB", homeschema);
