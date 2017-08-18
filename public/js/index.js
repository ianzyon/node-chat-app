 var socket = io();
 
socket.on('connect', function() { // ES5 permitido nos navegadores apenas
    console.log("Connected to Server");

    socket.on('newMessage', function(msg){
        console.log(msg);

        // manipular uma lista
        var li = $('<li></li>');
        // manipular texto da lista
        li.text(`${msg.from}: ${msg.text}`);
        // inserir child na lista 
        $('#msgList').append(li);
    });

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


// Manipulando o msg-form ativado pelo botão Send
$('#msg-form').on('submit', function (e) {
     e.preventDefault();

     socket.emit('createMessage', {
         from: 'User',
         text: $('[name=message]').val()
     }, function (akn) {
        console.log('AKN', akn);
       });
});