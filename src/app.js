const express = require('express');
const app = express();
const tenant = require('./routes/tenant');
const image = require('./routes/image');

require('dotenv').config();
require('./db/db');

app.use(express.json());
app.use(tenant);
app.use(image);

app.get('/', (req,res)=>{
    console.log('connection');
    res.send(`New App Started ON:3000`);
});

module.exports = app;