var mongoose = require('mongoose');

var fs = require('fs');

require('../models/Anuncio.js');

var Anuncio = mongoose.model('Anuncio');

var file = ('./anuncios/anuncios.json');

//var Anuncio = mongoose.model('Anuncio');

mongoose.connection.on('error', console.log.bind(console, 'connection error!!'));

console.log('Conectado');


mongoose.connect('mongodb://localhost:27017/nodepopjl', function (err) {
    
    if(err){
        console.log('Error en la conexion con la base de datos', err);
    }
 
    //eliminamos la coleccion y manejamos errores
    mongoose.connection.db.dropCollection('anuncios',function (err) {
        
        if(err){

        console.log('No existe la base de datos');
        } 
        

        console.log('Coleccion eliminada');
        console.log('Añadimos contenido de anuncios.json a la base de datos.....');
        
        
        console.log('Comenzamos lectura');

           
        fs.readFile(file,function (err, data) {

            if(err){
                return console.log('Error en la lectura', err);
            }

            var jsonFile = JSON.parse(data).anuncios;

            for(i = 0; i<jsonFile.length; i++) {

                var anuncios = new Anuncio(jsonFile[i]);

                anuncios.save(function (err, saved) {
                    if (err) {
                        next(err);
                        return;
                    }

                    console.log({success: true, save: saved});
                });
           };

        });
    });
});


