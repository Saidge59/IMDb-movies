const mysql = require("mysql2");
const QUERY = require("./query");

// MySQL ===========================
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "imdb_db",
    password: "admin"
  }).promise();

async function getAllMovies () {
    const data = await pool.query(QUERY.FIND_ALL);
    return data[0];
}

async function findMovieById (id) {
    const data = await pool.query(QUERY.FIND_BY_ID, [id]);
    return data[0][0];
}

async function createMovie (movie) {
    const data = await pool.query(QUERY.CREATE, [movie.id, movie.title, movie.image, movie.crew, movie.year, movie.rating, movie.is_saved, movie.is_favorites]);
}

async function updateSavedInMovie (id, is_saved) {
    const data = await pool.query(QUERY.UPDATE_SAVED_BY_ID, [is_saved, id]);
}

async function updateFavoritesInMovie (id, is_favorites) {
    const data = await pool.query(QUERY.UPDATE_FAVORITES_BY_ID, [is_favorites, id]);
}

async function deleteMovieById (id) {
    const data = await pool.query(QUERY.DELETE_BY_ID, [id]);
}

module.exports = {getAllMovies, findMovieById, createMovie, updateSavedInMovie, updateFavoritesInMovie, deleteMovieById};