const app = require('express')(); //<-- with two parentheses after one another means that the first require method return a function that is called by the second parenthesis
let http = require('http').Server(app);

app.get('/', function(req, res){
    res.send('<h1>HERRRLO worrrld</h1>');

});

http.listen(3000, () => {

    console.log('listening on *:3000');

});
