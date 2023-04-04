const catchErrors = require('../middleware/catchErrors');
const questionSchema = require('../models/questionModel');
const optionSchema = require('../models/oprtionModel');


module.exports.createQuestion = catchErrors( async function(req, res){
    let question = await questionSchema.create(req.body);

    return res.json({
        question
    })
})

module.exports.createOption = catchErrors( async function(req, res){
    let question = await questionSchema.findById(req.params.id);
    if(question){
     
        let option = await optionSchema.create({
            content: req.body.content,
            vote: req.body.vote,
            question: req.params.id 
        });

        option.link = "http://localhost:8000/api/v1/options/" + option.id + "/add_vote";
        option.save();
        question.options.push(option);
        question.save();

        return res.json({option});
       
    }
    return res.json({question});
})

module.exports.getQuestion = catchErrors( async function(req, res){

        let question = await questionSchema.findById(req.params.id).populate("options");
    
        return res.json({
            question
        })
    
    
})

module.exports.deleteQuestion = catchErrors( async function(req, res){
    let id = req.params.id;
    let question = await questionSchema.findById(id).populate({path:"options", select:"vote"});

    let options = question.options;

    for(let i=0; i<options.length; i++){
        if(options[i].vote>0){
            return res.status(404).json({
                message:"question cannot be deleted as its option has votes"
            })
        }
    }
    await optionSchema.deleteMany({question:id});
    await questionSchema.findByIdAndDelete(id);

    return res.status(200).json({
        message:"Question deleted sucessfully"
    });
})