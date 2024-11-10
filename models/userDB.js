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
parent_code :String,
    code:String,
    role :String,
    name: String,
    fatherName: String,
    motherName:String,
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
    identity_font: String,
    identity_back: String,
    address_font: String,
    address_back: String,
    photo: String,
    signature : String,
});




module.exports = mongoose.models.userDB || mongoose.model("userDB", homeschema);
module.exports = mongoose.models.userDB || mongoose.model("userDB", documentschema);


