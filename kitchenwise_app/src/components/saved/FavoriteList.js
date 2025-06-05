import React, { useState } from "react";
import RecipeCard from "../home/RecipeCard";
import { useFavorites } from "./FavoritesContext";
import RecipeDetail from "../recipe/RecipeDetail";

// PUBLIC_INTERFACE
function FavoriteList() {
  /**
   * List container for saved recipes (renders user's favorite recipes)
   * Now supports clicking a card to show RecipeDetail with integration to persistent FavoritesContext.
   */
  const favCtx = useFavorites();
  const favorites = favCtx.getFavoritesList();

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (!favorites.length) {
    return (
      <div style={{ color: "var(--text-secondary)", marginTop: 24 }}>
        No favorites yet.
      </div>
    );
  }

  if (selectedRecipe) {
    // Show modal-like detail overlay (simple impl)
    return (
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
        onClick={() => setSelectedRecipe(null)}
        role="dialog"
        aria-modal="true"
      >
        <div
          style={{
            background: "var(--base-dark)",
            borderRadius: 14,
            minWidth: 320, maxWidth: 420,
            padding: 28,
            boxShadow: "0 6px 20px rgba(0,0,0,0.22)",
            position: "relative"
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            aria-label="Close detail"
            onClick={() => setSelectedRecipe(null)}
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
    );
  }

  return (
    <div>
      {favorites.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => setSelectedRecipe(recipe)}
        />
      ))}
    </div>
  );
}

export default FavoriteList;
