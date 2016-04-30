"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Login = mongoose.model('User');//con esto ya tenemos el modelo cargado

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Nodepop' });
});

/* Seria hacer un get almacenar el token de la clave y comprobar con lo que envia el usuario*/


module.exports = router;


