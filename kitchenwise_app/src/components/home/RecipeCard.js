import React from "react";

// PUBLIC_INTERFACE
function RecipeCard({ title, image, tags, onClick }) {
  /**
   * Summary card for a recipe (image, tags, stub only)
   */
  return (
    <div
      style={{
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.11)",
        padding: 16,
        marginBottom: 16,
        background: "var(--base-dark)",
        color: "var(--text-color)",
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div style={{ fontWeight: "bold" }}>{title || "Recipe Title"}</div>
      <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{tags && tags.join(", ")}</div>
    </div>
  );
}

export default RecipeCard;
