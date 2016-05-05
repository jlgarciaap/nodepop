"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Login = mongoose.model('User');//con esto ya tenemos el modelo cargado

var hash = require('hash.js');
var jwt = require('jsonwebtoken');
var secret = require('../../../local_config');


/* GET home page. */
router.post('/', function(req, res) {
    var email = req.body.email;
    var pass = hash.sha512().update(req.body.pass).digest('hex');
    
    Login.findOne({email: email}).exec(function (err, user1) {
        if(err){
            return res.status(500).json({success: false, error: err});
        }
        if(!user1){//significa que no tenemos usuario
            return res.status(500).json({success: false, error:'Auth failed user not found'});
        }
        if(user1.pass !== pass){
            return res.status(500).json({success: false, error:'Auth failed invalid password'});
        }
        //Pasado t odo esto significa que ha funcionado, devolvemos token de auth
        var token = jwt.sign({id:user1._id}, secret.jwt.secret, {expiresIn: "2days"});
        
        res.json({success:true, token: token});
    });
    
    
});

/* Seria hacer un get almacenar el token de la clave y comprobar con lo que envia el usuario*/


module.exports = router;


