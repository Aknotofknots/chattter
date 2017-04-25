const app = require('express')(); //<-- with two parentheses after one another means that the first require method return a function that is called by the second parenthesis
let http = require('http').Server(app);
let colors = require('colors');
let io = require('socket.io')(http);

colors.setTheme({

custom: ["red", "bold"]

});

app.get('/', function(req, res){
    res.sendFile (__dirname + '/index.html');
});

io.on('connection', (socket) => {

console.log('a user is connected');
    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    })

});

http.listen(3000, () => {
    console.log('listening on *:3000'.custom);
});
