var socket = io();


function scrollToBottom() {
    // selectors
    var messages = $('#msgList');
    var newMsg = messages.children('li:last-child');
    //heights
    var clientHeigth = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMsgHeight = newMsg.innerHeight();
    var lastMsgHeight = newMsg.prev().innerHeight();

    if(clientHeigth + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};


socket.on('connect', function() { // ES5 permitido nos navegadores apenas
    var params = $.deparam(window.location.search);

    socket.emit('join', {
        name: params.name,
        room: params.room
    }, function(err) {
        if (err){ 
            alert(err);
            window.location.href='/';
           
        } else {
            console.log('No error');
        }
    });
});
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    var ol = $('<ol></ol>');

    users.forEach((user)=>{
        ol.append($("<li></li>").text(user));
    });

    $('#users').html(ol);
});

socket.on('newMessage', function(msg){
    console.log(msg);
    var fTime = moment(msg.createdAt).format("h:mm a");
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: fTime
    });

    $('#msgList').append(html);
    scrollToBottom();
});


// socket NEW LOCATION
socket.on('newLocMessage', function (msg) {
    
    var fTime = moment(msg.createdAt).format("h:mm a");
    var template = $('#loc-message-template').html();
    var html = Mustache.render(template, {
        from: msg.from,
        url: msg.url,
        createdAt: fTime,
        text: "Meu local agora."
    });

    $('#msgList').append(html);
    scrollToBottom();
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
    });
  });
