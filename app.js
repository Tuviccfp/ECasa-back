const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config')
require('dotenv').config();
const masterRouter = require('./controllers/master');
const loginRouter = require('./controllers/login');
const adminRouter = require('./controllers/admin');
const productRouter = require('./controllers/product');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(masterRouter);
app.use(loginRouter);
app.use(adminRouter);
app.use(productRouter);

module.exports = app;