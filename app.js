var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
       
var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({}));

// API endpoints
app.use("/api/product",require("./controllers/products"));
app.use("/api/category",require("./controllers/category"));

module.exports = app;