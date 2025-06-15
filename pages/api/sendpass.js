import userDB from "@/models/userDB";
import user from "@/pages/api/user";
import dbConnect from "@/lib/dbConnect";
import axios from "axios";



export default async function handler(req, res) {

await dbConnect()
    if (req.query.phone) {


        const user = await userDB.findOne({phone: req.query.phone });

        if (user) {



            const options = {
                method: 'POST',
                url: 'https://control.msg91.com/api/v5/flow',
                headers: {
                    authkey: '434134Ath9vC3D5a674188ebP1',
                    accept: 'application/json',
                    'content-type': 'application/json'
                },


                data: `{
  "template_id": "67a6012dd6fc051462687cb2",
  "short_url": "0",
  "realTimeResponse": "1", 
  "recipients": [
    {
      "mobiles": "91${req.query.phone}",
      "var1": "${user.name}",
      "var2": "${user.code}",
      "var3": "${user.otp}"
    }
  ]
}`

            };



            try {

                const { data } = await axios.request(options);



              return   res.status(200).json(data)

            } catch (error) {

                console.error(error);

            }












        }







    }

    return res.status(401).json(req.query);




}