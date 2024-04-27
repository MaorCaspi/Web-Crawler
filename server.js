const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true, limit: '1m'}))
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true});
const db = mongoose.connection;
db.on('error',error=>{console.error(error)});
db.once('open',()=>{console.log('db connected!')});

const urlRouter = require('./routes/url_routes');
app.use('/',urlRouter);

module.exports = app;