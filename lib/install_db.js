var mongoose = require('mongoose');

var fs = require('fs');

require('../models/Anuncio.js');

var Anuncio = mongoose.model('Anuncio');

var file = ('./anuncios/anuncios.json');

//var Anuncio = mongoose.model('Anuncio');

mongoose.connection.on('error', console.log.bind(console, 'connection error!!'));

console.log('Conectado');


mongoose.connect('mongodb://localhost:27017/nodepopjl', function (err) {
 
    //eliminamos la coleccion y manejamos errores
    mongoose.connection.db.dropCollection('anuncios',function (err, result) {
        
       
    if(err){

        console.log('No existe la base de datos');
        

    } else {

        console.log('Coleccion eliminada', result);
    }
        
        //con esto borramos la coleccion si existe de momento tenemos el process.exit para salir, realmente tenemos
        //tenemos que continuar y añadir el package.json
        
    });
    
    
    
});

fs.readFile(file,function (err, data) {
    
    
    
    if(err){
        
        return console.log('Error en la lectura', err);
        
    }
    
    var jsonFile = JSON.parse(data);
    
    console.log(jsonFile);
    
    var anuncios= new Anuncio(jsonFile);

    //separar cada array y guardarlo
    
    anuncios.save(function (err, saved) {
        if(err){
            next(err);
            return;
        }

        console.log({success: true, save: saved});
        
        
    });
    
    
});