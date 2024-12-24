import userDB from "@/models/userDB";

import dbConnect from "@/lib/dbConnect";
import {SignJWT} from "jose";

export default async function handler(req, res) {

    if (req.method === 'POST') {
      await  dbConnect()
        const {username, password} = req.body;

        /*\\
                const axios = require('axios').default;

                const options = {
                    method: 'POST',
                    url: 'https://control.msg91.com/api/v5/flow',
                    headers: {
                        authkey: '434134Ath9vC3D5a674188ebP1',
                        accept: 'application/json',
                        'content-type': 'application/json'
                    },
                    data: '{\n  "template_id": "674175dbd6fc0524f2303bd2",\n  "short_url": "0",\n  "realTimeResponse": "1", \n  "recipients": [\n    {\n      "mobiles": "916296099913",\n      "var1": "1234"\n    }\n  ]\n}'
                };

                try {
                    const { data } = await axios.request(options);
                    console.log(data);
                } catch (error) {
                    console.error(error);
                }

         */


        if (username && password) {
            const user = await userDB.findOne({phone: username, otp: password});

            if (user){

                const iat = Math.floor(Date.now() / 1000);
                const exp = iat + 60* 60*60*2; // one hour
              const  token = await  new  SignJWT({code:user.code,role:user.role,parent:user.parent}).setProtectedHeader({alg:"HS256",typ:"JWT"}).setExpirationTime(exp).sign(new TextEncoder().encode("raju"));

                res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Secure; Max-Age=${60* 60*60}; SameSite=Strict`);

                res.status(301).json({role:user.role});
            }
        } else {
            res.status(401).json({message: 'Invalid credentials'});
        }


    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}