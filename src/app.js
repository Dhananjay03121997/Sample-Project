const express = require('express');
const app = express();
const tenant = require('./routes/tenant');
const image = require('./routes/image');

require('dotenv').config();
require('./db/db');
const PORT = process.env.PORT;

app.use(express.json());
app.use(tenant);
app.use(image);

app.get('/', (req,res)=>{
    console.log('connection');
    res.send(`New App Started ON: ${PORT}`);
});

module.exports = app;