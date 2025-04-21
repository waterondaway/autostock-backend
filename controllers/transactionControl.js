exports.getTransactionData = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM transactions");
        if (rows.length === 0) {
            return res.status(404).json({ message: "No transactions found for this user" });
        }
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching transaction data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}