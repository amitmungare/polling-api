const catchErrors = require('../middleware/catchErrors');
const questionSchema = require('../models/questionModel');
const optionSchema = require('../models/oprtionModel');


module.exports.deleteOption = catchErrors( async function(req, res){
    let id = req.params.id;
    let option = await optionSchema.findById(id);

    if(option.vote>0){
        return res.status(404).json({
            message:"Cannot delete the option as it has votes"
        })
    }

    await questionSchema.findByIdAndUpdate(option.question, {
        $pull: {options:id}
    })

    await optionSchema.findByIdAndDelete(id);

    return res.status(200).json({
        message:"Option deleted Successfully"
    })
})

module.exports.addVote = catchErrors( async function(req, res){
    let id = req.params.id;

    await optionSchema.findByIdAndUpdate(id, {
        $inc:{vote:1}
    });

    return res.status(200).json({
        message:"voted option successfully"
    })
})