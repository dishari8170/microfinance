import dbConnect from "@/lib/dbConnect";
import relationDB from "@/models/relationDB"

export default async (req, res) => {

    await dbConnect()



    if (req.method==="GET"){
        let t= await relationDB .find()

        res.status(200).json(t)

    }


    if (req.method==="POST"){
        let rt=   await relationDB.create(req.body);

        setTimeout(() => {
            res.status(200).json("done")
        }, 5000)





    }

    if (req.method==="DELETE"){
        let rt=   await relationDB.deleteOne({_id:req.query.id});


        res.status(200).json(rt)



    }



}