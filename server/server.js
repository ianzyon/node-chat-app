const path = require('path');
const http = require('http'); // modulo built in
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const {genMsg, genLocMsg} = require('./utils/message');
// config express 
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // integrando S.IO com o server e express

// config de porta
const port = process.env.PORT || 3000;

// middleware
app.use(
    express.static(publicPath));

    io.on('connection', (socket)=>{ // os eventos criados aqui sao disparados logo apos a conexão
        console.log('New User Connected');

        socket.on('disconnect', ()=>{
            console.log("User left.");
        });
        // boas vindas from Admin.
        socket.emit('newMessage', 
            genMsg('Admin', 'Welcome to this chat!')
        );
         
        socket.broadcast.emit('newMessage',
            genMsg('Admin', 'New User Joined.')
        );

        // recebendo novas mensagens
        socket.on('createMessage', (msg, callback )=>{
            console.log("Msg: ", msg);
            // emite novas mensagens
            io.emit('newMessage', 
                genMsg( msg.from, msg.text)
            );
            callback();
      
        });

        socket.on('geolocation', (cord) => {
            io.emit('newLocMessage', genLocMsg('User', cord.latitude, cord.longitude));
        });
        
    }); // fim de io    
   

// listen to
server.listen(port,
    () =>{
        console.log(`Server is up on port ${port}`);
    }
);