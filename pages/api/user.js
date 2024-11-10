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
        return mi;



    }


    if (req.method==="GET"){

        if (
            req.query.dia

        )
        {

           return res.status(200).json(await generateUserCode(req.query.dia))


        }

        else {
            let t= await userDB .find()

            res.status(200).json(t)

        }

    }


    if (req.method==="POST"){

        const  vl= await userDB.findOne({phone:req.body.phone});


        if (vl){
            return  res.status(200).json({stat:"error",msg:"account alreadyrfg",val:vl})
        }
        let rt=   await userDB.create(req.body);

        setTimeout(() => {
            res.status(200).json({stat:"ok",msg:"accghh"});
        }, 5000)

        

    }

    if (req.method==="DELETE"){
        let rt=   await userDB.deleteOne({_id:req.query.id});


        res.status(200).json(rt)



    }



}