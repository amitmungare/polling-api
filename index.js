const express = require('express');
const app = express();

const portNumber = process.env.PORTNUMBER || 8000;

const mongoos = require('./config/mongooseDatabase');


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/", require('./routes/index'));

app.use(function(error, req, res, next){
    res.status(500).send({message:"Internal server error"});
})

app.listen(portNumber, function(error){
    if(error){
        console.log("Error in starting the server", error);
        return;
    }
    console.log(`Server started on port ${portNumber}`)
});