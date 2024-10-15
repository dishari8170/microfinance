
import dbConnect from "@/lib/dbConnect";



export default async (req, res) => {
    await dbConnect();

    if (req.method === "POST") {
        try {
            const { search, code } = req.body;
            const newAgent = new Agent({ search, code });
            await newAgent.save();
            res.status(201).json(newAgent);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}



