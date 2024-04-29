const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

if (process.env.NODE_ENV == "development") {
    const swaggerUI = require("swagger-ui-express");
    const swaggerJsDoc = require("swagger-jsdoc");
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "URL Explorer System API",
                version: "1.0.0",
                description: "System that collects unique URLs and their corresponding HTML content.",
            },
            servers: [{url: process.env.SERVER_URL + ":" + process.env.PORT,},],
        },
        apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 }

app.use(bodyParser.urlencoded({extended:true, limit: '1m'}));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true});
const db = mongoose.connection;
db.on('error',error=>{console.error(error)});
db.once('open',()=>{console.log('db connected!')});

const urlRouter = require('./routes/url_routes');
app.use('/',urlRouter);

module.exports = app;