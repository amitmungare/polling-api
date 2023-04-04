// require mongoose 
const mongoose = require('mongoose');

// option schema wait content, question, vote, link to vote 
const option_schema = new mongoose.Schema(
    {
        content:{
            type:String,
            require:true
        },
        question:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"questionSchema"
        },
        vote:{
            type:Number
        },
        link:{
            type:String
        }
    }
);

const optionSchema = mongoose.model("optionSchema", option_schema);
module.exports=optionSchema;