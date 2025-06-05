import React from "react";
import RecipeCard from "../home/RecipeCard";

// PUBLIC_INTERFACE
/**
 * RecipeResults - show recipes as cards and handle click
 * @param {Object[]} recipes
 * @param {function} onRecipeClick - callback with recipe obj
 * @param {boolean} [loading] - show loading state
 */
function RecipeResults({ recipes, loading, onRecipeClick }) {
  if (loading) {
    return (
      <div style={{ padding: 28, textAlign: "center" }}>
        <span>🔄 Searching recipes...</span>
      </div>
    );
  }
  if (!recipes || recipes.length === 0) {
    return (
      <div style={{ padding: 28, textAlign: "center", color: "var(--text-secondary)" }}>
        <span>No recipes found. Try different ingredients or filters.</span>
      </div>
    );
  }
  return (
    <div style={{
      display: "grid",
      gap: 18,
      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
      marginTop: 12
    }}>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <RecipeCard
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            tags={recipe.tags}
            onClick={() => onRecipeClick && onRecipeClick(recipe)}
          />
        </div>
      ))}
    </div>
  );
}

export default RecipeResults;
