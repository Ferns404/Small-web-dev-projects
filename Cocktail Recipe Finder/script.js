// Fetch Elements
const ingredientForm = document.getElementById('ingredientForm');
const resultsDiv = document.getElementById('results');

// Handle form submission
ingredientForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const ingredient = document.getElementById('ingredient').value;

  if (!ingredient) {
    alert('Please enter an ingredient');
    return;
  }

  // Call API to get cocktails matching the ingredient
  fetchCocktails(ingredient);
});

function fetchCocktails(ingredient) {
  // Build API URL for single ingredient search
  const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
  const query = ingredient;

  fetch(baseUrl + query)
    .then(response => response.json())
    .then(data => {
      if (data.drinks) {
        // Clear previous results
        resultsDiv.innerHTML = '';

        // Get detailed recipe for each cocktail
        data.drinks.forEach(drink => {
          fetchCocktailDetails(drink.idDrink);
        });
      } else {
        resultsDiv.innerHTML = '<p>No cocktails found with that ingredient.</p>';
      }
    })
    .catch(error => console.error('Error fetching cocktails:', error));
}

function fetchCocktailDetails(drinkId) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const drink = data.drinks[0];
      displayCocktail(drink);
    })
    .catch(error => console.error('Error fetching cocktail details:', error));
}

function displayCocktail(drink) {
  const cocktailDiv = document.createElement('div');
  cocktailDiv.classList.add('cocktail');

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(`${measure || ''} ${ingredient}`.trim());
    }
  }

  cocktailDiv.innerHTML = `
    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
    <h3>${drink.strDrink}</h3>
    <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
    <p><strong>Ingredients:</strong></p>
    <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
  `;

  resultsDiv.appendChild(cocktailDiv);
}
