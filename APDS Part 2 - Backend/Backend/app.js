//------------------------------Start of App.js---------------------------------------
//Importing libraries
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');

// Import Helmet and Morgan
const helmet = require('helmet');
const morgan = require('morgan');

//------------------------------------------------------------------------------------
//Importing Local Libaries
const issueRoutes = require('./routes/issue');
const userRoutes = require('./routes/user');

//------------------------------------------------------------------------------------
//Initializing local variables
const urlprefix = '/api';
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: cert
};
const connstring = 'mongodb+srv://admin:GQDMGyu88a5bsAUF@cluster0.kcv0ba4.mongodb.net/GovernmentIssues?retryWrites=true&w=majority'

//------------------------------------------------------------------------------------
//Connected to MongoDB database
mongoose.connect(connstring)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch(()=>{
    console.log('Not Connected to MongoDB');
}, options)

//parses incoming JSON payloads
app.use(express.json());

// Implementing Helmet for enhanced security
app.use(helmet());

// Implementing Morgan for request logging
app.use(morgan('combined'));

//Implementing CORS.
// Add the CORS middleware
app.use(cors());

//using issue & user API routes
app.use(urlprefix + '/issue', issueRoutes);
app.use(urlprefix + '/user', userRoutes);

//------------------------------------------------------------------------------------
//Exporting app to be used in server.js
module.exports = app;

//------------------------------End of App.js-----------------------------------------