"use strict";

var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({

    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags:[String]

});

anuncioSchema.statics.list = function (filter,start, limit, sort,  callbackAnuncio) {

    var query = AnuncioModel.find(filter);
    query.skip(start);//que se salte los registros que me digan
    query.limit(limit);//limite de registros a partir de los registros que nos han dicho antes
    query.sort(sort);

    return query.exec(callbackAnuncio);//tema promesas


};

var AnuncioModel = mongoose.model('Anuncio', anuncioSchema);



