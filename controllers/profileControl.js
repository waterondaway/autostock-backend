const pool = require("../models/database");

exports.getProfile = async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", id);
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.editProfile = async (req, res) => {
    const { id, name, email, phone } = req.body;
    try {
        const [result] = await pool.query("UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?", [name, email, phone, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "users not found" });
        }
        res.status(200).json({ message: "users updated successfully" });
    } catch (error) {
        console.error("Error updating users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};