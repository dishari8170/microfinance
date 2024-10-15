import mongoose from "mongoose";
const homeSchema
    = new mongoose.Schema(
    {

        branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
        from:Number,
        date:Number,

    }

);

module.exports =
    mongoose.models.maclDB || mongoose.model("maclDB", homeSchema);
