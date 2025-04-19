const express = require('express');
const { readdirSync, read, readdir } = require('fs');
const app = express();
const port = 5000;

readdirSync('./routes')
    .map((file) => { app.use('/api', require(`./routes/${file}`)); });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});