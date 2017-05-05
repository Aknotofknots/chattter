/*Modules*/

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let express = require("express");
let path = require('path');
let colors = require('colors');

const port = 3000;
let clientQuestions = [
    {
        question: "how are you ?",
        answer: "i'm sort of binary. bipolar if you will. on and off. drunk and....not drunk ? you know the drill."
    },
    {
        question: "what are your plans for today ?",
        answer: 'just be chilli\'n right here on the server answering YOUR socket calls'
    },
    {
        question: "what do you usually eat ?",
        answer: 'well you know, i\'m beeing force-fed string values all day long. It\'s kinda lost it\'s charm'
    },
    {
        question: "are you alive ?",
        answer: 'duh! isn\'t it obvious ?'
    },
    {
        question: "why did you pursue a chatbot career ?",
        answer: 'cause no-one never let\'s me do anything else besides sitting here and answer A LOT of questions. I\'m stuck.'
    }
];


function checkClientQuestion(incomingMessage) {
    let answer = "";
    clientQuestions.filter((clientQuestion) => {
        let trimmedAnswer = incomingMessage.trim().toLowerCase();

        if (trimmedAnswer.includes(clientQuestion.question)) {
            answer = clientQuestion.answer;
        }
    });
    return answer;
}


// tell express to use the public folder to load static files like js, css and so forth
app.use(express.static('public'));

app.set('views', './public/views'); // this sets the directory for the html templates to views
app.set('view engine', 'pug');

// app.get('/', function(req, res){
//   res.sendFile(`${__dirname}/public/views/index.html`);
// });

// the render method is used by template engines that integrate with express.js
app.get('/', (request, response) => {
    response.render('index');
});

io.on('connection', function (client) {

    client.on('chat message', function (msg) {
        let answer  = checkClientQuestion(msg);
        io.emit('')
        if (answer) {
            io.emit('chat message', answer);
        }
        else {
            io.emit('chat message', "I do not compute. I do only understand 5 questions :)");
        }
    });
});

http.listen(port, function () {
    console.log('listening on *:3000'.rainbow);
});