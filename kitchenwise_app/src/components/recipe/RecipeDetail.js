import React from "react";
import { useFavorites } from "../saved/FavoritesContext";

// PUBLIC_INTERFACE
function RecipeDetail({ recipe }) {
  /**
   * Full recipe detail view with favorite/unfavorite (stub for now)
   * Accepts a `recipe` prop.
   */
  const favCtx = useFavorites();
  const thisId = recipe?.id;
  const isFavorite = favCtx?.isFavorite?.(thisId);

  function handleFavoriteClick() {
    if (recipe) {
      favCtx.toggleFavorite(recipe);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h3 style={{ margin: 0 }}>{recipe?.title || "Recipe Detail"}</h3>
        {recipe?.id && (
          <button
            aria-label={isFavorite ? "Unfavorite" : "Favorite"}
            onClick={handleFavoriteClick}
            style={{
              background: "none",
              border: "none",
              fontSize: 25,
              color: isFavorite ? "#fd0" : "var(--text-secondary)",
              cursor: "pointer"
            }}
          >{isFavorite ? "★" : "☆"}</button>
        )}
      </div>
      {/* ...rest of recipe details... */}
      <div>Recipe details will show here.</div>
    </div>
  );
}

export default RecipeDetail;
