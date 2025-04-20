import database from "../service/database.js";
import jwt from 'jsonwebtoken';

// export async function test(req, res) {
//   try {
//     console.log('Test Login');
//     const result = await database.query('SELECT * FROM users');
//     return res.json(result.rows);
//   } catch (err) {
//     console.error('Error during query:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

export async function Login(req, res) {
  const secret = 'mySecretKey'; // ตั้งชื่ออะไรก็ได้
    console.log('Member Login')
      try {
        const {id} = req.body;
        console.log(id)
    
        // Query the database for the user by email
        const result = await database.query({
          text: `SELECT * FROM users WHERE "id" = $1`,
          values: [id],
        });
    
        // If no user is found, return an error
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        if (result.rows[0] != null) {
          // Create a JWT token if password matches
          const token = jwt.sign({ name: result.rows[0].name },secret, { expiresIn: '1h' });
          // Return a successful response with the token
          return res.json({
            message: 'success',
            name: result.rows[0].name,
            token,
          });
        } else {
          // If password does not match
          return res.status(401).json({ error: 'fail' });
        }
      } catch (error) {
        console.error('Error querying database:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }