 var socket = io();

socket.on('connect', function() { // ES5 permitido nos navegadores apenas
    console.log("Connected to Server");

    socket.on('newMessage', function(msg){
        console.log(msg);
    })
    socket.on('joinChat', function(msg){
        console.log(msg);
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

    

    // socket.emit('createEmail', {
    //     to: "ianzyon@github.com",
    //     text: "Hi there i like you."
    // });