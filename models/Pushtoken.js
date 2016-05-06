"use strict";

var mongoose = require('mongoose');


var pushTokenSchema = mongoose.Schema({

    plataforma: {type: String, enum: ['ios', 'android']},
    token: String,//usamos el propio _id como token push?
    email: String

});



mongoose.model('PushToken', pushTokenSchema);