import mongoose from "mongoose";
const homeschema = new mongoose.Schema(
    {

        director_name:String,


        appointment_date:Number
            ,


        phoneNumber:Number,


    }

);

module.exports = mongoose.models.directorr_masterDB || mongoose.model("directorr_masterDB", homeschema);
