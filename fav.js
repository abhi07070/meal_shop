let display = document.getElementById("meal-list");

let data = JSON.parse(localStorage.getItem("Mealsid"));
// console.log("this is dtaa" , data);

data.map(async (item) => {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`
  );
  let data = await res.json();
  display.innerHTML += `
    <li id="${data.meals[0].idMeal}" class="list">
    <div id="list-part">
            <div class="img"><img src="${data.meals[0].strMealThumb}"/>
            </div>
            <div class="name"> ${data.meals[0].strMeal}
            </div>
            <button class="fav-btn" onclick="removefavItem(${data.meals[0].idMeal})">favourite</button>
            </div>
    </li>`;
});

let fav=[];
function removefavItem(id) {
  // Retrieve Mealsid data from local storage
  let Mealsid = JSON.parse(localStorage.getItem("Mealsid")) || [];

  // Remove the selected item from the Mealsid array
  const index = Mealsid.indexOf(id);
  if (index > -1) {
    Mealsid.splice(index, 1);
  }

  // Update local storage with the updated Mealsid array
  localStorage.setItem("Mealsid", JSON.stringify(Mealsid));

  const listItem = document.getElementById(id);
  console.log(listItem);
  if (listItem) {
    listItem.remove();
  }
}




