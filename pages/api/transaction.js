import dbConnect from "@/lib/dbConnect";
import transactionDB from "@/models/transactionDB";



export default async (req, res) => {

    await dbConnect()




                // let t= await transactionDB .find({role:req.query.role})
                //
                // res.status(200).json(t)


                const dox = {};
                const queryOptions = {};
                if (req.query.sort) {
                    queryOptions.sort = { [req.query.sort]: parseInt(req.query.mode) };
                }
                if (req.query.limit) {
                    queryOptions.skip = parseInt(req.query.skip) || 0;
                    queryOptions.limit = parseInt(req.query.limit);
                }
                // let yop={}
                // yop[req.query.search]=req.query.on


                const searchQuery = [];

                if (req.query.search){
                    let serchon = req.query.on || req.query.pro;

                    serchon.split(",").map((op,u)=>{
                        if (op === "_id") {

                            try {
                                const objectId = new mongoose.Types.ObjectId(req.query.search);
                                searchQuery.push({ _id: objectId });
                            } catch (error) {
                            }
                        } else {
                            searchQuery.push({
                                [op]: { $regex: new RegExp(req.query.search, "i") }
                            });
                        }




                    })


                }
                let pro= {};

                if (req.query.pro){

                    req.query.pro.split(",").map((op,u)=>{
                        pro[op]=1;
                    })

                }


                dox.data = await transactionDB.find(searchQuery.length>0 ? {$or:searchQuery,role:req.query.role}:{role:req.query.role}, pro, queryOptions);
                dox.total= await transactionDB.countDocuments(searchQuery.length> 0?{$or:searchQuery,role:req.query.role}:{role:req.query.role});
                res.status(200).json(dox);








}