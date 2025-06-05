import React from "react";
import { useFavorites } from "../saved/FavoritesContext";

// PUBLIC_INTERFACE
function RecipeCard({ title, image, tags, onClick, id, recipe }) {
  /**
   * Summary card for a recipe (image, tags, with favorite/unfavorite logic)
   *
   * Accepts either:
   * - id/title/image/tags as props
   * - OR recipe (object, as returned from API/result)
   */
  const favCtx = useFavorites();
  // Allow props to override or provide a `recipe` directly
  const thisId = id || recipe?.id;
  const thisTitle = title || recipe?.title;
  const thisImage = image || recipe?.image;
  const thisTags = tags || recipe?.tags;
  const cardRecipe = recipe || { id: thisId, title: thisTitle, image: thisImage, tags: thisTags };

  const isFavorite = favCtx?.isFavorite?.(thisId);

  function handleFavoriteClick(e) {
    e.stopPropagation();
    favCtx.toggleFavorite?.(cardRecipe);
  }

  return (
    <div
      style={{
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.11)",
        padding: 16,
        marginBottom: 16,
        background: "var(--base-dark)",
        color: "var(--text-color)",
        position: "relative",
        minHeight: 60,
        cursor: "pointer"
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Favorite star top-right */}
      <button
        aria-label={isFavorite ? "Unfavorite" : "Favorite"}
        onClick={handleFavoriteClick}
        style={{
          background: "none",
          border: "none",
          position: "absolute",
          right: 12,
          top: 10,
          fontSize: 22,
          color: isFavorite ? "#fd0" : "var(--text-secondary)",
          textShadow: isFavorite ? "0 2px 5px #654" : "none",
          cursor: "pointer",
        }}
        tabIndex={0}
      >{isFavorite ? "★" : "☆"}</button>
      <div style={{ fontWeight: "bold", paddingRight: 28 }}>
        {thisTitle || "Recipe Title"}
      </div>
      <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
        {thisTags && thisTags.join(", ")}
      </div>
      {/* Optionally: image/thumbnail can be added here */}
    </div>
  );
}

export default RecipeCard;
