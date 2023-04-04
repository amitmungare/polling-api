// require express for setting up the express server
const express = require('express');
// using express
const app = express();
// set up the port number
const portNumber = process.env.PORTNUMBER || 8000;
// connecting to database
const mongoos = require('./config/mongooseDatabase');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// Redirect all to index.js inside routes directory
app.use("/", require('./routes/index'));
// Error handling if there is any error
app.use(function(error, req, res, next){
    res.status(500).send({message:"Internal server error", error});
})
// Setting express to listen to port 8000
app.listen(portNumber, function(error){
    if(error){
        console.log("Error in starting the server", error);
        return;
    }
    console.log(`Server started on port ${portNumber}`)
});