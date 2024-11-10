import mongoose from "mongoose";
const homeSchema
    = new mongoose.Schema(
    {

        username :String,
        password:String,
        role:String,enum:['customer','agent','admin','employee'],

    }

);

module.exports =
    mongoose.models.loginDB || mongoose.model("loginDB", homeSchema);
