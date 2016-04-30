"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Register = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Nodepop' });
});

//Aqui seria hacer un push de esto
 //   nombre: String,
 //   email: String,
 //   clave: String

module.exports = router;
