"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Register = mongoose.model('User');

var hash= require('hash.js');

/* GET home page. */
router.post('/', function(req, res) {

    var register = new Register(req.body);
    
    register.clave = hash.sha512().update(register.clave).digest('hex');

    register.save(function(err, saved){
        
        if(err){
            
            console.log(err);
        }
        
        res.json({success: true, save: saved});
    });

});

//Aqui seria hacer un push de esto
 //   nombre: String,
 //   email: String,
 //   clave: String

module.exports = router;
