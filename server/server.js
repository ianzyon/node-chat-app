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
// função data

function DateNow() {
    var t = new Date();
    return date = t.getDate()+"-"+ (t.getMonth()+1) +" "+ t.getHours()+":"+ t.getMinutes();
};
// middleware
app.use(
    express.static(publicPath));

    io.on('connection', (socket)=>{ // os eventos criados aqui sao disparados logo apos a conexão
        console.log('New User Connected');

        socket.on('disconnect', ()=>{
            console.log("User left.");
        });
        // boas vindas from Admin.
        socket.emit('joinChat', {
            from: "Admin",
            text: "Welcome to this chat"
            } 
        );
         
        socket.broadcast.emit('newMessage',{
            text: "New user joined",
            At: DateNow()
        });

        // recebendo novas mensagens
        socket.on('createMessage', (msg)=>{
            console.log("Msg: ", msg);

            
            // emite novas mensagens
            io.emit('newMessage', {
                "from": msg.from,
                "text": msg.text,
                "createdAt": DateNow()
            });
            // socket.broadcast.emit('newMessage', {
            //     "from": msg.from,
            //     "text": msg.text,
            //     "createdAt": d.date
            // });
        });

        // socket.on('createEmail', (newEmail)=>{
        //     console.log("Create email", newEmail);
        // });


        
    }); // fim de io    
   

// listen to
server.listen(port,
    () =>{
        console.log(`Server is up on port ${port}`);
    }
);