import mongoose from "mongoose";

const homeSchema
    = new mongoose.Schema(
    {

        search: { type: String, required: true },
        code: { type: Number, required: true },

    }

);

module.exports =
    mongoose.models.agentDB || mongoose.model("agentDB", homeSchema);
