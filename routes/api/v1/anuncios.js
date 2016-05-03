"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

//------------------------------------------------------------------//

router.get('/', function(req, res, next){

    var nombre = req.query.nombre;
    var venta =  req.query.venta;
    if(venta){var booleanVenta = venta.toLowerCase() ==  "true";};//Pequeño truco para convertir en booleano real

    var precio = req.query.precio || 0 ;
    var tag = req.query.tag;
    var start = parseInt(req.query.start) || 0; //estos tienen que ser numericos para que funcionen por eso el parseInt
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;


    var criteria = {};

    if(typeof nombre != 'undefined'){
        
        criteria.nombre = new RegExp(nombre +'*',"i") ;
    }
    if(venta){criteria.venta = booleanVenta};
    
    if(tag){criteria.tags = {"$regex": tag, $options: "i"}};
    
    if(precio){

        var guion = '-';
        var tamanoPrecio = precio.length;

        if(precio.indexOf(guion) > -1){//Si no contiene guion devolvera -1 si es mayor si lo contiene

            if(precio.indexOf(guion) == 0){criteria.precio = {$lte: precio.substr(1)}}
            //si es igual a cero esta lo primero
            else
            if(precio.indexOf(guion) == tamanoPrecio-1) {criteria.precio = {$gte: precio.substr(0,tamanoPrecio-1)}}
            //Si es igual al tamaño del string -1 esta al final

            else{//Entonces esta en medio jejeje
                var splitPrice = precio.split("-");
                var minPrice = splitPrice[0];//Esto seria del estilo 20-50 mayor que 20 menor que 50
                var maxPrice = splitPrice[1];

                criteria.precio = {$lte:maxPrice,$gte: minPrice};
            }
            
        }else{
            criteria.precio=precio;
        };
    };


console.log(criteria.precio);

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