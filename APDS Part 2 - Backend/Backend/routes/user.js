//-------------------------Start of user.js (routes)------------------------------------
//Importing Libraries
const express = require('express');
const router = express.Router();
const expressBrute = require('express-brute');
const store = new expressBrute.MemoryStore(); // You can also use express-brute-mongo to store data in MongoDB
const bruteforce = new expressBrute(store);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//------------------------------------------------------------------------------------
//creating object of model user
const User = require('../models/user');


//------------------------------------------------------------------------------------
//Post API function to sign up user
router.post('/signup', bruteforce.prevent, async (req, res)=>{

    //i.e all input's will be validated on frontend

    //------------------------------------------------------------------------------------
    // creating variables of post body
    const {name, surname, username, password} = req.body;

    try{

        //------------------------------------------------------------------------------------
        //If statement checking that the variables are not undefined
        if(!name || !surname || !username || !password){
            return res.status(400).json({
                status: 'Bad Request',
                error: 'Not all fields are entered'
            });
        }else{
            
            //Creating local object of if the user exists in the db
            const existingUser = await User.findOne({username: req.body.username});

            //If statement checking if the user exists
            if(existingUser){
                return res.status(401).json({
                    status: 'Bad Request',
                    error: 'Username already exists, choose another'
                });
            }else{
                
                //encrypts user password, assigns it to an object and then inserts into mongodb
                bcrypt.hash(password, 10)
                .then(hash =>{
                    const user = new User({
                        name: name,
                        surname: surname,
                        username: username,
                        password: hash
                    });
                    user.save().then(result =>{
                        res.status(201).json({
                            status: 'Created',
                            message: 'Succesfully Created User',
                            result: result
                        });
                    })
                    .catch(err =>{
                        res.status(500).json({
                            status: 'Internal Server Error',
                            error: err
                        });
                    });    
                });
            }
        }
    }catch (err){
        return res.status(500).json({
            status: 'Internal Server Error',
            error: 'Registration Failure'
        });
    }
});

//------------------------------------------------------------------------------------
//Post API function to Login user
router.post('/login', bruteforce.prevent, async (req, res)=>{

    //i.e all input's will be validated on frontend

    //------------------------------------------------------------------------------------
    // creating variables of post body
    const {username, password} = req.body;

    try{

        //------------------------------------------------------------------------------------
        //If statement checking that the variables are not undefined
        if(!username || !password){
            return res.status(400).json({
                status: 'Bad Request',
                error: 'Not all fields are entered'
            });
        }else{

            //Creating local object of if the user exists in the db
            const fetchedUser = await User.findOne({username: username});

            if(!fetchedUser){
                return res.status(404).json({
                    status: 'Not Found',
                    error: 'Authentication Failure'
                });
            }else{

                //checks if passwords match
                const passwordCompare = await bcrypt.compare(password, fetchedUser.password);

                if(passwordCompare){

                    //if they match token is created
                    const token = jwt.sign({username: fetchedUser.username, userid : fetchedUser._id}, 'secret_sign_for_government_users', {expiresIn: '1h'});

                    return res.status(200).json({
                        status: 'Succesful Login',
                        token: token 
                    });
                }else{
                    res.status(400).json({
                        status: 'Bad Request',
                        error: 'Incorrect username/password, try again.'
                    })
                }
            }
        }
    }catch(error){
        res.status(500).json({
            status: 'Internal Server Error',
            message: 'Authentication Failure',
            error: error.toString()
        });
    }
});
    
//------------------------------------------------------------------------------------
//Exporting API routes
module.exports = router;

//-------------------------End of user.js (routes)------------------------------------