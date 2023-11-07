//-------------------------Start of user.js (model)------------------------------------
//Importing Libraries
const mongoose = require('mongoose');


//--------------------------------------------------------------------------------------
//Creating Schema of object User
const userschema = mongoose.Schema({

    name: {type: String, required: true},
    surname: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
});

//--------------------------------------------------------------------------------------
//Exporting Schema
module.exports = mongoose.model('User', userschema);

//------------------------End of user.js (model)---------------------------------------