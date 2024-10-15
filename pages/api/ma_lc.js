
import dbConnect from "@/lib/dbConnect";
import maclDB from "@/models/maclDB";
import branchDB from "@/models/branchDB";

export default async (req, res) => {
    await dbConnect();

    try {
        if (req.method === "GET") {

            if (req.query.type === "branches") {
                const branches = await branchDB.find();
                return res.status(200).json(branches);
            }


            const data = await maclDB.find().populate('branch');
            return res.status(200).json(data);
        }

        if (req.method === "POST") {
            const { branch, from, date } = req.body;


            if (!branch || !from || !date) {
                return res.status(400).json({ error: "Branch, From, and Date are required." });
            }

            const createdEntry = await maclDB.create({ branch, from, date });
            return res.status(201).json({ message: "Data submitted successfully.", data: createdEntry });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};
