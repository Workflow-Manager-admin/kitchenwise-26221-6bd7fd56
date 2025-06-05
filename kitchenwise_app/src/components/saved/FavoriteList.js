import React from "react";
import RecipeCard from "../home/RecipeCard";
import { useFavorites } from "./FavoritesContext";

// PUBLIC_INTERFACE
function FavoriteList() {
  /**
   * List container for saved recipes (renders user's favorite recipes)
   */
  const favCtx = useFavorites();
  const favorites = favCtx.getFavoritesList();

  if (!favorites.length) {
    return (
      <div style={{ color: "var(--text-secondary)", marginTop: 24 }}>
        No favorites yet.
      </div>
    );
  }

  return (
    <div>
      {favorites.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => {/* Optionally: show detail modal or nav */}}
        />
      ))}
    </div>
  );
}

export default FavoriteList;
