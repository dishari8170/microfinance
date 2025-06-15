import dbConnect from "@/lib/dbConnect";
import savingDB from "@/models/savingDB";
import loanDB from "@/models/loanDB";
import branchDB from "@/models/branchDB";
import {jwtVerify} from "jose";
import axios from "axios";

export default async function handlex(req, res) {


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


    }


    const tok = (await jwtVerify(req.cookies["token"], new TextEncoder().encode("raju"))).payload;
    if (tok.parent) {





        if (req.query.getallsavingac) {

            const dx = await savingDB.find({member: req.query.getallsavingac}, {
                name: 1,
                amount: 1,
                code: 1,
                phone: 1,
                agent: 1
            });


            res.status(200).json(dx);


        }


        if (req.body.t === "ac") {


            const code = await generateUserCodeConfig(tok.parent, 1)

            const g = await loanDB.create({code: code, employee: tok.code, branch: tok.parent, ...req.body})


            const options = {
                method: 'POST',
                url: 'https://control.msg91.com/api/v5/flow',
                headers: {
                    authkey: '434134Ath9vC3D5a674188ebP1',
                    accept: 'application/json',
                    'content-type': 'application/json'
                },


                data: `{
  "template_id": "67e3fd12d6fc050fe3301102",
  "short_url": "0",
  "realTimeResponse": "1", 
  "recipients": [
    {
      "mobiles": "91${req.body.phone}",
      "var1": "${req.body.name}",
      "var2": "${code}"

    }
  ]
}`

            };


            try {

                const {data} = await axios.request(options);

                console.log(data)

                // return   res.status(200).json(data)

            } catch (error) {

                console.error(error);

            }


            return res.status(200).json(g);


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

            dox.data = await loanDB.find({$or: searchQuery}, pro, queryOptions);
            dox.total = await loanDB.countDocuments({$or: searchQuery});
            res.status(200).json(dox);

            return;


            // return  res.status(200).json( await savingDB.find({}, {name: 1, code: 1, total: 1, amount: 1, date: 1,member:1}));

        }



    }
    return res.status(200).json(req.body);


}