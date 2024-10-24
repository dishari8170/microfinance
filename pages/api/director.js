import dbConnect from "@/lib/dbConnect";
import directorDB from "@/models/directorDB"
export default async (req, res) => {

    await dbConnect()



    if (req.method==="GET"){
        let t= await directorDB .find()

        res.status(200).json(t)

    }


    if (req.method==="POST"){
        let rt=   await directorDB.create(req.body);


            res.status(200).json("done")






    }

    if (req.method==="DELETE"){
        let rt=   await directorDB.deleteOne({_id:req.query.id});


        res.status(200).json(rt)



    }



}