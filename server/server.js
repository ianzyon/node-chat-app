const path = require('path');
const http = require('http'); // modulo built in
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

// config express 
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // integrando S.IO com o server e express

const port = process.env.PORT || 3000;

// middleware
app.use(
    express.static(publicPath));

    io.on('connection', (socket)=>{ // registra um event listener
        console.log('New User Connected');

        socket.on('disconnect', ()=>{
            console.log("User left.");
        });

    });
   

// listen to
server.listen(port,
    () =>{
        console.log(`Server is up on port ${port}`);
    }
);