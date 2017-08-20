const path = require('path');
const http = require('http'); // modulo built in
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');

const {isRealString} = require('./utils/validation');
const {genMsg, genLocMsg} = require('./utils/message');
const {Users} = require('./utils/users');
// config express 
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // integrando S.IO com o server e express
var users = new Users();

// config de porta
const port = process.env.PORT || 3000;

// middleware
app.use(
    express.static(publicPath));

    io.on('connection', (socket)=>{ // os eventos criados aqui sao disparados logo apos a conexão
        console.log('New User Connected');

        socket.on('disconnect', ()=>{
            var user = users.removeUser(socket.id);
            
            if (user) {
                io.to(user.room).emit('updateUserList', users.getUsersList(user.room));
                io.to(user.room).emit('newMessage', genMsg('Admin', `${user.name} saiu.`));
            }
        });
  
        // recebendo novas mensagens
        socket.on('createMessage', (msg, callback )=>{
            var user = users.getUser(socket.id);

            if (user){

                io.to(user.room).emit('newMessage', 
                    genMsg( user.name , msg.text));
            }
            // emite novas mensagens
            
            callback();
      
        });

        socket.on('geolocation', (cord) => {
            var user = users.getUser(socket.id);
            io.to(user.room).emit('newLocMessage', genLocMsg( user.name, cord.latitude, cord.longitude));
        });
        // login
        socket.on('join', (params, callback) => {
            if (!isRealString(params.name) || !isRealString(params.room)){
                return callback('Nome e Sala não informados.');
            }
            // entrar na sala 
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);

            io.to(params.room).emit('updateUserList', users.getUsersList(params.room));

            // boas vindas from Admin.
            socket.emit('newMessage', genMsg('Admin', 'Bem-vindo ao chat!'));
            
        socket.broadcast.to(params.room).emit('newMessage', genMsg(`Admin`, `${params.name} entrou.`));

            callback();
        });
        
    }); // fim de io    
   

// listen to
server.listen(port,
    () =>{
        console.log(`Server is up on port ${port}`);
    }
);