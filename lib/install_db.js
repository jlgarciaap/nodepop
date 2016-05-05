"use strict";

var mongoose = require('mongoose');

var fs = require('fs');

require('../models/Anuncio.js');
require('../models/User.js');

var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('User');

var file = ('./datosIniciales/initialData.json');


var hash= require('hash.js');
var async  = require('async');


//----------------------------------------------------------------------------//
//Conexion con la base de datos

mongoose.connection.on('error', console.log.bind(console, 'connection error!!'));

console.log('Conectado');

var saveComplete = 0;

mongoose.connect('mongodb://localhost:27017/nodepopjl', function (err) {
    
    if(err){
        console.log('Error en la conexion con la base de datos', err);
        return;
    }
//---------------------------------------------------------//    
    //Si va bien eliminamos la base de datos si existe y manejamos errores
    
    mongoose.connection.db.dropDatabase('nodepopjl',function (err) {
        
        if(err){
            console.log('No existe la base de datos, la creamos');
            
        } else {
            console.log('Coleccion eliminada');
        }
    });

//---------------------------------------------------------//
    //Leemos el fichero de carga inicial
    
    fs.readFile(file,function (err, data) {

        console.log('Comenzamos lectura');

        if(err){
            return console.log('Error en la lectura', err);
        }
//---------------------------------------------------------//
        //Parseamos la parte de usuarios
        
        var jsonFileUsuarios = new Usuario(JSON.parse(data).usuarios);
        
        jsonFileUsuarios.pass = hash.sha512().update(jsonFileUsuarios.pass).digest('hex');
        
        jsonFileUsuarios.save(function (err, saved) {       
            if(err){
                console.log(err);
                return;
            }
            console.log({success: true, save: saved});
        });
//----------------------------------------------------------//
        //Parseamos la parte de datosIniciales. Como son varios usamos async para leer cada uno
        
        var jsonFileAnuncios = JSON.parse(data).anuncios;
        
        async.each(jsonFileAnuncios,function (anuncio) {
            
            var anuncios = new Anuncio(anuncio);

            anuncios.save(function (err, saved) {
                if (err) {
                    return (err);
                }
                console.log({success: true, save: saved});

                saveComplete++;
                
//-------------------------------------------------------------------//
                //Y por ultimo si hemos leido y guardado todos cerramos la conexion
                
                if(saveComplete == jsonFileAnuncios.length){
                   
                    console.log('cerraaaaaando base de datoossss');

                    mongoose.connection.close();
                    
                }
            });
        });
    });
});


