"use strict";

var mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({

    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags:[String]

});

//Metodo que usamos para realizar la busqueda en la base de datos segun unos criterios
anuncioSchema.statics.list = function (filter,start, limit, sort,includeTotal, callbackAnuncio) {

    var query = AnuncioModel.find(filter);
    query.skip(start);//que se salte los registros que me digan
    query.limit(limit);//limite de registros a partir de los registros que nos han dicho antes
    query.sort(sort);
    query.includeTotal = includeTotal;
    

    return query.exec(callbackAnuncio);//tema promesas


};

var AnuncioModel = mongoose.model('Anuncio', anuncioSchema);



