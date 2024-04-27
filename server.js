const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true, limit: '1m'}));
app.use(bodyParser.json());

const urlRouter = require('./routes/url_routes');
app.use('/',urlRouter);

module.exports = app;