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

function onClickSaved(btn, id, title, image, crew, year, rating) {
    // let movie = { id, title, image, crew, year, rating, is_favorites: !!+btn.value}
    // let arr = document.URL.split('/');
    // let link = arr[arr.length-1];

    console.log(!!+btn.value);

    // if(btn.name === 'save') {
    //     btn.className = 'my-btn btn btn-lg btn-danger w-100';
    //     btn.textContent = 'Delete';
    //     btn.name = 'delete';
    //     movie.is_saved = true;
    // } else if (btn.name === 'delete') {
    //     btn.className = 'my-btn btn btn-primary btn-lg w-100';
    //     btn.textContent = 'Save';
    //     btn.name = 'save'
    //     movie.is_saved = false;
    //     // if(movie.is_favorites && link === 'saved') {
    //     //     btn.closest('.col').remove();
    //     //     const data = postData("http://localhost:3000/delete", {id}).then((data) => {
    //     //     console.log(data);
    //     //     });
    //     //     return;
    //     // }
    // }
    
    // const data = postData("http://localhost:3000/changeSaved", movie).then((data) => {
    // console.log(data);
    // });
}

function onClickFavorites(btn, id) {
    let favorites = false;
    const svg = btn.getElementsByTagName('svg')[0];
    let path = svg.getElementsByTagName('path')[0];
    if(btn.name === 'favorites') {
        console.log(btn.name);
        path.setAttribute("d", 'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z');
        btn.name = 'no_favorites';
        favorites = true;
    } else {
        console.log(btn.name);
        path.setAttribute("d", 'M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z');
        btn.name = 'favorites';
        favorites = false;
    }

    const data = postData("http://localhost:3000/changeFavorites", {id, favorites}).then((data) => {
        console.log(data);
        });
}

// function onClickFavorites(movie, state) {
//     if(!state) {
//         const col = document.getElementById(`col-${movie.id}`);
//         col.remove();
//         movie.favorites = false;
//     } else {
//         if(movie.favorites) {
//             movie.favorites = false;
//         } else {
//             movie.favorites = true;
//         }
//         const btn = document.getElementById(`btnf-${movie.id}`);
//         const svg = btn.getElementsByTagName('svg')[0];
//         let path = svg.getElementsByTagName('path')[0];
//         path.setAttribute("d", movie.favorites ? 
//         'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' :
//         'M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'
//         );
//     }
    
//     const data = postData("http://localhost:8080/change", movie).then((data) => {
//     console.log(data);
//     });
// }

async function postData(url, data) {
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
  
 

