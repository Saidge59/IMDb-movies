const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
const mysql = require("mysql2");
const {parserImage, convertBuffToBolean, getMoviesFromIMDb} = require('./public/js/utils/utils.js');

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

// MySQL ===========================
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "shest_db",
    password: "admin"
  }).promise();

// GET =============================
app.get('/', (req, res) => {
    res.render(createPath('index'));
})

app.get('/test-movies', (req, res) => {
    const title = 'Test movies';
    const movie1 = {id:'tt5971474', title: 'The Little Mermaid', year: 2023, image: 'https://m.media-amazon.com/images/M/MV5BYTUxYjczMWUtYzlkZC00NTcwLWE3ODQtN2I2YTIxOTU0ZTljXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX300_CR0,11,300,400_AL_.jpg", "Rob Marshall (dir.), Halle Bailey, Jonah Hauer-King', crew: 'Rob Marshall (dir.), Halle Bailey, Jonah Hauer-King', rating: 7.2};
    const movie2 = {id:'tt9362722', title: 'Spider-Man: Across the Spider-Verse', year: 2023, image: 'https://m.media-amazon.com/images/M/MV5BNzQ1ODUzYjktMzRiMS00ODNiLWI4NzQtOTRiN2VlNTNmODFjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX300_CR0,11,300,400_AL_.jpg", "Joaquim Dos Santos (dir.), Shameik Moore, Hailee Steinfeld', crew: 'Joaquim Dos Santos (dir.), Shameik Moore, Hailee Steinfeld', rating: 9.1};
    const movie3 = {id:'tt10366206', title: 'John Wick: Chapter 4', year: 2023, image: 'https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX300_CR0,11,300,400_AL_.jpg", "Chad Stahelski (dir.), Keanu Reeves, Laurence Fishburne', crew: 'Chad Stahelski (dir.), Keanu Reeves, Laurence Fishburne', rating: 8.0};
    const movie4 = {id:'tt1517268', title: 'Barbie', year: 2023, image: 'https://m.media-amazon.com/images/M/MV5BOWIwZGY0OTYtZjUzYy00NzRmLTg5YzgtYWMzNWQ0MmZiY2MwXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_UX300_CR0,11,300,400_AL_.jpg", "Greta Gerwig (dir.), Margot Robbie, Ryan Gosling', crew: 'Greta Gerwig (dir.), Margot Robbie, Ryan Gosling', rating: 0.0};
    const movies = [movie1, movie2, movie3, movie4];

    const sql = 'SELECT * FROM movies_db';
    pool.query(sql)
    .then(data => {
        let movie_db = data[0];
        
        if(movie_db.length > 0) {
            let movie_db_con = convertBuffToBolean(movie_db);
            
            movies.forEach((a, i) => {
                movie_db_con.forEach(b => {
                    if(a.id === b.id) {
                        movies[i].is_saved = b.is_saved;
                        movies[i].is_favorites = b.is_favorites;
                    }
                });
                
            });
            res.render(createPath('list-movies'), {movies, title});
        }
    })
    .catch(e => console.log(e));

    
})

app.get('/most-popular-movies', (req, res) => {
    const title = 'Most popular movies';
    const url = 'https://imdb-api.com/en/API/MostPopularMovies/k_7qo199gj';

    getMoviesFromIMDb(url)
        .then(json => {
            const movies = parserImage(json.items);
            res.render(createPath('list-movies'), {movies, title});
        })
        .catch(error => console.log(error));
})

app.get('/most-popular-series', (req, res) => {
    const title = 'Most popular series';
    const url = 'https://imdb-api.com/en/API/MostPopularTVs/k_7qo199gj';

    getMoviesFromIMDb(url)
        .then(json => {
            const movies = parserImage(json.items);
            res.render(createPath('list-movies'), {movies, title});
        })
        .catch(error => console.log(error))
})

app.get('/top-250-movies', (req, res) => {
    const title = 'Top 250 movies';
    const url = 'https://imdb-api.com/en/API/Top250Movies/k_7qo199gj';

    getMoviesFromIMDb(url)
        .then(json => {
            const movies = parserImage(json.items);
            res.render(createPath('list-movies'), {movies, title});
        })
        .catch(error => console.log(error))
})

app.get('/top-250-series', (req, res) => {
    const title = 'Top 250 series';
    const url = 'https://imdb-api.com/en/API/Top250TVs/k_7qo199gj';

    getMoviesFromIMDb(url)
        .then(json => {
            const movies = parserImage(json.items);
            res.render(createPath('list-movies'), {movies, title});
        })
        .catch(error => console.log(error))
})

app.get('/saved', (req, res) => {
    const title = 'My saved movies';
    const sql = 'SELECT * FROM movies_db';
    pool.query(sql)
    .then(data => {
        let  movies = convertBuffToBolean(data[0]);
        movies = movies.filter(m => m.is_saved);
        res.render(createPath('list-movies'), {movies, title});
    })
    .catch(e => console.log(e));
})

app.get('/favorites', (req, res) => {
    const title = 'My favorites movies';
    const sql = 'SELECT * FROM movies_db';

    pool.query(sql)
    .then(data => {
        let  movies = convertBuffToBolean(data[0]);
        movies = movies.filter(m => m.is_favorites);
        res.render(createPath('list-movies'), {movies, title});
    })
    .catch(e => console.log(e));
})

// POST =============================
var jsonParser = bodyParser.json()
app.post('/delete', jsonParser, function (req, res) {
    console.log('delete');
    // const sql = "DELETE FROM movies_db WHERE id=?";
    // pool.query(sql, [req.body.id], function(err, data) {
    //     if(err) return console.log(err);
    // });
  });

app.post('/changeSaved', jsonParser, function (req, res) {
    const movie = req.body;
    const sqlU = "UPDATE movies_db SET is_saved=? WHERE id=?";
    const sqlS = 'SELECT * FROM movies_db WHERE id=?';
    const sqlI = 'INSERT INTO movies_db (id, crew, im_db_rating, image, is_favorites, is_saved, title, year) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

    pool.query(sqlS, [movie.id])
    .then(m => {
        if(m[0].length > 0) {
            pool.query(sqlU, [movie.is_saved, movie.id]).catch(e => console.log(e));
        } else {
            pool.query(sqlI, [movie.id, movie.crew, movie.rating, movie.image, movie.is_favorites, movie.is_saved, movie.title, movie.year]).catch(e => console.log(e));
        }
    })
    .catch(e => console.log(e));
  });

  app.post('/changeFavorites', jsonParser, function (req, res) {
    const {id, favorites} = req.body;
    const sql = "UPDATE movies_db SET is_favorites=? WHERE id=?";

    pool.query(sql, [favorites, id], function(err, data) {
        if(err) return console.log(err);
        // res.redirect("/");
    });
  });

//   function getMovieById (id) {
//     const sql = 'SELECT * FROM movies_db WHERE id=?';
//     let movie = null;
//     pool.query(sql, id, function(err, data) {
//         if(err) return console.log(err);
//         // movie = convertBuffToBolean(data);
//         movie = data[0];
//     });
//     console.log('movie' ,movie);
//     return movie;
//   }
  
app.use((req, res) => {
    res
    .status(404)
    .render(createPath('error'));
})