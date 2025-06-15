import dbConnect from "@/lib/dbConnect";
import userDB from "@/models/userDB";
import savingDB from "@/models/savingDB";
import Branch_masterDB from "@/models/branchDB";


export default async function handler(req, res) {

    await dbConnect();



    const t = await savingDB.findOne({code:req.body.code})
    const i = await userDB.findOne({code:t.member})
    const a = await userDB.findOne({code:i.parent})
    const b =await Branch_masterDB.findOne({code:t.code.substring(0,3)})??"Main"

    // const u = {"Father Name":i.fatherName,"Mother Name":i.mothername,"Address":i.presentAddress,"Account Number":t.code}
    const u = {
        "Account Holder": i?.name,       "A/c No": t?.code,

        "Father Name": i?.fatherName,

        "Member Id":i?.code,
        "Agent Name":a?.name,
        "Agent ID":a?.code,
        "Mobile Number":i?.phone,
        "A/c Type": "Saving",
        "Opening date": t?.createdAt.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }),



        "Tenure":t?.days/30 +" Month",

        "Branch Code": b?.code,
        "Amount": t?.amount,


        "Branch Name": b?.branchName,


        "":"",



        "Address": `${i.presentAddress.village},${i.presentAddress.city},${i.presentAddress.state},${i.presentAddress.pincode}`,



    };




    return res.status(200).json(u)



}