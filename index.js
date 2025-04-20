import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import loginRouter from './router/loginRouter.js'
import productRouter from './router/productRouter.js'
const app = express();
const port = 3000;

// ใช้ CORS
app.use(cors());

// ใช้ body-parser เพื่ออ่านข้อมูล JSON
app.use(bodyParser.json()); // ใช้ middleware ให้ express อ่าน JSON
app.use(loginRouter)
app.use(productRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});