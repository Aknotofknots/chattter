/*Modules*/

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let express = require("express");
let path = require('path');
let colors = require('colors');

const port = 3000;


// tell express to use the public folder to load static files like js, css and so forth
app.use(express.static('public'));

app.set('views', './public/views'); // this sets the directory for the html templates to views
app.set('view engine', 'pug');

// app.get('/', function(req, res){
//   res.sendFile(`${__dirname}/public/views/index.html`);
// });

// the render method is used by template engines that integrate with express.js
app.get('/', (request, response) => {
  response.render('index')
});

io.on('connection', function(socket){
  console.log("user connected");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000'.rainbow);
});