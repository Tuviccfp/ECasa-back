const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
require('./config')
require('dotenv').config();
const masterRouter = require('./controllers/master');
const loginRouter = require('./controllers/login');
const adminRouter = require('./controllers/admin');
const productRouter = require('./controllers/product');
const connectionAndSetupSocket = require('./websocket/setup');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
connectionAndSetupSocket(server);

app.use(masterRouter);
app.use(loginRouter);
app.use(adminRouter);
app.use(productRouter);

module.exports = {app, server};