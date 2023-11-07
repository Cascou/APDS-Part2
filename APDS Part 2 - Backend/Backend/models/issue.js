//-------------------------Start of issue.js (model)------------------------------------
//Importing Libraries
const mongoose = require('mongoose');

//--------------------------------------------------------------------------------------
//Creating Schema of object Issue
const issueschema = mongoose.Schema({
    
    id: {type: String, required: true},
    subject: {type: String, required: true},
    description: {type: String, required: true},
    department: {type: String, required: true},
    province: {type: String, required: true},
    date: {type: String, required:true}
});

//--------------------------------------------------------------------------------------
//Exporting Schema
module.exports = mongoose.model('Issue', issueschema);

//------------------------End of issue.js (model)---------------------------------------