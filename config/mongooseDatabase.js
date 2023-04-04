const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/pollingApi');
mongoose.connect('mongodb+srv://amungare27:6AyAFvG6dBfVo5Vm@apipolling.qrzsmmv.mongodb.net/?retryWrites=true&w=majority');

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'Error in connecting to mongodb database'));

database.once('open', ()=>{
    console.log('Connected to mongoDB database successfully');
})

module.exports = database;