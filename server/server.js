const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

// config express 
var app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(
    express.static(publicPath));




// listen to
app.listen(port,
    () =>{
        console.log(`Server is up on port ${port}`);
    }
);