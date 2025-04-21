const pool = require("../models/database");

exports.getStockData = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM stocks");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAvailableStock = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM stocks WHERE quantity > 0");
        if (rows.length === 0) {
            return res.status(404).json({ message: "No available stock found" });
        }
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching available stock data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.removeStock = async (req, res) => {
    const { id } = req.body;
    try {
        const [result] = await pool.query("DELETE FROM stocks WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Stock not found" });
        }
        res.status(200).json({ message: "Stock removed successfully" });
    } catch (error) {
        console.error("Error removing stock:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.updateStock = async (req, res) => {
    const { id, quantity } = req.body;
    try {
        const [result] = await pool.query("UPDATE stocks SET quantity = ? WHERE id = ?", [quantity, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Stock not found" });
        }
        res.status(200).json({ message: "Stock updated successfully" });
    } catch (error) {
        console.error("Error updating stock:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.addStock = async (req, res) => {
    const { brand, model, year, location, partnumber, partname, quantity } = req.body;
    try {
        const [result] = await pool.query("INSERT INTO stocks (brand, model, year, location, partnumber, partname, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)", [brand, model, year, location, partnumber, partname, quantity]);
        res.status(201).json({ message: "Stock added successfully", id: result.insertId });
    } catch (error) {
        console.error("Error adding stock:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}