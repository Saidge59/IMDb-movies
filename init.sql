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