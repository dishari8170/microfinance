import mongoose from "mongoose";
const homeschema = new mongoose.Schema(
    {

      n:String,
        a:Number

    }

);

module.exports =
    mongoose.models.HomeDB || mongoose.model("HomeDB", homeschema);
