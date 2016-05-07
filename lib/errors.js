"use strict";

var fs = require('fs');
var errorsFile = ('./datosIniciales/errorStrings.json');

var fichero =fs.readFile(errorsFile,function (error, data) {
    if(error){
        return console.log(error);
    }
    fichero=data;
});


module.exports = function (languaje, error, callback) {

        var JSONFileErrors = '';
        
        if(languaje == 'es' || languaje == 'es-ES') {
            JSONFileErrors = JSON.parse(fichero).spanishError;
        } else {
           
            JSONFileErrors = JSON.parse(fichero).englishError;
        }
        
       callback(JSONFileErrors[error]);
  
    
};