
IMDb-movies-nodejs-mysql
-------------------------
The project is intended for informational purposes. It allows users to save movies they plan to watch later or mark them as favorites. The user receives updated information each time they access the project.

The project utilizes a third-party free service called IMDb API, which does not store the actual movies and content protected by copyright.

IMDb API is a web service used to retrieve information about movies, TV shows, and cast members. The API results are in JSON format and include various elements such as movie details, images, posters, trailers, ratings, Wikipedia page content, and more.

The project consists of a server written in Node.js and includes a MySQL database.

The service is obtained from https://imdb-api.com/

Example JSON response: https://imdb-api.com/en/API/Top250Movies/yourApiKey
``` JSON
{
    "id": "tt0120382",
    "rank": "137",
    "title": "The Truman Show",
    "fullTitle": "The Truman Show (1998)",
    "year": "1998",
    "image": "https://m.media-amazon.com/images/M/MV5BMDIzODcyY2EtMmY2MC00ZWVlLTgwMzAtMjQwOWUyNmJjNTYyXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_Ratio0.6716_AL_.jpg",
    "crew": "Peter Weir (dir.), Jim Carrey, Ed Harris",
    "imDbRating": "8.2",
    "imDbRatingCount": "1119777"
}
```
You will need to create a database table
```
CREATE TABLE movies (
    id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    crew VARCHAR(255),
    year VARCHAR(255),
    rating VARCHAR(255),
    is_saved BOOLEAN,
    is_favorites BOOLEAN,
    PRIMARY KEY (id)
);
```
It will look something like this...

![simple](https://github.com/Saidge59/IMDb-movies-nodejs-mysql/assets/30416091/cbd532da-dad7-4739-a1be-d893a1aac6bb)
