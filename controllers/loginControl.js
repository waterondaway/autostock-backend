const pool = require("../models/database");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
    const secretKey = 'autostock';
    try {
        const { id } = req.body;
        console.log(req.body.id)
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = rows[0];
        const token = jwt.sign({ name: user.name }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message:"success" , token, name: user.name });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}