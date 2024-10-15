import dbConnect from "@/lib/dbConnect"; // Connecting to the library
import maclDB from "@/models/maclDB"; // Accessing the main collection of books
import branchDB from "@/models/branchDB"; // Accessing the branches

export default async (req, res) => {
    await dbConnect(); // Librarian connects to the library

    try {
        // If a visitor wants to GET information
        if (req.method === "GET") {
            // If they ask about branches
            if (req.query.type === "branches") {
                const branches = await branchDB.find(); // Get all branches
                return res.status(200).json(branches); // Return the branches to the visitor
            }

            const books = await maclDB.find().populate('branch'); // Get all books with branch info
            return res.status(200).json(books); // Return the books to the visitor
        }

        // If a visitor wants to POST (add new information)
        if (req.method === "POST") {
            const { branch, from, date } = req.body; // Getting details from the visitor

            // If any detail is missing, inform the visitor
            if (!branch || !from || !date) {
                return res.status(400).json({ error: "Branch, From, and Date are required." });
            }

            // Add new entry (book) to the library
            const createdEntry = await maclDB.create({ branch, from, date });
            return res.status(201).json({ message: "Data submitted successfully.", data: createdEntry });
        }

        // If the method is not supported
        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("Error:", error); // Log any errors
        return res.status(500).json({ error: "An error occurred while processing your request." });
    }
};
