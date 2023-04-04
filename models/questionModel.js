const mongoose = require('mongoose');

const question_schema = new mongoose.Schema(
    {
        content:{
            type:String,
            require:true
        },
        options:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"optionSchema"
            }
        ]
    }
);

const questionSchema = mongoose.model("questionSchema", question_schema);
module.exports=questionSchema;