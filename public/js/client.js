$(function () {

    let socket = io();

    $('form').submit(function(e){

        e.preventDefault();
        $messageToServer = $('#message-to-server');

        socket.emit('chat message', $messageToServer.val());
        $messageToServer.val('');

    });

    // answer from the server
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });

    $('#questions').on('click', function (e) {
        let targetText = e.target.textContent;
        document.getElementById('message-to-server').value = targetText;



    })
});