import mongoose from "mongoose";

const presentAddressSchema ={
    village: String,
    post: String,
    block: String,
    city: String,
    dist: String,
    state: String,
    pincode: String,
};


const homeschema = new mongoose.Schema({
    parent :String,
    code:String,
    role :String,
    name: String,
    fatherName: String,
    motherName:String,
    guardianName: String,
    phone: String,
    dateOfBirth: String,
    email: String,
    otp:{
        type:String,
        default:Math.random().toString(32).substring(2,8)
    },
    naddress:String,
    nname:String,
    nrelation:String,
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
    nidentity_font: String,
    nidentity_back: String,
    address_font: String,
    address_back: String,
bop:{type:Date,default:Date.now},
    photo: String,
    signature : String,
    isActive : Boolean,
});




module.exports = mongoose.models.userDB || mongoose.model("userDB", homeschema);


