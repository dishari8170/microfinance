import userDB from "@/models/userDB";
import savingDB from "@/models/savingDB";

export default async (req, res) => {


    if (req.query.dash) {


        const ty = await userDB.aggregate([
            {
                $group: {
                    _id: "$role",
                    count: {$sum: 1}
                }
            }
        ])


        res.status(200).send(ty)

    }

    const saving={total:0,};

    const ty =  await savingDB.find({})



    res.status(200).send(ty)



}