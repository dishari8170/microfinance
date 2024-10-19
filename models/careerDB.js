import mongoose from "mongoose";

const homeSchema
    = new mongoose.Schema(
    {

        rank: { type: String, required: true },
        designation: { type: String, required: true },
        mly_target: { type: String, required: true },
        yly_target: { type: String, required: true },
        promotion: { type: String, required: true },
        mfa: { type: String, required: true },
        bde: { type: String, required: true }
    }

);

module.exports =
    mongoose.models.careerDB || mongoose.model("careerDB", homeSchema);
