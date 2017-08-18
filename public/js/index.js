 var socket = io();
 
socket.on('connect', function() { // ES5 permitido nos navegadores apenas
    console.log("Connected to Server");
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(msg){
    console.log(msg);

    // manipular uma lista
    var li = $('<li></li>');
    // manipular texto da lista
    li.text(`${msg.from}: ${msg.text}`);
    // inserir child na lista 
    $('#msgList').append(li);
});


// socket NEW LOCATION
socket.on('newLocMessage', function (msg) {
    // manipular uma lista
    var li = $('<li></li>');
    var a = $('<a target="_blank">Meu local agora.</a>');
    // manipular texto da lista
    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    // inserir child na lista
    li.append(a);

    $('#msgList').append(li);
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
    $('[name=message]').val("");
});


b4_alert = function(textb,text) {
    return alertoggle = `<div id="myAlert" class="alert alert-warning alert-dismissible fade show col-6" role="alert" style="margin-top: 30px;">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button><strong>${textb}</strong> ${text}</div>`;
        
}; 
var locBtn = $('#send-loc');
// add click event
locBtn.on('click', function () {
    if (!navigator.geolocation){
        return $('#my-alert').html(b4_alert('Navegador Incompativél!','Seu navegador não possui geolocalização.'));
    }

    locBtn.attr('disabled','disabled').text('Buscando...');

    navigator.geolocation.getCurrentPosition(function (position) {  
        locBtn.removeAttr('disabled').text('Mandar Local');
        socket.emit('geolocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function() {
        locBtn.removeAttr('disabled').text('Mandar Local');
        return $('#my-alert').html(b4_alert('Erro!','Não conseguimos trazer o local.'));
    })
  });
