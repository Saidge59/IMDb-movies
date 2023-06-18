const {most_popular_movies} = require('./most-popular-movies.js');

class User {
    constructor () {
        this._mostPopularMovies = [];
        this._mostPopularSeries = [];
        this._top250Movies = [];
        this._top250Series = [];
    }

    getMostPopularMovies() {
        return this._mostPopularMovies;
    }
    setMostPopularMovies(movies) {
        this._mostPopularMovies = movies;
    }

    getMostPopularSeries() {
        return this._mostPopularSeries;
    }
    setMostPopularSeries(movies) {
        this._mostPopularSeries = movies;
    }

    getTop250Movies() {
        return this._top250Movies;
    }
    setTop250Movies(movies) {
        this._top250Movies = movies;
    }

    getTop250Series() {
        return this._top250Series;
    }
    setTop250Series(movies) {
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

    concatMovies() {
        return [...this.getMostPopularMovies(),
             ...this.getMostPopularSeries(), 
             ...this.getTop250Movies(), 
             ...this.getTop250Series()];
    }

    getMovieByID(id) {
        const movies = this.concatMovies();

        let movie;
        if(movies.length > 0) {
            movie = movies.find(m=> m.id === id);
        }
        return movie;
    }

    setMovieBoolValByID(id, is_saved, is_favorites) {
        const movies = this.concatMovies();

        if(movies.length > 0) {
            let movie = movies.find(m=> m.id === id);
            movie.is_saved = is_saved;
            movie.is_favorites = is_favorites;
            console.log('setMovieBoolValByID',movie );
        }
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
        return this.parserMovies(json.items);
    }

}

let user = new User();

module.exports = user;