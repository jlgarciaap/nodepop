"use strict";

var mongoose = require('mongoose');



var usuarioSchema = mongoose.Schema({

    nombre: String,
    email: String,
    pass: String

});

usuarioSchema.index({'email':1}, { unique: true});

mongoose.model('User',usuarioSchema);
