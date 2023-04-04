// middleware to catch error 
const catchErrors = require('../middleware/catchErrors');
// require schema 
const questionSchema = require('../models/questionModel');
const optionSchema = require('../models/oprtionModel');
const { response } = require('express');

// function to delete option 
module.exports.deleteOption = catchErrors( async function(req, res){
    // getting option id and finding the option 
    let id = req.params.id;
    let option = await optionSchema.findById(id);
    // check if option has votes or not 
    if(option.vote>0){
        return res.status(404).json({
            message:"Cannot delete the option as it has votes"
        })
    }
    // delete the option from question 
    await questionSchema.findByIdAndUpdate(option.question, {
        $pull: {options:id}
    })
    // delete the option from option schema
    await optionSchema.findByIdAndDelete(id);
    // send response
    return res.status(200).json({
        message:"Option deleted Successfully"
    })
})

// function to vote option 
module.exports.addVote = catchErrors( async function(req, res){
    // get the id to vote option 
    let id = req.params.id;
    // find the option by id and vote it 
    await optionSchema.findByIdAndUpdate(id, {
        $inc:{vote:1}
    });
    // send response
    return res.status(200).json({
        message:"voted option successfully"
    })
})