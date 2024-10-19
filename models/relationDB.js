import mongoose from "mongoose";

const homeSchema
    = new mongoose.Schema(
    {

        relation: { type: String, required: true },

    }

);

module.exports =
    mongoose.models.relationDB || mongoose.model("relationDB", homeSchema);
