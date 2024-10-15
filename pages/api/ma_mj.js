import dbConnect from "@/lib/dbConnect";
import majmDB from "@/models/majmDB"
import branch from "@/models/Branch_masterDB"
export default async (req, res) => {

    await dbConnect()



    if (req.method==="GET"){
        let t= await majmDB .find();
        let b= await branch .find();

        res.status(200).json({org:t,b:b});

    }


    if (req.method==="POST"){
        let rt=   await majmDB.create(req.body);


        res.status(200).json("done")



    }



}