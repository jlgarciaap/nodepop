"use strict";

var mongoose = require('mongoose');

var conn = mongoose.connection;

//handlers de eventos de conexion

//no es necesario hacer una funcion como callback si solo queremos por ejemplo hacer un console
conn.on('error', console.log.bind(console, 'connection error!!'));

//cuando hayas abierto
conn.once('open', function () {
    console.log('Connected mongoose base de datos');
});



//conectar con la base de datos

mongoose.connect('mongodb://localhost:27017/nodepopjl'); //no es necesario callback es un event emiter ya de por si
