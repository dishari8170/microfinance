import dbConnect from "@/lib/dbConnect";
import s_bDB from "@/models/s_bDB"
export default async (req, res) => {

    await dbConnect()



    if (req.method==="GET"){
        let t= await s_bDB .find();

        res.status(200).json(t);

    }


    if (req.method==="POST"){
        let rt=   await s_bDB.create(req.body);


        res.status(200).json("done")



    }



}