"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');


//Hariamos un post para dar de alta anuncios
router.post('/', function (req, res, next) {
    
   // esto es una prueba de subida de anuncios
    var prueba = new Anuncio(req.body);
    
    prueba.save(function (err, saved) {
        if(err){
            next(err);
            return;
        }
        
        res.json({success: true, save: saved});
    })


    
});

//Hariamos un put para actualizar algun anuncio

router.put('/', function (req, res, next) {
    res.render('anuncios', { title: 'Nodepop', tipoDeLlamada: 'put' });
});

//Hariamos un get para ver los anuncios



module.exports = router;