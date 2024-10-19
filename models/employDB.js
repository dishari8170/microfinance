import mongoose from "mongoose";
import {number} from "yup";

const homeSchema
    = new mongoose.Schema(
    {

        name: { type: String, required: true },
  type: { type: String, required: true },
  dp: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
access: [],

    }

);

module.exports =
    mongoose.models.userDB || mongoose.model("userDB", homeSchema);
