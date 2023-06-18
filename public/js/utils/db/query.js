const QUERY = {
    FIND_ALL: 'SELECT * FROM movies',
    FIND_BY_ID: 'SELECT * FROM movies WHERE id=?',
    UPDATE_SAVED_BY_ID: 'UPDATE movies SET is_saved=? WHERE id=?',
    UPDATE_FAVORITES_BY_ID: 'UPDATE movies SET is_favorites=? WHERE id=?',
    CREATE: 'INSERT INTO movies (id, title, image, crew, year, rating, is_saved, is_favorites) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
    DELETE_BY_ID: 'DELETE FROM movies WHERE id=?'
}

module.exports = QUERY;