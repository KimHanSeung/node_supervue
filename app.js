require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const index = require('./routes/index');
const users = require('./routes/users');
const movies = require('./routes/movies');
const boards = require('./routes/board');
const files = require('./routes/file');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/api/movie', movies);
app.use('/api/user', users);
app.use('/api/board', boards);
app.use('/api/file', files);

app.set('port', (process.env.PORT || 3000));

// set the secret key variable for jwt
app.set('jwt-secret', 'SeCrEtKeYfOrHaShInG')

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(process.env.MONGO_URI);
let db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to mongod server");
});


module.exports = app;
