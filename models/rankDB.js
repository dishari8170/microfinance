import mongoose from "mongoose";
const homeschema
    = new mongoose.Schema(
    {

        rank:Number,
        designation:String

    }

);

module.exports =
    mongoose.models.rankDB || mongoose.model("rankDB", homeschema);
