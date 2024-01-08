const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
require('./config')
require('dotenv').config();
const loginRouter = require('./controllers/login');
const masterRouter = require('./controllers/master');
const adminRouter = require('./controllers/admin');
const funcRouter = require('./controllers/employee');
const productRouter = require('./controllers/product');
const categoryAndSubCategoryRouter = require('./controllers/categories');
const connectionAndSetupSocket = require('./websocket/setup');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connectionAndSetupSocket(server);

app.use(loginRouter);
app.use(masterRouter);
app.use(adminRouter);
app.use(funcRouter);
app.use(productRouter);
app.use(categoryAndSubCategoryRouter);

module.exports = {app, server};