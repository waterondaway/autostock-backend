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
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
        return res.status(400).json({ message: "Invalid items format" });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        for (const item of items) {
            const [rows] = await connection.query(
                "SELECT quantity FROM stocks WHERE partnumber = ?",
                [item.partnumber]
            );

            if (rows.length === 0) {
                // await connection.rollback();
                return res.status(404).json({ message: `Item partnumber ${item.partnumber} not found` });
            }

            if (rows[0].quantity === 0) {
                // await connection.rollback();
                return res.status(200).json({ message: `Item partnumber ${item.partnumber} is out of stock` });
            }

            await connection.query(
                "UPDATE stocks SET quantity = quantity - 1 WHERE partnumber = ?",
                [item.partnumber]
            );
        }

        await connection.commit();
        res.status(200).json({ message: "Stock updated successfully" });
    } catch (error) {
        await connection.rollback();
        console.error("Error updating stock:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        connection.release();
    }
};

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