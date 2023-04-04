// require mongoose database
const mongoose = require('mongoose');

// mongoose connection url 
// mongoose.connect('mongodb://localhost:27017/pollingApi');
mongoose.connect('mongodb+srv://amungare27:6AyAFvG6dBfVo5Vm@apipolling.qrzsmmv.mongodb.net/?retryWrites=true&w=majority');

// connect database
const database = mongoose.connection;
// if error in connecting to db 
database.on('error', console.error.bind(console, 'Error in connecting to mongodb database'));

// once connected to db 
database.once('open', ()=>{
    console.log('Connected to mongoDB database successfully');
})
// exporting database 
module.exports = database;