"use strict";

var fs = require('fs');
var errorsFile = ('./datosIniciales/errorStrings.json');

//Leemos el fichero de errores
var fichero =fs.readFile(errorsFile,function (error, data) {
    if(error){
        return console.log(error);
    }
    fichero=data;
});


module.exports = function (languaje, error, callback) {
//Exportamos funcion que devuelve en el callback segun el idioma con el que lo hayamos llamado
    
        var JSONFileErrors = '';
        
        if(languaje == 'es' || languaje == 'es-ES') {
            JSONFileErrors = JSON.parse(fichero).spanishError;
        } else {
           
            JSONFileErrors = JSON.parse(fichero).englishError;
        }
        
       callback(JSONFileErrors[error]);
  
    
};