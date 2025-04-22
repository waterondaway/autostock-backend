const express = require('express');
const { readdirSync } = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const loginRouter = require('./routes/loginRoute.js')
const stockRouter = require('./routes/stockRoute.js')
const transactionRouter = require('./routes/transactionRoute.js')
const port = 8000;

const app = express();
app.use(express.json()); // <<< ตัวนี้สำคัญมาก!
app.use(morgan('dev'));
app.use(cors());
app.use(loginRouter)
app.use(stockRouter)
app.use(transactionRouter)

readdirSync('./routes')
    .map((file) => { app.use('/api', require(`./routes/${file}`)); });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});