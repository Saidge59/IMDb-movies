const {most_popular_movies} = require('./most-popular-movies.js');

class User {
    getMostPopularMovies() {
        console.log('Get most popular movies from IMDb');
        return this._mostPopularMovies;
    }
    setMostPopularMovies(movies) {
        console.log('Set most popular movies from IMDb');
        this._mostPopularMovies = movies;
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
        // var allMovies = this._mostPopularMovies.concat(this._mostPopularMovies, this._mostPopularMovies);
        let movies = this.parserMovies(most_popular_movies);
        let movie = movies.find(m=> m.id === id);
        return movie;
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
module.exports = {user};