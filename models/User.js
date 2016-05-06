"use strict";

var mongoose = require('mongoose');



var usuarioSchema = mongoose.Schema({

    nombre: String,
    email: String,
    pass: String

});

usuarioSchema.index({'email':1}, { unique: true});

usuarioSchema.statics.registerTokenFind = function (email, callbackTokenFind) {

    var query = userModel.find(email);
    
    return query.exec(callbackTokenFind);

};

var userModel =mongoose.model('User',usuarioSchema);
