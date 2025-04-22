const pool = require("../models/database");
exports.recordTransaction = async (req, res) => {
    const { member, date, time, items } = req.body;

    if (!member || !date || !time || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน" });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            "INSERT INTO transactions (employee, datetime) VALUES (?, ?)",
            [member, `${date} ${time}`]
        );
        const transactionId = result.insertId;

        const itemMap = {};
        items.forEach(({ partnumber }) => {
            itemMap[partnumber] = (itemMap[partnumber] || 0) + 1;
        });

        for (const partnumber in itemMap) {
            const qty = itemMap[partnumber];
            await connection.query(
                "INSERT INTO transaction_items (transaction_id, partnumber, quantity) VALUES (?, ?, ?)",
                [transactionId, partnumber, qty]
            );
        }

        await connection.commit();
        res.status(200).json({ message: "บันทึกรายการสำเร็จ", transactionId });

    } catch (err) {
        await connection.rollback();
        res.status(500).json({ message: err.message });
    } finally {
        connection.release();
    }
};

exports.getTransaction = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM transactions");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getTransactionDetail = async (req, res) => {
    const transactionId = req.params.id;
    try {
        const [rows] = await pool.query("SELECT * FROM transaction_items WHERE transaction_id = ?", [transactionId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};