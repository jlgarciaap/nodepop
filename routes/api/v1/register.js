"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Register = mongoose.model('User');

var errorCall = require('../../../lib/errors');

var hash= require('hash.js');

//Metodo post donde realizamos el registro del usuario pasandole en el body nombre, email y pass
router.post('/', function(req, res) {
    
    var lang = req.lang;
    var error = '';
    
    var register = new Register(req.body);
    
    if(!register.nombre || !register.email || !register.pass) {

        error = 'error5';
        errorCall(lang, error, function (errorRecibido) {

            return res.status(500).json({success: false, error: errorRecibido});

        });
    }else {
        register.pass = hash.sha512().update(register.pass).digest('hex');

        register.save(function (err, saved) {

            if (err) {
                error = 'error6';
                errorCall(lang, error, function (errorRecibido) {

                    return res.status(500).json({success: false, error: errorRecibido});
                });
            } else {

                return res.json({success: true, save: saved});
            }
        });
    }

});



module.exports = router;
