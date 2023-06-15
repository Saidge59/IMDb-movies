const express = require('express');
const path = require('path');
// var bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

const hostname = 'localhost';
const port = 3000;
let movies = [];

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.listen(port, hostname, (error) => {
    error ? 
    console.log(error) : 
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render(createPath('index'));
})

app.get('/list-movies', (req, res) => {
    res.render(createPath('list-movies'));
})

app.get('/most-popular-movies', (req, res) => {
    res.render(createPath('most-popular-movies'));
})

app.get('/saved', (req, res) => {
    res.render(createPath('saved'));
})

app.get('/favorites', (req, res) => {
    res.render(createPath('favorites'));
})

// var jsonParser = bodyParser.json()

// app.post('/saved', jsonParser, function (req, res) {
//     console.log('app.post...');
//     console.log(req.body);
//     res.send('Post');
//   });

// app.get('/', (req, res) => {
//     res.redirect(createPath('/list-movies'));
// })

app.use((req, res) => {
    res
    .status(404)
    .render(createPath('error'));
})