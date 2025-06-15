import userDB from "@/models/userDB";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {

    await dbConnect();


    let t=[]

    //




    for (let i = 0; i < 20; i++) {


        const  f=await userDB.create({

            "parent": `agent${i-1}`,
            "code": `agent${i}`,
            "role": "Agent",
            "name": `Agent${i}`,
            "fatherName": "fname",
            "motherName": "mname",
            "guardianName": "gname",
            "phone": i,
            "dateOfBirth": "1111-11-11",
            "email": "",
            "presentAddress": {
                "village": "vilage",
                "post": "post",
                "block": "bbblock",
                "city": "Costomers",
                "dist": "distric",
                "state": "Costomers",
                "pincode": "123456"
            },
            "permanentAddress": {
                "village": "vilage",
                "post": "post",
                "block": "bbblock",
                "city": "Costomers",
                "dist": "distric",
                "state": "Costomers",
                "pincode": "123456"
            },
            "identityProof": "Aadhar Card",
            "identityProofNumber": "qwertyu",
            "addressProof": "Aadhar Card",
            "addressProofNumber": "qwertyuio",
            "identity_font": "dp.png",
            "identity_back": "dp.png",
            "address_font": "dp.png",
            "address_back": "dp.png",
            "photo": "dp.png",
            "signature": "dp.png",
            "__v": 0
        })

        t.push(f)


    }






    return res.status(200).json(f)

}