//-------------------------Start of issue.js (routes)------------------------------------
//Importing Libraries
const express = require('express');
const router = express.Router();

//------------------------------------------------------------------------------------
//creating object of model user
const Issue = require('../models/issue');
//importing middleware to check authentication of User
const checkauth = require('../middleware/check-auth');

//------------------------------------------------------------------------------------
//GET API method that get's all current issues on the government bulletin board.
router.get('', checkauth, (req, res)=>{
    Issue.find().then((issue)=>{
        res.json({
            message: 'Current Issues Found',
            issue: issue
        });
    });
});

//------------------------------------------------------------------------------------
//POST API method that will post the issue on the governmnet bulletin board.
router.post('', checkauth, async (req, res)=>{

    //i.e. all inputs will be validated on the frontend

    //------------------------------------------------------------------------------------
    // creating variables of post body
    const {id, subject, description, department, province, date} = req.body;

    try{

        //------------------------------------------------------------------------------------
        //If statement checking that the variables are not undefined
        if(!id || !subject || !description || !department || !province || !date){
            return res.status(400).json({
                status: 'Bad Request',
                error: 'Not all fields are entered'
            });
        }else{

            //Creating local object of if the issue with that id exists in the db
            const existingIssue = await Issue.findOne({id: id});

            //If statement to see if the issue exists
            if(existingIssue){
                return res.status(401).json({
                    status: 'Bad Request',
                    error: 'Issue with that ID exists, try using a different ID'
                });
            }else{
                //creating Issue object with user entered data, and inserting into the db
                const issue = new Issue({
                    id: id,
                    subject: subject,
                    description: description,
                    department: department,
                    province: province,
                    date: date
                });

                await issue.save()
                
                return res.status(201).json({
                    status: 'Created',
                    message: 'Successfully Created Issue',
                    issue: issue
                });
            }
        }
    }catch(error){
        return res.status(500).json({
            status: 'Internal Server Error',
            error: 'Issue Creation failed'
        });
    }
});

//------------------------------------------------------------------------------------
//Delete API method that will will the specific issue on the governmnet bulletin board.
router.delete('/:id', checkauth, async (req, res) =>{

    try{
        //deleting issue from db
        const result = await Issue.deleteOne({id: req.params.id});

        //If statement checking if there is an actual issue with that ID
        if(result.deletedCount === 0){
            return res.status(404).json({
                status: 'Not Found',
                message: 'Issue with that ID does not exist'
            });
        }else{
            return res.status(200).json({
                status: 'Deleted',
                message: 'Successfully Deleted Issue'
            });
        }
    }catch(error){
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'Failed to Delete Issue'
        });
    }
});


//------------------------------------------------------------------------------------
//Exportings Routes
module.exports = router;

//------------------------End of issue.js (routes)------------------------------------