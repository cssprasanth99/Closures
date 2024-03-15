let movieInfoDiv = document.getElementById("movieInfo");
let input = document.getElementById("movie-name");

input.addEventListener("input",()=>{
    deBounce(fetchData,1000);
})

async function fetchData(){

    try{
        let res = await  fetch(`https://www.omdbapi.com/?s=${input.value}&page=1&apikey=dc35342c`);
        let data = await res.json();
        console.log(data);
        if (data.Response === "True") {
                        displayMovie(data.Search);
                    }
      else {
                       movieInfoDiv.innerText = "Movie not found";      
                    }
    }
    catch(err){
        console.log(err);
    }
}

let timer;

function deBounce(fun,delay){
    if(timer){
        clearTimeout(timer);
    }

   timer = setTimeout(function(){
        fun()
    },delay)
}


function displayMovie(movie) {
    movieInfoDiv.innerHTML = "";
    movie.forEach(ele => {
        let div = document.createElement("div");

let movieTitle = document.createElement("p");
        let movieYear = document.createElement("p");
        let movieImg = document.createElement("img");
        div.className = "card";
        movieTitle.setAttribute("id", "movie-title");
        movieTitle.innerText = `Title: ${ele.Title}`;
        movieYear.innerText = `Year: ${ele.Year}`;
        movieImg.src = ele.Poster;
        movieImg.alt = "No Image";
        div.append(movieTitle, movieYear, movieImg);
        movieInfoDiv.append(div);
    });
}