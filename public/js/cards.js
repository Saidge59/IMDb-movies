const getListMovies = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

const postSaved = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

function getData() {
    const url = 'http://localhost:8080/list-movies';
    getListMovies(url)
        .then(movies => {
            movies.forEach(movie => { createCards(movie, true) })
        })
        .catch(error => console.log(error))
}

function getMPM() {
    const url = 'http://localhost:8080/most-popular-movies';
    getListMovies(url)
        .then(movies => {
            movies.forEach(movie => { createCards(movie, true) })
        })
        .catch(error => console.log(error))
}
function getSaved() {
    const url = 'http://localhost:8080/saved';
    getListMovies(url)
        .then(movies => {
            console.log(movies);
            movies.forEach(movie => { createCards(movie, false) })
        })
        .catch(error => console.log(error))
}

function getFavorties() {
    const url = 'http://localhost:8080/favorites';
    getListMovies(url)
        .then(movies => {
            console.log(movies);
            movies.forEach(movie => { createCards(movie, false) })
        })
        .catch(error => console.log(error))
}

function createCards (movie, state) {
    let cardCol = document.createElement("div");
        cardCol.id = `col-${movie.id}`;
        cardCol.className = "col";
    let cardDiv = document.createElement("div");
        cardDiv.className = "card";

    let img = document.createElement("img");
        img.src = movie.image;
        img.className = "card-img-top";
        img.alt = movie.title;

    let cardHeaderDiv = document.createElement("div");
        cardHeaderDiv.className = "card-header";

    let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = movie.title;

    let cardBodyDiv = document.createElement("div");
        cardBodyDiv.className = "card-body";

    let yearDiv = document.createElement("div");
    let yearHeading = document.createElement("h6");
        yearHeading.textContent = "Year: " + movie.year;
        yearDiv.appendChild(yearHeading);
        yearDiv.appendChild(document.createElement("hr"));

    let crewDiv = document.createElement("div");
    let crewHeading = document.createElement("h6");
        crewHeading.textContent = "Crew: " + movie.crew;
        crewDiv.appendChild(crewHeading);
        crewDiv.appendChild(document.createElement("hr"));

    let ratingDiv = document.createElement("div");
    let ratingHeading = document.createElement("h6");
        ratingHeading.textContent = "Rating: " + movie.imDbRating;
        ratingDiv.appendChild(ratingHeading);
        ratingDiv.appendChild(document.createElement("hr"));

    cardHeaderDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(yearDiv);
    cardBodyDiv.appendChild(crewDiv);
    cardBodyDiv.appendChild(ratingDiv);
    cardBodyDiv.appendChild(createBtnSaved(movie, state));
    cardBodyDiv.appendChild(document.createElement("hr"));
    cardBodyDiv.appendChild(createBntFavorites(movie, state));

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardHeaderDiv);
    cardDiv.appendChild(cardBodyDiv);

    cardCol.appendChild(cardDiv);

    let cardsMoviesDiv = document.getElementById("cardsMovies");
    cardsMoviesDiv.appendChild(cardCol);
}

function createBtnSaved (movie, state) {
    let btn = document.createElement("button");
    btn.id = `btns-${movie.id}`;
    if(movie.saved) {
        btn.className = "btn btn-danger btn-lg w-100";
        btn.textContent = 'Delete';
        btn.value = 'delete';
    } else {
        btn.className = "btn btn-primary btn-lg w-100";
        btn.textContent = 'Save';
        btn.value = 'seved';
    }
    btn.addEventListener('click', function() { onClickSaved(movie, state) });
    btn.type = "button";
    btn.name = "action";

    return btn;
}

function createBntFavorites (movie, state) {
    let btn = document.createElement("button");
    btn.id = `btnf-${movie.id}`;
    btn.className = "btn btn-dark btn-lg w-100";
    btn.textContent = 'Favorites ';
    btn.addEventListener('click', function() { onClickFavorites(movie, state) });
    btn.type = "button";
    // btn.name = "action";

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    iconSvg.setAttribute('width', '25');
    iconSvg.setAttribute('height', '30');
    iconSvg.setAttribute('fill', 'currentColor');
    iconSvg.setAttribute('class', 'bi bi-star');
    iconSvg.setAttribute('viewBox', '0 1 16 16');
    iconSvg.setAttribute("fill", 'yellow');
    // iconSvg.classList.add('post-icon');

    iconPath.setAttribute(
        'd',
        movie.favorites ? 
        'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' :
        'M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'
        );      
    iconSvg.appendChild(iconPath);
    btn.appendChild(iconSvg);
    
    return btn;
}

function onClickSaved(movie, state) {
    if(!state) {
        const col = document.getElementById(`col-${movie.id}`);
        col.remove();
        movie.saved = false;
    } else {
        const btn = document.getElementById(`btns-${movie.id}`);
        if(movie.saved) {
            btn.className = 'btn btn-primary btn-lg w-100';
            btn.textContent = 'Save';
            movie.saved = false;
        } else {
            btn.className = 'btn btn-lg btn-danger w-100';
            btn.textContent = 'Delete';
            movie.saved = true;
        }
    }
    
    const data = postData("http://localhost:8080/change", movie).then((data) => {
    console.log(data);
    });
}

function onClickFavorites(movie, state) {
    if(!state) {
        const col = document.getElementById(`col-${movie.id}`);
        col.remove();
        movie.favorites = false;
    } else {
        if(movie.favorites) {
            movie.favorites = false;
        } else {
            movie.favorites = true;
        }
        const btn = document.getElementById(`btnf-${movie.id}`);
        const svg = btn.getElementsByTagName('svg')[0];
        let path = svg.getElementsByTagName('path')[0];
        path.setAttribute("d", movie.favorites ? 
        'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' :
        'M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'
        );
    }
    
    const data = postData("http://localhost:8080/change", movie).then((data) => {
    console.log(data);
    });
}

async function postData(url = "", data) {
    const response = await fetch(url, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache",
      credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    });
    return response.json(); 
  }
  
 

