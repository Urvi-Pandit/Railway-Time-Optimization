const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const multer = require('multer');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');

const {initializingPassport }=require('./handlers/passport.js');


const accountApi = require('./routes/account/index');

const errorHandlers = require('./handlers/errorHandlers');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({
  limit: '200mb'
}));
app.use(bodyParser.urlencoded({
  limit: '200mb',
  extended: true,
  parameterLimit: 100000
}));
app.use(cors())

app.use(cookieParser());




// handle our api routes!

app.use('/', accountApi);




module.exports = app;