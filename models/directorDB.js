import mongoose from "mongoose";
const homeschema = new mongoose.Schema(
    {

            director_name: { type: String, required: true },
            appointment_date: { type: String, required: true },
            din_no: { type: String, required: true },
            registration_date: { type: String, required: true },
            share_amount: { type: String, required: true },
            pay_mode: { type: String, required: true },
            cheque_no: { type: String, required: true },
            cheque_bank: { type: String, required: true },
            no_of_share: { type: String, required: true },
            pay_date: { type: String, required: true },
            cheque_date: { type: String, required: true },
            to_account: { type: String, required: true }

    }

);

module.exports = mongoose.models.directorDB || mongoose.model("directorDB", homeschema);
