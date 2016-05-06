"use strict";

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

//tema de base de datos
require('./lib/connect_Mongoose');
//cargamos el modelo de la base de datos
require('./models/Anuncio');
require('./models/Pushtoken');
require('./models/User');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Obtengo el lenguaje leyendo cabecera x-lang
app.use((req, res, next) => {
  req.lang = req.get('x-lang') || 'en';
  next();
});


app.use('/', require('./routes/index'));
app.use('/register', require('./routes/api/v1/register'));
app.use('/login', require('./routes/api/v1/login'));
app.use('/anuncios', require('./routes/api/v1/anuncios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
