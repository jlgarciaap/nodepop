"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Login = mongoose.model('User');//con esto ya tenemos el modelo cargado

var TokenPushUser = mongoose.model('PushToken');//Modelo para token de usuario
var userAgent = require('useragent-lite');
var pushToken = require('rand-token');

var hash = require('hash.js');
var jwt = require('jsonwebtoken');
var secret = require('../../../local_config');


router.get('/', function (req, res){

    
   var ua= userAgent(req.headers["user-agent"]);

    var lang = req.lang;

    console.log(lang);
    
    var platform = ua.platform;
    
    console.log(platform);

    res.json({platform: platform, device: ua.device});

});


router.post('/', function(req, res) {
    var email = req.body.email;
    var pass = hash.sha512().update(req.body.pass).digest('hex');
    var device= userAgent(req.headers["user-agent"]).device;
    var platform= userAgent(req.headers["user-agent"]).platform;

    
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

        //-----------------------------------------------------------------//
        //TokenMoment
        //Guardamos el token push relacionado a este usuario

        var tokenPushUser=new TokenPushUser();
        
        tokenPushUser.email = user1.email;
        if(device == "Android"){
            tokenPushUser.plataforma = 'android';
        }
        if(device == "iPad"||"iPhone" &&  platform != "Desktop"){

            tokenPushUser.plataforma = 'ios';
        }
        tokenPushUser.token = pushToken.generate(8)+pushToken.generate(8);
        //mezclo 2 para evitar que se puedan repetir los token

        tokenPushUser.save(function(err, saved){

            if(err){

                console.log(err);
            }
            console.log({success: true, save: saved});

            res.json({success:true,  token: token, tokenPUSH: saved.token});
        });
        //Termina el tokenMoment
        //--------------------------------------------------------//
    });
    
    
});


router.post('/guest', function(req, res) {

    var device= userAgent(req.headers["user-agent"]).device;
    var platform= userAgent(req.headers["user-agent"]).platform;


        //-----------------------------------------------------------------//
        //TokenMoment
        //Guardamos el token push relacionado a este usuario

        var tokenPushUser=new TokenPushUser();

        tokenPushUser.email = pushToken.generate(3)+'guest'+pushToken.generate(3);
    
        if(device == "Android"){
            tokenPushUser.plataforma = 'android';
        }
        if(device == "iPad"||"iPhone" &&  platform != "Desktop"){

            tokenPushUser.plataforma = 'ios';
        }
        tokenPushUser.token = pushToken.generate(8)+pushToken.generate(8);
        //mezclo 2 para evitar que se puedan repetir los token

        tokenPushUser.save(function(err, saved){

            if(err){

                console.log(err);
            }

            res.json({success:true, Importante: 'Ahora mismo los invitados no tienen acceso al contenido intentelo mas tarde',
                guest: saved.email, tokenPUSH: saved.token, platform: saved.plataforma});

        });
    

    });

module.exports = router;


