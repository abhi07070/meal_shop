let search = document.getElementById("search");
let button = document.getElementById("btn");
let container = document.getElementById("container");
let display = document.getElementById("meal-list");
let meals = [];

// adding the keyup evnet on the search bar
search.addEventListener("keyup", getMealList);

// adding the click event on the button
button.addEventListener("click", getMealList);

// doing the work on the getMealList function
async function getMealList() {
  let searchInput = search.value;
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
  );
  let data = await res.json();
  console.log(data)
  let mealString = data.meals
    .map((meal) => {
      if (searchInput == "") {
        display.innerHTML = "";
      } else {
        return `
    <li id="list" class="list">
        <div id="list-part">
            <div class="img">
                <img src="${meal.strMealThumb}"/>
            </div>
            <div class="name">
                ${meal.strMeal}
            </div>
            <a href="recipie.html?id=${meal.idMeal}">Details</a>
            <button class="fav-btn" onclick="addfavItem(${meal.idMeal})">add favourite</button>
        </div>
    </li>`;

      }
    })
    .join("");
  display.innerHTML = mealString;

  // working on the button when click the text and the color changed and when again click it's comes on the previous look
  let list = document.querySelectorAll(".fav-btn");

  list.forEach((btn) => {
    let mark = true;
    btn.addEventListener("click", () => {
      if (mark) {
        btn.style.backgroundColor = "red";
        btn.innerHTML = "favourite";
        alert("item added to favourite successfully!!");
        mark = false;
      } else {
        btn.style.backgroundColor = "pink";
        btn.innerHTML = "add favourite";
        alert("item remove from the favourite list!!");
        mark = true;
      }
    });
  });
}

// adding the favourite item to the favourite part
let fav = [];

function addfavItem(id) {
  fav.push(id);
  localStorage.setItem("Mealsid", JSON.stringify(fav));

  // console.log("this is fav arr",fav);

}