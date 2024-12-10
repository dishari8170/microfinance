import dbConnect from "@/lib/dbConnect";
import userDB from "@/models/userDB";



export default async (req, res) => {

    await dbConnect()

    const generateUserCode = async (len) => {
        const characters = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
        let userCode = '';

        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            userCode += characters[randomIndex];
        }

        const mi = await userDB.findOne({user_code: userCode})
        if (mi) {

            console.log("aaaaaaaaaaaaaaaa")
            return generateUserCode()
            
        }
        else {

            console.log(`bbbbbbbbbb${userCode}`)

            return userCode

        }




    }


    if (req.method==="GET"){



        if (
            req.query.dia

        )
        {

           return res.status(200).json(await generateUserCode(req.query.dia))


        }
        else if (req.query._id){
            const t = await userDB.findOne({_id: req.query._id})
            return res.status(200).json(t)
        }

        else {

            if (req.query.role){

                // let t= await userDB .find({role:req.query.role})
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


                dox.data = await userDB.find(searchQuery.length>0 ? {$or:searchQuery,role:req.query.role}:{role:req.query.role}, pro, queryOptions);
                dox.total= await userDB.countDocuments(searchQuery.length> 0?{$or:searchQuery,role:req.query.role}:{role:req.query.role});
                res.status(200).json(dox);






            }else {

                res.status(200).json({status:"error"})
            }


        }

    }


    if (req.method==="POST"){



        if (req.body._id){
            let rt=   await userDB.updateOne({_id:req.body._id},req.body);

            res.status(200).json({stat:"ok",msg:"accghh",da:rt});
        }else {
            const  vl= await userDB.findOne({phone:req.body.phone});


            if (vl){
                return  res.status(200).json({stat:"error",msg:"account alreadyrfg",val:vl})

            }else {
                let rt=   await userDB.create(req.body);
                res.status(200).json({stat:"ok",msg:"accghh",da:rt});
            }

        }



        

    }

    if (req.method==="DELETE"){
        let rt=   await userDB.deleteOne({_id:req.query._id});


        res.status(200).json(rt)



    }



}