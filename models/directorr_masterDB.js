import mongoose from "mongoose";
const homeschema = new mongoose.Schema(
    {

        director_name: { type: String, required: true },
        appointment_date: { type: Date, required: true },
        din_no: { type: String, required: true },
        registration_date: { type: Date, required: true },
        share_amount: { type: Number, required: true },
        pay_mode: { type: String, required: true },
        cheque_no: { type: String, required: true },
        cheque_bank: { type: String, required: true },
        no_of_share: { type: Number, required: true },
        pay_date: { type: Date, required: true },
        cheque_date: { type: Date, required: true },
        abx: { type: String, default: "dp.png", required: true },
        to_account: { type: String, required: true },

    }

);

module.exports = mongoose.models.directorr_masterDB || mongoose.model("directorr_masterDB", homeschema);
