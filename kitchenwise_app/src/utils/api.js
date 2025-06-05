//
// utils/api.js
//

// PUBLIC_INTERFACE
/**
 * Simulate fetching recipes from an API using ingredients and filters.
 * Returns a promise (asynchronous API).
 * Filters - { diet: "vegetarian"/"vegan"/null, maxCost: number (optional) }
 * ingredients - array of ingredient strings
 */
export async function fetchRecipes({ ingredients, filters }) {
  // For mock: filter over static mock data
  const MOCK_RECIPES = [
    {
      id: 1,
      title: "Veggie Stir Fry",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=60",
      ingredients: ["broccoli", "carrot", "bell pepper"],
      prepTime: 20,
      costPerServing: 3,
      diet: "vegetarian",
      tags: ["vegetarian", "quick"],
      rating: 4.7,
    },
    {
      id: 2,
      title: "Chickpea Curry",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=200&q=60",
      ingredients: ["chickpea", "onion", "tomato"],
      prepTime: 30,
      costPerServing: 2.5,
      diet: "vegan",
      tags: ["vegan", "budget"],
      rating: 4.5,
    },
    {
      id: 3,
      title: "Chicken Alfredo",
      image: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=200&q=60",
      ingredients: ["chicken", "pasta", "cream"],
      prepTime: 35,
      costPerServing: 4.5,
      diet: "non-vegetarian",
      tags: ["family"],
      rating: 4.2,
    },
    {
      id: 4,
      title: "Simple Tomato Pasta",
      image: "https://images.unsplash.com/photo-1523987355523-c7b5b0723c41?auto=format&fit=crop&w=200&q=60",
      ingredients: ["pasta", "tomato"],
      prepTime: 20,
      costPerServing: 1.8,
      diet: "vegetarian",
      tags: ["vegetarian", "budget"],
      rating: 4.1,
    },
    // ...more as needed
  ];

  let filtered = MOCK_RECIPES;

  // Basic ingredients filter: must contain at least one input ingredient
  if (ingredients && ingredients.length > 0) {
    filtered = filtered.filter(recipe =>
      recipe.ingredients.some(ri =>
        ingredients.some(input => ri.toLowerCase().includes(input.toLowerCase()))
      )
    );
  }
  if (filters && filters.diet && filters.diet !== "any") {
    filtered = filtered.filter(r =>
      (filters.diet === "vegan" && r.diet === "vegan") ||
      (filters.diet === "vegetarian" && (r.diet === "vegetarian" || r.diet === "vegan"))
    );
  }
  if (filters && typeof filters.maxCost === "number") {
    filtered = filtered.filter(r => r.costPerServing <= filters.maxCost);
  }
  // Sort if requested
  if (filters && filters.sortBy) {
    if (filters.sortBy === "cost") filtered.sort((a, b) => a.costPerServing - b.costPerServing);
    if (filters.sortBy === "prep") filtered.sort((a, b) => a.prepTime - b.prepTime);
    if (filters.sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  }

  // Simulate network latency
  return new Promise(resolve => setTimeout(() => resolve(filtered), 500));
}
