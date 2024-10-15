import dbConnect from "@/lib/dbConnect";

import directorr_masterDB from "@/models/directorr_masterDB";
export default async (req, res) => {

    await dbConnect()



    if (req.method==="GET"){
        let t= await directorr_masterDB .find()

        res.status(200).json(t)

    }


    if (req.method==="POST"){
        let rt=   await directorr_masterDB.create(req.body);


        res.status(200).json("done")



    }



}