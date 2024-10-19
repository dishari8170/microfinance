import dbConnect from "@/lib/dbConnect";
import employDB from "@/models/employDB";

export default async (req, res) => {
    await dbConnect();

    try {
        if (req.method === "GET") {
            const data = await employDB.find();
            return res.status(200).json(data);
        }

        if (req.method === "POST") {
            const newEntry = await employDB.create(req.body);
            return res.status(201).json(newEntry);
        }

        if (req.method === "DELETE") {
            const result = await employDB.deleteOne({ _id: req.query.id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Not found" });
            }
            return res.status(200).json({ message: "Deleted successfully" });
        }

        // Handle unsupported methods
        return res.status(405).json({ message: "Method not allowed" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
