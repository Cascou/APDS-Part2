//------------------------------Start of Server.js------------------------------------
//Importing libraries
const http = require('https');
const app = require('./app');
const fs = require('fs');

//------------------------------------------------------------------------------------
//Setting up port
const port = 3000;

//------------------------------------------------------------------------------------
//Setting up server with SSL key and certificate
const server =  http.createServer({
        key: fs.readFileSync('keys/privatekey.pem'),
        cert: fs.readFileSync('keys/certificate.pem')
    }, app);

//------------------------------------------------------------------------------------
//Setting up server to listen to port
server.listen(port);

//------------------------------End of Server.js--------------------------------------