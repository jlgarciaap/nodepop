"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Register = mongoose.model('User');

var errorCall = require('../../../lib/errors');

var hash= require('hash.js');

/* GET home page. */
router.post('/', function(req, res) {
    
    var lang = req.lang;
    var error = '';
    
    var register = new Register(req.body);
    
    
    register.clave = hash.sha512().update(register.clave).digest('hex');

    register.save(function(err, saved){
        
        if(err){
            error = 'error6';
            errorCall(lang, error, function (errorRecibido) {

                return res.status(500).json({success: false, error: errorRecibido});
            });
        }
        
        return res.json({success: true, save: saved});
        
    });

});



module.exports = router;
