import dbConnect from "@/lib/dbConnect";
import rankDB from "@/models/rankDB"
export default async (req, res) => {

    await dbConnect()



    if (req.method==="GET"){
        let t= await rankDB .find()

        res.status(200).json(t)

    }


    if (req.method==="POST"){
        let rt=   await rankDB.create(req.body);

        setTimeout(() => {
            res.status(200).json("done")
        }, 5000)





    }

    if (req.method==="DELETE"){
        let rt=   await rankDB.deleteOne({_id:req.query.id});


        res.status(200).json(rt)



    }



}