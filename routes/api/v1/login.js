"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Login = mongoose.model('User');//con esto ya tenemos el modelo cargado

var TokenPushUser = mongoose.model('PushToken');//Modelo para token de usuario
var userAgent = require('useragent-lite');//modulo para controlar la plataforma del usuario
var pushToken = require('rand-token');//modulo que genera token de push

var hash = require('hash.js');
var jwt = require('jsonwebtoken');
var secret = require('../../../local_config');

var errorCall = require('../../../lib/errors');

//Metodo post para realizar login
router.post('/', function(req, res) {
    //recogemos datos
    var email = req.body.email;
    var pass = hash.sha512().update(req.body.pass).digest('hex');
    var device= userAgent(req.headers["user-agent"]).device;
    var platform= userAgent(req.headers["user-agent"]).platform;
    
    var lang = req.lang;
    var error = '';
    
    Login.findOne({email: email}).exec(function (err, user1) {
        if(err){
            error = 'error1';
            errorCall(lang,error, function(errorRecibido){
                return res.status(401).json({success: false, error: errorRecibido});
            });
        }else
        if(!user1){//significa que no tenemos usuario
            error = 'error2';
            errorCall(lang,error, function(errorRecibido){
                return res.status(401).json({success: false, error: errorRecibido});
            });
        }else
        if(user1.pass !== pass){
            error = 'error3';
            errorCall(lang,error, function(errorRecibido){

               return res.status(401).json({success: false, error: errorRecibido});

            });
        }else {
            //Pasado t odo esto significa que ha funcionado, devolvemos token de auth
            var token = jwt.sign({id: user1._id}, secret.jwt.secret, {expiresIn: "2days"});

            var tokenPushUser = new TokenPushUser();
            

            
            tokenPushUser.email = user1.email;
            if (device == "Android") {
                tokenPushUser.plataforma = 'android';
            }
            if (device == ("iPad" || "iPhone") && platform != "Desktop") {

                tokenPushUser.plataforma = 'ios';
            }
            tokenPushUser.token = pushToken.generate(8) + pushToken.generate(8);
            //mezclo 2 para evitar que se puedan repetir los token

            tokenPushUser.save(function (err, saved) {

                if (err) {
                    error = 'error4';
                    errorCall(lang, error, function (errorRecibido) {

                        return res.status(503).json({success: false, error: errorRecibido});
                    });
                }


                res.json({success: true, token: token, tokenPUSH: saved.token, plataforma: saved.plataforma});
            });
            //Termina el tokenMoment
        } //--------------------------------------------------------//
    });

    
});

//Metodo post para realizar login como invitado
router.post('/guest', function(req, res) {

    var device= userAgent(req.headers["user-agent"]).device;
    var platform= userAgent(req.headers["user-agent"]).platform;
    var error = '';
    var lang = req.lang;

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
                error = 'error4';
                errorCall(lang,error, function(errorRecibido){

                    return res.status(503).json({success: false, error: errorRecibido});
                });
            }

            error = 'error7';
            errorCall(lang,error, function(errorRecibido){

                return res.status(401).json({success: false, Importante: errorRecibido, guest: saved.email,
                    tokenPUSH: saved.token, platform: tokenPushUser.plataforma});
            });

        });
    

    });

module.exports = router;


