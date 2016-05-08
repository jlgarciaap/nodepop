"use strict";

var mongoose = require('mongoose');



var usuarioSchema = mongoose.Schema({

    nombre: String,
    email: String,
    pass: String

});

//Creamos indice por email
usuarioSchema.index({'email':1}, { unique: true});


//Se realiza la busqueda del usuario por el email y si funciona devolvemos datos
usuarioSchema.statics.registerTokenFind = function (email, callbackTokenFind) {

    var query = userModel.find(email);
    
    return query.exec(callbackTokenFind);

};

var userModel =mongoose.model('User',usuarioSchema);
