
import HomeDB from "@/models/HomeDB"
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {

    await dbConnect()

    const age = 20
    const name = "didi"


    // const t= await HomeDB.create({n:"bucha",a:20})
    // const t= await HomeDB.deleteMany({n:"didi"})


    // const t= await HomeDB.updateOne({n:"raju"},{n:"dishari"})



    // const t= await HomeDB.updateOne({n:"raju"},{n:"raju"},{upsert:true})


    // const t= await HomeDB.find()
    // const t= await HomeDB.find({n:"bucha"})
    // const t= await HomeDB.findOne({n:"bucha"})

    // const t= await HomeDB.findOne({n:"bucha",a:20},{n:1})


    const t= await HomeDB.find({a:{$gt:10}},{},{limit:1,skip:1})



    res.status(200).json(t);


}
