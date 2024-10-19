import dbConnect from "@/lib/dbConnect";
import directorr_masterDB from "@/models/directorr_masterDB";

export default async (req, res) => {
    await dbConnect();

    if (req.method === "GET") {
        const records = await directorr_masterDB.find();
        res.status(200).json(records);
    } else if (req.method === "POST") {
        await directorr_masterDB.create(req.body);
        res.status(200).json("done");
    } else if (req.method === "DELETE") {
        const { id } = req.query;
        try {
            const result = await directorr_masterDB.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({ message: "Record not found" });
            }
            res.status(200).json({ message: "Record deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting record" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
