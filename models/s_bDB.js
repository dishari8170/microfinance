import mongoose from "mongoose";
import {number} from "yup";
const homeSchema
    = new mongoose.Schema(
    {

       branch :String,
        from:Number,
        date:Number,

    }

);

module.exports =
    mongoose.models.s_bDB || mongoose.model("s_bDB", homeSchema);
