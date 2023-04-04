// middleware to catch error 
const catchErrors = require('../middleware/catchErrors');
// require schema 
const questionSchema = require('../models/questionModel');
const optionSchema = require('../models/oprtionModel');


// function to create a question 
module.exports.createQuestion = catchErrors( async function(req, res){
    // create question 
    let question = await questionSchema.create(req.body);

    // sending response 
    return res.json({question})
})


// function to create option 
module.exports.createOption = catchErrors( async function(req, res){
    // getting question by question id 
    let question = await questionSchema.findById(req.params.id);
    if(question){
        // creating new  option
        let option = await optionSchema.create({
            content: req.body.content,
            vote: req.body.vote,
            question: req.params.id 
        });
        // setting the vote link 
        option.link = "http://localhost:8000/api/v1/options/" + option.id + "/add_vote";
        // saving option and question 
        option.save();
        question.options.push(option);
        question.save();
        // sending option response 
        return res.json({option});
    }
    // sending question as response
    return res.json({question});
})


// function to get question 
module.exports.getQuestion = catchErrors( async function(req, res){
     // getting question by question id 
    let question = await questionSchema.findById(req.params.id).populate("options");
    // sending response 
    return res.json({question})
})


// function to delete question 
module.exports.deleteQuestion = catchErrors( async function(req, res){
    // getting id and using that id to get question 
    let id = req.params.id;
    let question = await questionSchema.findById(id).populate({path:"options", select:"vote"});
    // getting all options 
    let options = question.options;

    // checking if option has vote 
    for(let i=0; i<options.length; i++){
        if(options[i].vote>0){
            return res.status(404).json({
                message:"question cannot be deleted as its option has votes"
            })
        }
    }
    // if no vote delete all the option and the question 
    await optionSchema.deleteMany({question:id});
    await questionSchema.findByIdAndDelete(id);
    // sending response 
    return res.status(200).json({
        message:"Question deleted sucessfully"
    });
})

module.exports.getdetails = catchErrors(async function(req, res){
    return res.status(200).json({
        message:"Run this project on postman"
    })
})