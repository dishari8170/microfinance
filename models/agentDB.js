import mongoose from "mongoose";

const presentAddressSchema = new mongoose.Schema({
    village: String,
    post: String,
    block: String,
    city: String,
    dist: String,
    state: String,
    pincode: String,
});

const homeschema = new mongoose.Schema({

    agent_code:String,
    name: String,
    fatherName: String,
    guardianName: String,
    mobileNo: String,
    dateOfBirth: String,
    email: String,
    presentAddress: presentAddressSchema,
    permanentAddress: presentAddressSchema,
    identityProof: String,
    identityProofNumber: String,
    addressProof: String,
    addressProofNumber: String,
    identityProofImage: String,
    addressProofImage: String,
});

module.exports = mongoose.models.agentDB || mongoose.model("agentDB", homeschema);
