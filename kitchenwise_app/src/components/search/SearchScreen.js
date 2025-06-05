import React, { useState, useEffect, useCallback } from "react";
import IngredientInput from "./IngredientInput";
import FiltersPanel from "./FiltersPanel";
import RecipeResults from "./RecipeResults";
import { fetchRecipes } from "../../utils/api";

// PUBLIC_INTERFACE
/**
 * SearchScreen - central feature, manage search state for ingredients and filters, load recipes
 */
function SearchScreen() {
  const [ingredients, setIngredients] = useState([]);
  const [recentIngredients, setRecentIngredients] = useState(() => {
    // Optionally persist to localStorage later
    return [];
  });
  const [filters, setFilters] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [searching, setSearching] = useState(false);

  // Effect: Load new results when ingredients/filters change
  useEffect(() => {
    let active = true;
    if (ingredients.length === 0) {
      setRecipes([]);
      return;
    }
    setSearching(true);
    fetchRecipes({ ingredients, filters }).then(results => {
      if (active) {
        setRecipes(results);
        setSearching(false);
      }
    });
    return () => { active = false; };
  }, [ingredients, filters]);

  // On add ingredient
  const handleAddIngredient = (ingredient) => {
    if (!ingredient || ingredients.includes(ingredient.toLowerCase())) return;
    setIngredients(prev => [...prev, ingredient.toLowerCase()]);
    setRecentIngredients(prev =>
      [ingredient.toLowerCase(), ...prev.filter(i => i !== ingredient.toLowerCase())].slice(0, 6)
    );
  };

  const handleRemoveIngredient = idx => {
    setIngredients(prev => prev.filter((_, i) => i !== idx));
  };

  const handleRecipeClick = recipe => {
    // TODO: show detail view (modal/navigation)
    alert(`Recipe: ${recipe.title}`);
  };

  // On add from recent
  const handleAddRecent = rec => {
    if (!ingredients.includes(rec)) setIngredients(prev => [...prev, rec]);
  };

  return (
    <section style={{ paddingTop: 120, paddingBottom: 72 }}>
      <h2>Search Recipes</h2>
      <IngredientInput
        value=""
        onIngredientAdd={handleAddIngredient}
        recentIngredients={recentIngredients}
        onAddRecent={handleAddRecent}
      />
      {/* Ingredient chips list */}
      {ingredients.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {ingredients.map((ing, i) => (
            <span key={ing + i}
              style={{
                background: "var(--base-light)",
                color: "var(--base-dark)",
                borderRadius: 16,
                padding: "6px 14px 6px 10px",
                fontSize: 15,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center"
              }}>
              {ing}
              <button
                aria-label="Remove ingredient"
                style={{
                  marginLeft: 5,
                  background: "none",
                  border: "none",
                  color: "var(--base-dark)",
                  fontSize: 15,
                  fontWeight: "bold",
                  cursor: "pointer",
                  outline: "none"
                }}
                onClick={() => handleRemoveIngredient(i)}
                tabIndex={0}
              >×</button>
            </span>
          ))}
        </div>
      )}
      <FiltersPanel filters={filters} onChange={setFilters} />
      <RecipeResults
        recipes={recipes}
        loading={searching}
        onRecipeClick={handleRecipeClick}
      />
    </section>
  );
}

export default SearchScreen;
