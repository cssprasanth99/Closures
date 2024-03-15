let input = document.getElementById("search-input");
let container = document.getElementById("container");

input.addEventListener("input",()=>{
    throttling(fetchData,1000);
});

let flag = false;

function throttling(func,delay){
    if(flag === true){
        return;
    }else{
        func();
        flag = true;
        setTimeout(function(){
            flag = false;
        },delay)
    }
}

async function fetchData(){
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input.value}`);
        let data = await res.json();
        console.log(data);
        appendCard(data.meals);

    } catch (error) {
        console.log(error);
    }
}

function appendCard(data){

    container.innerHTML = "";
        data.forEach(ele => {
            let div = document.createElement("div");
            let recipeName = document.createElement("p");
            let instructions = document.createElement("p");
            let foodImg = document.createElement("img");
            div.className = "card";
            recipeName.setAttribute("id", "movie-title");
            recipeName.innerText = `Recipe name: ${ele.strMeal}`;
            instructions.innerText = `Instructions: ${ele.strInstructions}`;
            foodImg.src = ele.strMealThumb;
            foodImg.alt = "No Image";
            div.append(recipeName,foodImg,instructions);
            container.append(div);
        });
    }
