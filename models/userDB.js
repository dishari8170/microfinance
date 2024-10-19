import mongoose from "mongoose";
import {number} from "yup";

const homeSchema
    = new mongoose.Schema(
    {

        user_type: { type: String, required: true },

    }

);

module.exports =
    mongoose.models.userDB || mongoose.model("userDB", homeSchema);
