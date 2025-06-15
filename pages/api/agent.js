import userDB from "@/models/userDB";
import savingDB from "@/models/savingDB";
import transactionDB from "@/models/transactionDB";
import dbConnect from "@/lib/dbConnect";
import {jwtVerify} from "jose";


export default async function handler(req, res) {

    await dbConnect()





    if (req.query.code) {

        const t = await userDB.find({parent: req.query.code}, {name: 1});

        return res.json(t);
    }

    const tok = (await jwtVerify(req.cookies["token"], new TextEncoder().encode("raju"))).payload;

    if (tok.code) {

        const txd = await userDB.findOne({code: tok.code}, {name: 1, phone: 1, presentAddress: 1, photo: 1,dop:1});



        if (req.query.dash) {

        }


        if (req.query.info) {

            // const txd = await userDB.findOne({code: tok.code}, {name: 1, phone: 1, presentAddress: 1, photo: 1});

            return res.json({
                code: tok.code,
                name: txd.name,
                phone: txd.phone,
                presentAddress: Object.values(txd.presentAddress).join(" , "),
                photo: txd.photo
            });
        }

        if (req.query.mdx) {

            const txd = await userDB.findOne({code: tok.code}, {
                name: 1,
                code: 1,
                phone: 1,
                presentAddress: 1,
                photo: 1
            });

            const acc = await savingDB.find({member: tok.code})

            return res.json({
                code: tok.code,
                name: txd.name,
                phone: txd.phone,
                presentAddress: Object.values(txd.presentAddress).join(" , "),
                photo: txd.photo,
                ac: acc
            });


        }



    const result = await userDB.aggregate([

        // Step 1: Fetch the hierarchy
        {
            $graphLookup: {
                from: "userdbs", // Collection name for userDB
                startWith: req.query.x ,
                connectFromField: "code",
                connectToField: "parent",
                as: "hierarchy",
                maxDepth: 20, // Limit to 20 levels
                depthField: "level",
            },
        },

        {$match: { code: req.query.x }},


        {$unwind: "$hierarchy"},

        {
            $lookup: {
                from: "transactiondbs", // Collection name for transactionDB
                localField: "hierarchy.code",
                foreignField: "agent",
                as: "transactions",
            },
        },



            //
            //
            {
                $addFields: {
                    FD: {
                        $sum: {
                            $map: {
                                input: {
                                    $filter: {
                                        input: "$transactions",
                                        as: "transaction",
                                        cond: {
                                            $and: [
                                                {
                                                    $eq: ["$$transaction.isSaving", true]
                                                },




                                                {
                                                    $eq: ["$$transaction.type", 1]
                                                },

                                                // {$gte: ["$$transaction.updatedAt", new Date(req.query.start)]},
                                                // {$lte: ["$$transaction.updatedAt", new Date(req.query.end)]},


                                            ]

                                        },
                                    },
                                },
                                as: "fdTransaction",
                                in: "$$fdTransaction.amount",
                            },
                        },
                    },
                    loan: {
                        $sum: {
                            $map: {
                                input: {
                                    $filter: {
                                        input: "$transactions",
                                        as: "transaction",
                                        cond: {$eq: ["$$transaction.isSaving", false]},
                                    },
                                },
                                as: "loanTransaction",
                                in: "$$loanTransaction.amount",
                            },
                        },
                    },
                },
            },


        // Step 5: Group by levels
        {
            $group: {
                _id: "$hierarchy.level",
                users: {
                    $push: {
                        name: "$hierarchy.name",
                        role:"$hierarchy.role",
                        FD: "$FD",
                        code: "$hierarchy.code",
                        phone: "$hierarchy.phone",
                        loan: "$loan",
                    },
                },
            },
        },


        // Step 6: Sort by levels
        {$sort: {_id: 1}},
    ]);


    res.status(200).json({data:result,gp:txd})

    } else {
        return res.json([]);
    }
}