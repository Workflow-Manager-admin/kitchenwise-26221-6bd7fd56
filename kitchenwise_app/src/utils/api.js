//
// utils/api.js
//
// Real Spoonacular Recipe API integration for KitchenWise.
//
// NOTE: You must provide your Spoonacular API key in an .env file at the root of the kitchenwise_app project:
// Example .env entry (DO NOT commit your key!):
//   REACT_APP_SPOONACULAR_API_KEY=your_actual_spoonacular_key_here
//

const SPOONACULAR_API_URL = "https://api.spoonacular.com/recipes/complexSearch";

// PUBLIC_INTERFACE
/**
 * Fetch recipes from Spoonacular based on input ingredients and filters.
 *
 * @param {Object} params
 *    - ingredients: array of strings
 *    - filters: { diet: 'vegetarian'|'vegan'|..., maxCost: number, sortBy: 'cost'|'prep'|'rating' }
 * @returns {Promise<Array>} List of recipe objects [{ id, title, image, ... }]
 *
 * Requirements:
 * - API key must be set in REACT_APP_SPOONACULAR_API_KEY in your .env file.
 */
export async function fetchRecipes({ ingredients, filters }) {
  const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing Spoonacular API Key. Please create a .env file in the root of kitchenwise_app and define REACT_APP_SPOONACULAR_API_KEY=your_key"
    );
  }
  // Prepare query params
  const params = [];
  if (ingredients && ingredients.length > 0)
    params.push("includeIngredients=" + encodeURIComponent(ingredients.join(",")));
  params.push("fillIngredients=true");
  params.push("number=10");
  params.push("addRecipeInformation=true");
  if (filters?.diet && filters.diet !== "any")
    params.push("diet=" + encodeURIComponent(filters.diet));
  params.push("apiKey=" + encodeURIComponent(apiKey));
  const url = SPOONACULAR_API_URL + "?" + params.join("&");

  let resp;
  try {
    resp = await fetch(url);
    if (!resp.ok) {
      let msg = "Recipe API request failed: " + resp.statusText;
      if (resp.status === 402) msg += " (likely API quota exhausted)";
      throw new Error(msg);
    }
  } catch (err) {
    throw new Error("Network/API error: " + err.message);
  }

  let results;
  try {
    const data = await resp.json();
    results = (data.results || []).map((item) => ({
      id: item.id,
      title: item.title,
      image: item.image,
      prepTime: item.readyInMinutes,
      costPerServing: item.pricePerServing ? (item.pricePerServing / 100) : undefined,
      diet: (item.vegan ? "vegan" : item.vegetarian ? "vegetarian" : "non-vegetarian"),
      tags: [
        ...(item.vegan ? ["vegan"] : []),
        ...(item.vegetarian && !item.vegan ? ["vegetarian"] : []),
        ...(item.glutenFree ? ["gluten-free"] : []),
        ...(item.diets || [])
      ],
      rating: item.spoonacularScore || undefined,
    }));
    if (filters && typeof filters.maxCost === "number") {
      results = results.filter(r => typeof r.costPerServing === "number" && r.costPerServing <= filters.maxCost);
    }
    if (filters?.sortBy) {
      if (filters.sortBy === "cost")
        results.sort((a, b) => (a.costPerServing || 0) - (b.costPerServing || 0));
      if (filters.sortBy === "prep")
        results.sort((a, b) => (a.prepTime || 0) - (b.prepTime || 0));
      if (filters.sortBy === "rating")
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return results;
  } catch (err) {
    throw new Error("Error parsing recipe API response: " + err.message);
  }
}

/*
 * === Spoonacular API connection guide ===
 * 1. Register at https://spoonacular.com/food-api for an API key.
 * 2. Create kitchenwise_app/.env with:
 *      REACT_APP_SPOONACULAR_API_KEY=your_spoonacular_key_here
 * 3. Restart the dev server after updating .env.
 * 4. Do not expose or commit your API key to the repository.
 */
