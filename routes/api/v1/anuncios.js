"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

//------------------------------------------------------------------//
    //Autenticacion

var jwtAuth = require('../../../lib/jwtAuth');

router.use(jwtAuth());

//----------------------------------------------------------------//
    //errores

var errorCall = require('../../../lib/errors');


//-------------------------------------------------------//
    //Metodo get que devuelve lista de anuncios segun unos parametros pasados por query
router.get('/', function(req, res){

    var nombre = req.query.nombre;
    var venta =  req.query.venta;
    var precio = req.query.precio || 0 ;
    var tag = req.query.tag;
    var start = parseInt(req.query.start) || 0; 
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;
    var total = '';

    var lang = req.lang;//para capturar el lenguaje en el header
    
    var criteria = {};

    if(typeof nombre != 'undefined'){
        
        criteria.nombre = new RegExp(nombre +'*',"i") ;
    }

    if(venta){
        criteria.venta = venta.toLowerCase() ==  "true";
        }

    if(req.query.includeTotal){
     total = req.query.includeTotal.toLowerCase() ==  "true";
    }
    
    if(tag){criteria.tags = {"$regex": tag, $options: "i"};}
    
    if(precio){
        //Aplicamos unos filtros segun caracteristicas especiales pasadas en la query del precio
        var guion = '-';
        var tamanoPrecio = precio.length;

        if(precio.indexOf(guion) > -1){//Si no contiene guion devolvera -1 si es mayor si lo contiene

            if(precio.indexOf(guion) === 0){criteria.precio = {$lte: precio.substr(1)};}
            //si es igual a cero esta lo primero
            else
            if(precio.indexOf(guion) == tamanoPrecio-1) {criteria.precio = {$gte: precio.substr(0,tamanoPrecio-1)};}
            //Si es igual al tamaño del string -1 esta al final

            else{//Entonces esta en medio jejeje
                var splitPrice = precio.split("-");
                var minPrice = splitPrice[0];//Esto seria del estilo 20-50 mayor que 20 menor que 50
                var maxPrice = splitPrice[1];

                criteria.precio = {$lte:maxPrice,$gte: minPrice};
            }
            
        }else{
            criteria.precio=precio;
        }
    }
    
    //A continuacion realizamos la busqueda con el metodo estatico que teniamos generado en el modelo de anuncio

    Anuncio.list(criteria, start, limit, sort, total, function (err, rows, totalCount) {
        var error = '';
        if(err){
            error = 'error4';
            errorCall(lang,error, function(errorRecibido){

                return res.status(503).json({success: false, error: errorRecibido});
            });
        }

        if(!total){
           return res.json({success:true, rows: rows});
        }
        totalCount= rows.length;

       return res.json({success:true, rows: rows, total: totalCount});


    });

});

//-------------------------------------------------------------------//
//Post donde subimos anuncios nuevos

router.post('/', function (req, res) {
    
    var anuncio = new Anuncio(req.body);
    var lowerCaseVenta = req.body.venta;
    var error = '';
    var lang = req.lang;
    
    if(!lowerCaseVenta || !req.body.nombre || !req.body.precio || !req.body.foto || !req.body.tags){

        error = 'error5';
        errorCall(lang,error, function(errorRecibido){

            return res.status(400).json({success: false, error: errorRecibido});
        });
    } else {

        anuncio.venta = lowerCaseVenta.toLowerCase() == "true";

        anuncio.foto = '/images/anuncio/' + anuncio.foto;

        anuncio.save(function (err, saved) {
            if (err) {
                error = 'error6';
                errorCall(lang, error, function (errorRecibido) {

                    return res.status(500).json({success: false, error: errorRecibido});
                });
            }
            res.json({success: true, save: saved});
        });
    }

});


module.exports = router;