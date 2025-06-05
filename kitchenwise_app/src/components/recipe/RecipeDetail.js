import React from "react";
import { useFavorites } from "../saved/FavoritesContext";

// PUBLIC_INTERFACE
function RecipeDetail({ recipe }) {
  /**
   * Full recipe detail view with favorite/unfavorite support.
   * Accepts a `recipe` prop.
   */
  const favCtx = useFavorites();
  const thisId = recipe?.id;
  const isFavorite = favCtx?.isFavorite?.(thisId);

  // Button label for favorite/unfavorite
  const starLabel = isFavorite ? "Unfavorite" : "Favorite";

  function handleFavoriteClick(e) {
    e?.stopPropagation?.();
    if (recipe) {
      favCtx.toggleFavorite(recipe);
      // No further action: state will update from context
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h3 style={{ margin: 0 }}>{recipe?.title || "Recipe Detail"}</h3>
        {recipe?.id && (
          <button
            aria-label={starLabel}
            onClick={handleFavoriteClick}
            style={{
              background: "none",
              border: "none",
              fontSize: 25,
              color: isFavorite ? "#fd0" : "var(--text-secondary)",
              cursor: "pointer"
            }}
            tabIndex={0}
          >{isFavorite ? "★" : "☆"}</button>
        )}
      </div>
      {recipe?.image && (
        <img src={recipe.image} alt={recipe.title} style={{ borderRadius: 10, width: "100%", maxWidth: 330, margin: "18px 0", objectFit: "cover", boxShadow: "0 0 8px #0005" }} />
      )}
      <div style={{ fontSize: 16, margin: "10px 0 18px 0", color: "var(--text-secondary)" }}>
        {recipe?.tags?.length &&
          <span>Tags: {recipe.tags.join(", ")}</span>
        }
      </div>
      {/* ...rest of recipe details... */}
      <div style={{ fontSize: 15, margin: "14px 0 5px 0" }}>
        <em>Recipe details will show here.</em>
      </div>
    </div>
  );
}

export default RecipeDetail;
