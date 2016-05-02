"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

//------------------------------------------------------------------//
//De momento obtenemos una lista completa de todos los anuncios
router.get('/', function(req, res, next){

    var nombre = req.query.nombre;
    var venta =  req.query.venta;
    var booleanVenta = venta.toLowerCase() ==  "true";

    console.log(venta);
    //var precio = parseInt(req.query.precio)|| 0 ;
    var tag = req.query.tag;
    var start = parseInt(req.query.start) || 0; //estos tienen que ser numericos para que funcionen por eso el parseInt
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    console.log(tag);

    var criteria = {};

    if(typeof nombre != 'undefined'){
        
        criteria.nombre = new RegExp(nombre +'*',"i") ;
    }
    if(venta){criteria.venta = booleanVenta};
    
    if(tag){criteria.tags = {"$regex": tag, $options: "i"}};

console.log(criteria.tags);
    //criteria.precio = precio;

    
    console.log(criteria);

    Anuncio.list(criteria, start, limit, sort, function (err, rows) {

        if(err){
            return res.json({success:false, error: err}); //en lugar de usar el next devolvemos un mensaje de error mas legible
        }
        res.json({success:true, rows: rows});
    });

    
    
});

//-------------------------------------------------------------------//
//Post donde subimos anuncios nuevos

router.post('/', function (req, res, next) {

    var anuncio = new Anuncio(req.body);
    var lowerCaseVenta = req.body.venta;
    anuncio.venta = lowerCaseVenta.toLowerCase() == "true";
    console.log(anuncio.venta);
    
    anuncio.save(function (err, saved) {
        if (err){
            console.log(err);
            return;
        }
        res.json({success: true, save: saved});
    })


})


module.exports = router;