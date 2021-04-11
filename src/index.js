require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path')

const app = express();
const port = process.env.PORT || 5000

//Middlewares
app.use(morgan('dev'));
app.unsubscribe(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/routes'))

//Static Content
app.use(express.static(path.join(__dirname, 'public')));


app.listen(port);
console.log(`Running on port ${port}`)