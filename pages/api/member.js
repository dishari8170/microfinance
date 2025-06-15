import transactionDB from "@/models/transactionDB";


import {jwtVerify} from "jose";
import dbConnect from "@/lib/dbConnect";
import savingDB from "@/models/savingDB";




export default async function handler(req, res) {
await  dbConnect()

    if (req.cookies["token"]) {

     const tok = (await jwtVerify(req.cookies["token"], new TextEncoder().encode("raju"))).payload;

        if (tok.code) {


            if (req.query.acc) {


                const data = await savingDB.find({
                    member: tok.code,


                })
            return     res.status(200).json(data);


            }


      const data = await transactionDB.find({ member: tok.code,

          "updatedAt": {
              "$gte": new Date( req.query.start ),
            "$lte": new Date( req.query.end),
          }

      })


            res.status(200).json(data);





        }else {
            return res.status(301).redirect("/")
        }


    }else {

        return res.status(301).redirect("/")
    }
}