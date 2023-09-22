const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./config')
const categorieControler = require('./controllers/categories');
const productControler = require('./controllers/product')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(categorieControler);
app.use(productControler);

module.exports = app;