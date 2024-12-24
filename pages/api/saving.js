import {jwtVerify} from "jose";
import userDB from "@/models/userDB";
import savingDB from "@/models/savingDB";
import branchDB from "@/models/branchDB";
import transactionDB from "@/models/transactionDB";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req, res) {

    await dbConnect();


    const generateUserCodeConfig = async (branch, isSaving = 0) => {


        let g = null;

        switch (isSaving) {
            case 0:
                g = (await branchDB.findOneAndUpdate({code: branch}, {$inc: {"saving": 1}}, {upsert: true})).saving;
                break;
            case 1:
                g = (await branchDB.findOneAndUpdate({code: branch}, {$inc: {"loan": 1}}, {upsert: true})).loan;
                break;
            case 2:
                g = (await branchDB.findOneAndUpdate({code: branch}, {$inc: {"transaction": 1}}, {upsert: true})).transaction;
                if (!g) {
                    g = "null"
                }
                break;
            default:
                g = `not${isSaving} found`;


        }

        console.log("=======>", g);


        return branch.toString() + ("0".repeat((10 - (branch.toString().length + g.toString().length))) + g)

        // await configDB.updateOne({branch: branch},{$inc:{"saving":1}});


        // const characters = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
        // let userCode = '';
        //
        // for (let i = 0; i < len; i++) {
        //     const randomIndex = Math.floor(Math.random() * characters.length);
        //     userCode += characters[randomIndex];
        // }
        //
        // const mi = await c.findOne({code: userCode})
        // if (mi) {
        //
        //     console.log("aaaaaaaaaaaaaaaa")
        //     return generateUserCode()
        //
        // }
        // else {
        //
        //     console.log(`bbbbbbbbbb${userCode}`)
        //
        //     return userCode
        //
        // }


    }


    if (req.cookies["token"]) {


        // const  a= await savingDB.updateOne({}, { date: { $dateAdd: { startDate: "$date", unit: "month", amount: 1 }}});


        const tok = (await jwtVerify(req.cookies["token"], new TextEncoder().encode("raju"))).payload;

        if (req.query.pay) {


            await transactionDB.create({
                code: await generateUserCodeConfig(tok.parent, 2),
                by: tok.code,
                to: req.query.code,
                remark: "Saving Payment received",
                amount: req.query.pay
            });
            if (req.query.due) {

                await transactionDB.create({
                    code: await generateUserCodeConfig(tok.parent, 2),
                    by: tok.code,
                    to: req.query.code,
                    remark: "Saving Penalty",
                    amount: req.query.due
                });
            }

            // let y= await   savingDB.updateOne({code: req.query.code},{ $set:{isNormal: !JSON.parse( req.query.isNormal) ,date:{ $dateAdd:{ startDate:"$date",unit:"month",amount:1}}}})


            let c = null;
            if (req.query.isNormal === 2 || req.query.permanet) {


                c = await savingDB.updateOne(
                    {code: req.query.code},
                    [
                        {

                            $set: {

                                isNormal: false,
                                date: {
                                    $dateAdd: {
                                        startDate: "$date", // The field containing the original date
                                        unit: "month", // Add months
                                        amount: 1, // Increment by 1 month
                                    },
                                },
                            },
                        },

                        {
                            $set: {
                                total: {$add: ["$total", Number.parseFloat(req.query.pay)]} // Increment the "total" field by 1000
                            }
                        }
                    ]
                );
            } else {


                c = await savingDB.updateOne(
                    {code: req.query.code},
                    [
                        {

                            $set: {


                                date: {
                                    $dateAdd: {
                                        startDate: "$date", // The field containing the original date
                                        unit: "month", // Add months
                                        amount: 1, // Increment by 1 month
                                    },
                                },
                            },
                        },

                        {
                            $set: {
                                total: {$add: ["$total", Number.parseFloat(req.query.pay)]} // Increment the "total" field by 1000
                            }
                        }
                    ]
                );
            }


            return res.status(200).json(c);


        }


        if (req.query.rajuxy){
            const rt= await savingDB.updateOne({code: req.query.rajuxy},{$set:{isActive:false}});
            return res.status(200).json(rt)

        }

        if (req.method === "DELETE" && req.query.raju) {


            let y = await savingDB.deleteOne({code: req.query.code})

            return res.status(200).json(y);
        }


        if (req.query.isNormal != null) {


            let y = await savingDB.find({code: req.query.code})

            return res.status(200).json(y);
        }

        if (req.method === "GET") {


            const dox = {};
            const queryOptions = {};
            if (req.query.sort) {
                queryOptions.sort = {[req.query.sort]: parseInt(req.query.mode)};
            }
            if (req.query.limit) {
                queryOptions.skip = parseInt(req.query.skip) || 0;
                queryOptions.limit = parseInt(req.query.limit);
            }
            // let yop={}
            // yop[req.query.search]=req.query.on


            const searchQuery = [];

            if (req.query.search) {
                let serchon = req.query.on;

                serchon.split(",").map((op, u) => {
                    if (op === "_id") {

                        try {
                            const objectId = new mongoose.Types.ObjectId(req.query.search);
                            searchQuery.push({_id: objectId});
                        } catch (error) {
                        }
                    } else {
                        searchQuery.push({
                            [op]: {$regex: new RegExp(req.query.search, "i")}
                        });
                    }


                })


            }
            let pro = {};

            if (req.query.pro) {

                req.query.pro.split(",").map((op, u) => {
                    pro[op] = 1;
                })

            }

            dox.data = await savingDB.find({$or: searchQuery}, pro, queryOptions);
            dox.total = await savingDB.countDocuments({$or: searchQuery});
            res.status(200).json(dox);

            return;


            // return  res.status(200).json( await savingDB.find({}, {name: 1, code: 1, total: 1, amount: 1, date: 1,member:1}));

        }

        if (req.body.t === "ac") {

            const user = await userDB.findOne({code: req.body.member});

            const saving = await savingDB.create({

                name: user.name,
                member: user.code,
                agent: user.parent,
                employee: tok.code,
                createdAt: req.body.date?new Date(req.body.date):Date.now(),
                amount: req.body.amount,
                date: req.body.date?new Date(req.body.date):Date.now(),
                total: 0,
                code: await generateUserCodeConfig(tok.parent,0)


            });

            return res.status(200).json(saving);


        }

    }


    return res.status(200).json(
        {data: [], total: 0}
    );

}