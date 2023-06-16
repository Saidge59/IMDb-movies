const {most_popular_movies} = require('./most-popular-movies.js');

class User {
    getMostPopularMovies() {
        return this._mostPopularMovies;
    }
    setMostPopularMovies(movies) {
        console.log('Set most popular movies from IMDb');
        this._mostPopularMovies = movies;
    }

    getMostPopularSeries() {
        return this._mostPopularSeries;
    }
    setMostPopularSeries(movies) {
        console.log('Set most popular series from IMDb');
        this._mostPopularSeries = movies;
    }

    getTop250Movies() {
        return this._top250Movies;
    }
    setTop250Movies(movies) {
        console.log('Set top 250 movies from IMDb');
        this._top250Movies = movies;
    }

    getTop250Series() {
        return this._top250Series;
    }
    setTop250Series(movies) {
        console.log('Set top 250 series from IMDb');
        this._top250Series = movies;
    }

    parserMovies(movies) {
        let films = [];
        movies.forEach(m=>{
            let movie = { id: m.id, title: m.title, year: m.year, image: this.parseImage(m.image), crew: m.crew,  rating: m.imDbRating,  is_saved: false,  is_favorites: false }
            films.push(movie);
        })
        return films;
    }

    parserImageMovies(movies) {
        movies.forEach((movie, index) => {
            let imageUrl = parseImage(movie.image);
            movies[index].image = imageUrl;
        });
        return movies;
    }

    parseImage(image) {
        let v1S = image.split('_V1_');
        return v1S[0] + '_V1_UX300_CR0,11,300,400_AL_.jpg';
    }

    getMovieByID(id) {
        var allMovies = this._mostPopularMovies.concat(this._mostPopularSeries, this._top250Movies, this._top250Series);
        let movie = allMovies.find(m=> m.id === id);
        return movie;
    }

    setMovieBoolValByID(id, is_saved, is_favorites) {
        var allMovies = [];
        if(this._mostPopularMovies) allMovies = allMovies.concat(this._mostPopularMovies);
        if(this._mostPopularMovies) allMovies = allMovies.concat(this._mostPopularSeries);
        if(this._mostPopularMovies) allMovies = allMovies.concat(this._top250Movies);
        if(this._mostPopularMovies) allMovies = allMovies.concat(this._top250Series);

        if(allMovies.length > 0) {
            let movie = allMovies.find(m=> m.id === id);
            movie.is_saved = is_saved;
            movie.is_favorites = is_favorites;
        }
    }
    
    convertBuffToBolean(movies) {
        movies.forEach((movie, index) => {
            const favorites = Buffer.from(movie.is_favorites);
            movies[index].is_favorites = Boolean(favorites.readInt8());
            const saved = Buffer.from(movie.is_saved);
            movies[index].is_saved = Boolean(saved.readInt8());
        });
    }

    convertBuffToBoleanMovie(movie) {
        const favorites = Buffer.from(movie.is_favorites);
        movie.is_favorites = Boolean(favorites.readInt8());
        const saved = Buffer.from(movie.is_saved);
        movie.is_saved = Boolean(saved.readInt8());
    }

    setBooleanValToList (fromList, toList) {
        toList.forEach((to, i) => {
            fromList.forEach(from => {
                if(to.id === from.id) {
                    toList[i].is_saved = from.is_saved;
                    toList[i].is_favorites = from.is_favorites;
                }
            });
        });
    }
    
    async getMoviesFromIMDb (url) {
        const res = await fetch(url);
        const json = await res.json();
        return json;
    }

}

let user = new User();

module.exports = user;