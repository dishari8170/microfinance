import axios from "axios";
import userDB from "@/models/userDB";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {
await  dbConnect();
const Unstop=(len)=>{
        const characters = '1234567890';
        let userCode = '';

        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            userCode += characters[randomIndex];
        }
        return userCode;

    }
const yp= Unstop(4);

 await userDB.updateOne({phone:req.query.phone},{"otp":yp},{upsert:true});

    const options = {
        method: 'POST',
        url: 'https://control.msg91.com/api/v5/flow',
        headers: {
            authkey: '434134Ath9vC3D5a674188ebP1',
            accept: 'application/json',
            'content-type': 'application/json'
        },


        data: `{
  "template_id": "674175dbd6fc0524f2303bd2",
  "short_url": "0",
  "realTimeResponse": "1", 
  "recipients": [
    {
      "mobiles": "91${req.query.phone}",
      "var1": "${yp}"
    }
  ]
}`

    };



    try {

        const { data } = await axios.request(options);
        console.log(data);


        res.status(200).send({})

    } catch (error) {

        console.error(error);

    }

    res.status(200).send({})

}
