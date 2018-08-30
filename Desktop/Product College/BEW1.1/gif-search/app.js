var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

app.use(express.static('public')); 

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/hello-world', function (req, res) {
    res.send('Hello World');
})

app.get('/hello-gif', function (req, res) {
    var gifUrl = 'https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif'
    res.render('hello-gif', {gifUrl: gifUrl});
})

app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
})

app.get('/', function (req, res) {
    if (req.query.term) {
        giphy.search(req.query.term, function (err, response) {
            res.render('home', {gifs: response.data})
        })
    } else {
        giphy.trending(function (err, response) {
            console.log(err)
            res.render('home', {gifs: response.data})
        })
    }
    // var queryString = req.query.term;
    // console.log(req.query.term)
    // var term = encodeURIComponent(queryString);
    // var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'
    //
    // http.get(url, function(response) {
    //     response.setEncoding('utf8');
    //
    //     var body = '';
    //
    //     response.on('data', function(d) {
    //         body += d;
    //     });
    //
    //     response.on('end', function() {
    //         var parsed = JSON.parse(body);
    //         res.render('home', {gifs: parsed.data})
    //     })
    // })
})

app.listen(3000, function() {
    console.log('Gif Search listening on port localhost:3000!');
});
