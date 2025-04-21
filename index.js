const express = require('express');
const { readdirSync } = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const port = 8000;

const app = express();
app.use(morgan('dev'));
app.use(cors());

readdirSync('./routes')
    .map((file) => { app.use('/api', require(`./routes/${file}`)); });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});