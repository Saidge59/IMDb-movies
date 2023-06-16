function parserImage(movies) {
    movies.forEach((movie, index) => {
        let v1S = movie.image.split('_V1_');
        let imageUrl = v1S[0] + '_V1_UX300_CR0,11,300,400_AL_.jpg';
        movies[index].image = imageUrl;
    });
    return movies;
}

function convertBuffToBolean(movies) {
    movies.forEach((movie, index) => {
        const favorites = Buffer.from(movie.is_favorites);
        movies[index].is_favorites = Boolean(favorites.readInt8());
        const saved = Buffer.from(movie.is_saved);
        movies[index].is_saved = Boolean(saved.readInt8());
    });
    return movies;
}

const getMoviesFromIMDb = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

module.exports = {parserImage, convertBuffToBolean, getMoviesFromIMDb};