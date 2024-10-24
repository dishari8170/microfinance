import dbConnect from "@/lib/dbConnect";
import agentDB from "@/models/agentDB";


export default async (req, res) => {

    await dbConnect()

    const generateAgentCode = async () => {
        const characters = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
        let agentCode = '';

        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            agentCode += characters[randomIndex];
        }

        const mi = await agentDB.findOne({agent_code: agentCode})
        if (mi) {

            console.log("aaaaaaaaaaaaaaaa")
            return generateAgentCode()





        }
        else {

            console.log(`bbbbbbbbbb${agentCode}`)

            return agentCode

        }
        return mi;



    }


    if (req.method==="GET"){

        if (
            req.query.dia

        )
        {

            res.status(200).json(await generateAgentCode())


        }

        else {
            let t= await agentDB .find()

            res.status(200).json(t)

        }

    }


    if (req.method==="POST"){
        let rt=   await agentDB.create(req.body);

        setTimeout(() => {
            res.status(200).json("done")
        }, 5000)





    }

    if (req.method==="DELETE"){
        let rt=   await agentDB.deleteOne({_id:req.query.id});


        res.status(200).json(rt)



    }



}