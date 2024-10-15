import dbConnect from "@/lib/dbConnect";
import Branch_masterDB from "@/models/Branch_masterDB"
export default async (req, res) => {

    await dbConnect()



    if (req.method==="GET"){
        let t= await Branch_masterDB .find()

        res.status(200).json(t)

    }


    if (req.method==="POST"){
        let rt=   await Branch_masterDB.create(req.body);

        setTimeout(() => {
            res.status(200).json("done")
        }, 5000)





    }

    if (req.method==="DELETE"){
        let rt=   await Branch_masterDB.deleteOne({_id:req.query.id});


        res.status(200).json(rt)



    }



}