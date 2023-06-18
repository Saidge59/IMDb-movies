const express = require('express');
const ip = require('ip');
const cors = require('cors');
const path = require('path');
var bodyParser = require('body-parser');
const {getAllMovies, findMovieById, createMovie, updateSavedInMovie, updateFavoritesInMovie, deleteMovieById} = require("./public/js/utils/db/mysql_db");
require("dotenv").config();

const user = require('./public/js/utils/utils.js');
const {most_popular_movies} = require('./public/js/utils/most-popular-movies.js');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
let movies = [];

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.listen(PORT, (error) => {
    error ? 
    console.log(error) : 
    console.log(`Server running at http://${ip.address()}:${PORT}/`);
});

app.use(cors({origin: '*'}));
app.use(express.static('public'));

// GET =============================
app.get('/', (req, res) => {
    res.render(createPath('index'));
})

app.get('/most-popular-movies', (req, res) => {
    const title = 'Most popular movies';
    const url = 'https://imdb-api.com/en/API/MostPopularMovies/k_7qo199gj';

    // let movies = user.parserMovies(most_popular_movies);
    // getAllMoviesDB(res, movies, title, user.setMostPopularMovies);
    
    if(user.getMostPopularMovies().length > 0) {
        const movies = user.getMostPopularMovies();
        res.render(createPath('list-movies'), {movies, title});
    } else {
        user.getMoviesFromIMDb(url)
        .then(movies => {
            getAllMovies().then(movies_db => {
                if(movies_db.length > 0) user.setBooleanValToList(movies_db, movies);
                user.setMostPopularMovies(movies);
                res.render(createPath('list-movies'), {movies, title});
            }).catch(e => console.log(e))
        })
        .catch(e => console.log(e));
    }
})

app.get('/most-popular-series', (req, res) => {
    const title = 'Most popular series';
    const url = 'https://imdb-api.com/en/API/MostPopularTVs/k_7qo199gj';

    if(user.getMostPopularSeries().length > 0) {
        const movies = user.getMostPopularSeries();
        res.render(createPath('list-movies'), {movies, title});
    } else {
        user.getMoviesFromIMDb(url)
        .then(movies => {
            getAllMovies()
            .then(movies_db => {
                if(movies_db.length > 0) user.setBooleanValToList(movies_db, movies);
                user.setMostPopularSeries(movies);
                res.render(createPath('list-movies'), {movies, title});
            }).catch(e => console.log(e))
        })
        .catch(e => console.log(e));
    }
})

app.get('/top-250-movies', (req, res) => {
    const title = 'Top 250 movies';
    const url = 'https://imdb-api.com/en/API/Top250Movies/k_7qo199gj';

    if(user.getTop250Movies().length > 0) {
        const movies = user.getTop250Movies();
        res.render(createPath('list-movies'), {movies, title});
    } else {
        user.getMoviesFromIMDb(url)
        .then(movies => {
            getAllMovies()
            .then(movies_db => {
                if(movies_db.length > 0) user.setBooleanValToList(movies_db, movies);
                user.setTop250Movies(movies);
                res.render(createPath('list-movies'), {movies, title});
            }).catch(e => console.log(e))
        })
        .catch(e => console.log(e));
    }
})

app.get('/top-250-series', (req, res) => {
    const title = 'Top 250 series';
    const url = 'https://imdb-api.com/en/API/Top250TVs/k_7qo199gj';

    if(user.getTop250Series().length > 0) {
        const movies = user.getTop250Series();
        res.render(createPath('list-movies'), {movies, title});
    } else {
        user.getMoviesFromIMDb(url)
        .then(movies => {
            getAllMovies()
            .then(movies_db => {
                if(movies_db.length > 0) user.setBooleanValToList(movies_db, movies);
                user.setTop250Series(movies);
                res.render(createPath('list-movies'), {movies, title});
            }).catch(e => console.log(e))
        })
        .catch(e => console.log(e));
    }
})

app.get('/saved', (req, res) => {
    const title = 'My saved movies';

    getAllMovies().then(movies => {
        if(movies.length > 0) movies = movies.filter(m=>m.is_saved);
        res.render(createPath('list-movies'), {movies, title});
    }).catch(e => console.log(e));
})

app.get('/favorites', (req, res) => {
    const title = 'My favorites movies';

    getAllMovies().then(movies => {
        if(movies.length > 0) movies = movies.filter(m=>m.is_favorites);
        res.render(createPath('list-movies'), {movies, title});
    }).catch(e => console.log(e));
})


// POST =============================
var jsonParser = bodyParser.json()

app.post('/changeSaved', jsonParser, function (req, res) {
    const {id, is_saved} = req.body;

    findMovieById(id).then(movie_db => {
        if(movie_db) {
            let status = '';
            if(!is_saved) {
                if(!movie_db.is_favorites) {
                    deleteMovieById(id).catch(e => console.log(e));
                } else {
                    updateSavedInMovie(id, is_saved).catch(e => console.log(e));
                }
                status = 'delete';
            } else {
                updateSavedInMovie(id, is_saved).catch(e => console.log(e));
                status = 'save';
            }
            user.setMovieBoolValByID(id, is_saved, !!movie_db.is_favorites);
            res.send(`{"status" : "${status}"}`);
        } else {
            let movie = user.getMovieByID(id);
            if(movie) {
                createMovie(movie).catch(e => console.log(e));
                user.setMovieBoolValByID(id, is_saved, !!movie.is_favorites);
                res.send('{"status" : "save"}');
            }
        }
    }).catch(e => console.log(e));
  });

  app.post('/changeFavorites', jsonParser, function (req, res) {
    const {id, is_favorites} = req.body;

    findMovieById(id).then(movie_db => {
        if(movie_db) {
            let status = '';
            if(!is_favorites) {
                if(!movie_db.is_saved) {
                    deleteMovieById(id).catch(e => console.log(e));
                } else {
                    updateFavoritesInMovie(id, is_favorites).catch(e => console.log(e));
                }
                status = 'delete';
            } else {
                updateFavoritesInMovie(id, is_favorites).catch(e => console.log(e));
                status = 'save';
            }
            user.setMovieBoolValByID(id, !!movie_db.is_saved, is_favorites);
            res.send(`{"status" : "${status}"}`);
        } else {
            let movie = user.getMovieByID(id);
            if(movie) {
                createMovie(movie).catch(e => console.log(e));
                user.setMovieBoolValByID(id, !!movie.is_saved, is_favorites);
                res.send('{"status" : "save"}');
            }
        }
    })
    .catch(e => console.log(e));
  });
  
app.use((req, res) => {
    res
    .status(404)
    .render(createPath('error'));
})