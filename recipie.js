const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mealId = urlParams.get('id');

async function getMealDetails() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let data = await res.json();
  console.log(data);
  let meal = data.meals[0];

  let instructionString = `
    <div class="img">
      <img src="${meal.strMealThumb}"/>
    </div>
    <div class="name">
      ${meal.strMeal}
    </div>
    <div class="instructions">
      ${meal.strInstructions}
    </div>
  `;
  instruction.innerHTML = instructionString;
}

getMealDetails();
