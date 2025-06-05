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
    // No additional action; state will re-render from context.
  }

  return (
    <div
      style={{
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
        padding: "19px 18px 14px 19px",
        marginBottom: 22,
        background: "var(--card-bg)",
        color: "var(--text-color)",
        position: "relative",
        minHeight: 72,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        alignItems: "flex-start",
        transition: "transform var(--transition-short), box-shadow var(--transition-short), background 0.15s",
        outline: "none",
        border: "1px solid var(--border-color)",
        filter: "none"
      }}
      className="recipe-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onMouseOver={e => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.018)";
        e.currentTarget.style.boxShadow = "0 12px 32px 0 rgba(33,139,133,0.13), 0 0 0 1.5px #00ffa7bd";
        e.currentTarget.style.background = "linear-gradient(90deg, #163043 77%, #29495b 100%)";
      }}
      onFocus={e => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.018)";
        e.currentTarget.style.boxShadow = "0 12px 32px 0 rgba(33,139,133,0.13), 0 0 0 1.5px #00ffa7bd";
        e.currentTarget.style.background = "linear-gradient(90deg, #163043 77%, #29495b 100%)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
        e.currentTarget.style.background = "var(--card-bg)";
      }}
      onBlur={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
        e.currentTarget.style.background = "var(--card-bg)";
      }}
    >
      {/* Favorite star top-right */}
      <button
        aria-label={isFavorite ? "Unfavorite" : "Favorite"}
        onClick={handleFavoriteClick}
        style={{
          background: "none",
          border: "none",
          position: "absolute",
          right: 17,
          top: 13,
          fontSize: 25,
          color: isFavorite ? "#ffe36f" : "var(--text-secondary)",
          textShadow: isFavorite ? "0 2px 8px #ffd11bb9" : "none",
          cursor: "pointer",
          transition: "color 0.13s",
          outline: "none"
        }}
        tabIndex={0}
      >{isFavorite ? "★" : "☆"}</button>
      <div style={{
        fontWeight: 700,
        paddingRight: 38,
        fontSize: "1.15rem",
        letterSpacing: ".2px",
        marginBottom: 3
      }}>
        {thisTitle || "Recipe Title"}
      </div>
      <div style={{
        fontSize: "0.94rem",
        color: "var(--kitchen-yellow)",
        fontWeight: 500,
        marginBottom: 3
      }}>
        {thisTags && thisTags.join(", ")}
      </div>
    </div>
  );
}

export default RecipeCard;
