// require mongoose 
const mongoose = require('mongoose');
// question schema with content and array of options 
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