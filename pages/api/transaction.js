import dbConnect from "@/lib/dbConnect";
import transactionDB from "@/models/transactionDB";
import savingDB from "@/models/savingDB";
import branchDB from "@/models/branchDB";
import {jwtVerify} from "jose";



export default async (req, res) => {

    await dbConnect()


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





    }





    switch (req.method) {

        case "GET": {

            const
                dox = {};
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
                let serchon = req.query.on || req.query.pro;

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


            console.log(searchQuery)
            dox.data = await transactionDB.find(searchQuery.length > 0 ? {
                $or: searchQuery,
                role: req.query.role
            } : {role: req.query.role}, pro, queryOptions);
            dox.total = await transactionDB.countDocuments(searchQuery.length > 0 ? {
                $or: searchQuery,
                role: req.query.role
            } : {role: req.query.role});
            res.status(200).json(dox);


        }
        break;

        case "POST": {

            if (req.cookies["token"]) {
                const tok = (await jwtVerify(req.cookies["token"], new TextEncoder().encode("raju"))).payload;

                if (Number.parseFloat(req.body.type) === 1) {


                    const s = await savingDB.findOne({code: req.body.code});

                    await transactionDB.create({
                        code: await generateUserCodeConfig(tok.parent, 2),

                        type: 1,
                        by: s.employee,
                        member:s.member,
                        to: req.body.code,
                        agent:s.agent,
                        amount: req.body.amount,
                        remark: req.body.remark,
                        iscr: true,

                        createdAt: new Date(req.body.date),



                    })

                    return res.status(200).json(s)


                }
            }



            res.status(200).json({})


        }
        break
        case "DELETE":{
            transactionDB.deleteOne({_id: req.query._id});

        }






    }




}