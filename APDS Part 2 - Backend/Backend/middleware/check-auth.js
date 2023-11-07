//-------------------------Start of check-auth.js------------------------------------
//Importing Libraries
const jwt = require('jsonwebtoken');

//------------------------------------------------------------------------------------
//exporting middleware method that checks if user exists in Mongo
module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'secret_sign_for_government_users');
        next();
    }catch(error){
        res.status(401).json({
            message: 'Invalid token'
        });
    }
};
//----------------------------End of check-auth.js------------------------------------
