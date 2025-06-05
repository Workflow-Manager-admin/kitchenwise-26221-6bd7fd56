import React, { useState, useEffect, useCallback } from "react";
import IngredientInput from "./IngredientInput";
import FiltersPanel from "./FiltersPanel";
import RecipeResults from "./RecipeResults";
import { fetchRecipes } from "../../utils/api";
import RecipeDetail from "../recipe/RecipeDetail";

// PUBLIC_INTERFACE
/**
 * SearchScreen - manages ingredient/filter state, fetches real API recipes, and displays results.
 *
 * This component now handles LIVE Spoonacular API recipe search.
 * - Handles API/network errors (shows user notification if key missing, quota exceeded, or connectivity issues).
 * - Requires .env with REACT_APP_SPOONACULAR_API_KEY (see utils/api.js for setup).
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
  const [errorMsg, setErrorMsg] = useState(""); // NEW: track API/network errors
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Holds selected recipe for detail view

  // Improved: Robust search effect with atomic state reset and request id tracking
  useEffect(() => {
    // A unique sequential id for each search to avoid stale async results
    let isActive = true;
    // Use a ref to hold the latest request id across rerenders
    if (!SearchScreen._searchSeq) SearchScreen._searchSeq = 1;
    const reqId = ++SearchScreen._searchSeq;

    // Atomically update all search-related state
    setErrorMsg("");
    setRecipes([]);
    setSearching(!!ingredients.length);

    if (ingredients.length === 0) {
      setSearching(false);
      return;
    }

    fetchRecipes({ ingredients, filters })
      .then(results => {
        // Only update if this is the latest request
        if (isActive && reqId === SearchScreen._searchSeq) {
          setRecipes(results || []);
          setSearching(false);
        }
      })
      .catch(err => {
        if (isActive && reqId === SearchScreen._searchSeq) {
          setErrorMsg(
            err.message ||
              "Unknown error during recipe search. Check your API key, API quota, or internet connection."
          );
          setRecipes([]);
          setSearching(false);
        }
      });

    return () => {
      isActive = false;
      // Optionally, future: cancelable fetch (not with plain fetch)
    };
    // eslint-disable-next-line
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
    setSelectedRecipe(recipe);
  };

  // On add from recent
  const handleAddRecent = rec => {
    if (!ingredients.includes(rec)) setIngredients(prev => [...prev, rec]);
  };

  // Handle closing the detail modal
  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  return (
    <section style={{ paddingTop: 120, paddingBottom: 72 }}>
      <h2>Search Recipes</h2>
      <div style={{ marginBottom: 10, fontSize: 13, color: "var(--text-secondary)" }}>
        {/* Info for initial API setup */}
        The recipe search uses the real Spoonacular API.<br/>
        <span>
          {/* Slight hint about .env */}
          <b>Requires setup:</b> See&nbsp;
          <code>REACT_APP_SPOONACULAR_API_KEY</code>
          &nbsp;in your <b>.env</b> (not committed). Details in <code>src/utils/api.js</code>.
        </span>
      </div>
      {/* Error message display */}
      {errorMsg && (
        <div style={{ background: "#ffecec", color: "#b80000", border: "1px solid #ffbebe", marginBottom: 18, borderRadius: 8, padding: 10, fontSize: 15 }}>
          ⚠️ <b>Error:</b> {errorMsg}
        </div>
      )}
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

      {/* Modal-style detail overlay when a recipe is selected */}
      {selectedRecipe && (
        <div
          style={{
            background: "rgba(0,0,0,0.45)",
            position: "fixed",
            top: 0, left: 0, width: "100vw", height: "100vh",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={handleCloseDetail}
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{
              background: "var(--base-dark)",
              borderRadius: 14,
              minWidth: 320, maxWidth: 430,
              padding: 28,
              boxShadow: "0 6px 20px rgba(0,0,0,0.22)",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Close detail"
              onClick={handleCloseDetail}
              style={{
                position: "absolute",
                top: 8, right: 14,
                fontSize: 22,
                background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer"
              }}
            >×</button>
            <RecipeDetail recipe={selectedRecipe} />
          </div>
        </div>
      )}
    </section>
  );
}

export default SearchScreen;
