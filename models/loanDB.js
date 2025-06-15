import mongoose from "mongoose";


const homeschema = new mongoose.Schema({

        code: String,
        type: String,
        member: String,
        name: String,
        phone: String,
        employee: String,
        status: Number,
        agent: String,
        branch: String,

        date: {
            type: Date,
            default: Date.now,

        },
        term: {
            days: {
                type: Number,
                default: 360
            },
            rate: {
                type: Number,
                default: 32
            }

        },
        amount: Number,
        bank: {
            name: String,
            ac: String,
            ifsc: String,
            ben: String
        },
        doc: {
            type: Map,
            of: String,
            default: {},

        },
    }, {
        timestamps: true
    }
);


module.exports = mongoose.models.loanDB || mongoose.model("loanDB", homeschema);


