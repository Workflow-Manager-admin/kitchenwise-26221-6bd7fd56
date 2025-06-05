import React, { useMemo } from "react";
import { useFavorites } from "../saved/FavoritesContext";
import { useGroceryList } from "../grocery/GroceryListContext";
import NutritionInfo from "./NutritionInfo";

/**
 * RecipeDetail - shows detailed recipe info, steps, cost, nutrition, and integrates Favorites and Grocery List.
 *
 * Props:
 *   - recipe: { id, title, image, tags, prepTime, costPerServing, diet, instructions, nutrition, ingredients }
 */
 // PUBLIC_INTERFACE
function RecipeDetail({ recipe }) {
  const favCtx = useFavorites();
  const groceryCtx = useGroceryList();

  const thisId = recipe?.id;
  const isFavorite = favCtx?.isFavorite?.(thisId);

  // Pull fields, fallback if minimal recipe shape
  const {
    title,
    image,
    tags,
    prepTime,
    costPerServing,
    diet,
    instructions,
    nutrition,
    ingredients
  } = recipe || {};

  // Try to extract array of ingredient names if present:
  // Accepts either `ingredients: [{name:..},..]` or `extendedIngredients` (API shape) or []
  const ingredientList = useMemo(() => {
    if (!recipe) return [];
    // Try standard array of strings first
    if (Array.isArray(recipe.ingredients) && recipe.ingredients.length && typeof recipe.ingredients[0] === "string")
      return recipe.ingredients;
    // Spoonacular or similar: extendedIngredients
    if (Array.isArray(recipe.extendedIngredients)) {
      return recipe.extendedIngredients.map(ing => ing.name);
    }
    // Array of objects with `name`
    if (Array.isArray(recipe.ingredients) && recipe.ingredients.length && typeof recipe.ingredients[0] === "object")
      return recipe.ingredients.map(ing => ing.name);
    // Fallback: try recipe.usedIngredients/missedIngredients shape
    if (Array.isArray(recipe.missedIngredients) && recipe.missedIngredients.length)
      return [
        ...(Array.isArray(recipe.usedIngredients) ? recipe.usedIngredients.map(i => i.name) : []),
        ...recipe.missedIngredients.map(i => i.name)
      ];
    return [];
  }, [recipe]);

  // Detect what ingredients are missing (i.e., not already in grocery list)
  const missingIngredients = useMemo(() => {
    if (!ingredientList.length) return [];
    // If context/api not available, fallback to all ingredients as missing
    if (!groceryCtx || !groceryCtx.hasIngredient) return ingredientList;
    return ingredientList.filter(name => !groceryCtx.hasIngredient(name));
  }, [ingredientList, groceryCtx]);

  const handleFavoriteClick = (e) => {
    e?.stopPropagation?.();
    if (recipe) favCtx.toggleFavorite(recipe);
  };

  // Add all missing ingredients to grocery
  const handleAddMissingToGrocery = () => {
    if (groceryCtx && missingIngredients.length) {
      groceryCtx.addMultipleItems(missingIngredients);
    }
  };

  // Per-ingredient add button handler
  const handleAddOneMissing = (ingredient) => {
    if (groceryCtx) groceryCtx.addItem(ingredient);
  };

  // Format cost
  function formatCurrency(amount, currency = "$") {
    if (typeof amount !== "number" || isNaN(amount)) return "—";
    // In a real app, currency could be a context/setting
    return `${currency}${amount.toFixed(2)}`;
  }

  // Markup & Styling
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h3 style={{ margin: 0 }}>{title || "Recipe Detail"}</h3>
        {thisId && (
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
            tabIndex={0}
          >{isFavorite ? "★" : "☆"}</button>
        )}
      </div>
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            borderRadius: 10,
            width: "100%",
            maxWidth: 330,
            margin: "18px 0",
            objectFit: "cover",
            boxShadow: "0 0 8px #0005"
          }}
        />
      )}

      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", margin: "10px 0" }}>
        {prepTime !== undefined && (
          <span style={{ fontSize: 15, color: "var(--text-secondary)", display: "inline-block" }}>
            <b>Time:</b> {prepTime} min
          </span>
        )}
        {typeof costPerServing === "number" && (
          <span style={{ fontSize: 15, color: "var(--text-secondary)", display: "inline-block" }}>
            <b>Cost:</b> {formatCurrency(costPerServing, "$")}
          </span>
        )}
        {diet && (
          <span style={{
            fontSize: 14,
            color: diet === "vegan" ? "#31E08F" : diet === "vegetarian" ? "#6ad1ec" : "var(--text-secondary)",
            background: "rgba(0,255,255,0.10)",
            padding: "2px 10px",
            borderRadius: 13,
            fontWeight: 500
          }}>
            {diet}
          </span>
        )}
        {tags && Array.isArray(tags) && tags.length > 0 && (
          <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            {tags.join(", ")}
          </span>
        )}
      </div>

      {/* Ingredient list */}
      {ingredientList && ingredientList.length > 0 && (
        <div style={{ margin: "12px 0 11px 0" }}>
          <b>Ingredients:</b>
          <ul style={{ listStyle: "disc inside", margin: "6px 0 0 2px", padding: 0 }}>
            {ingredientList.map((name, idx) => {
              const missing = groceryCtx && !groceryCtx.hasIngredient(name);
              return (
                <li key={name+idx} style={{
                  marginBottom: 3,
                  color: missing ? "#ffd500" : "var(--text-secondary)",
                  display: "flex", alignItems: "center", gap: 4
                }}>
                  <span>{name}</span>
                  {missing && groceryCtx && (
                    <button
                      className="btn"
                      style={{
                        fontSize: 11,
                        padding: "2px 10px",
                        marginLeft: 8,
                        background: "#00ffff20",
                        color: "#00ffff",
                        borderRadius: 8,
                        border: "none",
                        cursor: "pointer"
                      }}
                      aria-label={`Add ${name} to grocery list`}
                      onClick={() => handleAddOneMissing(name)}
                    >
                      + Add
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          {/* "Add all missing" button */}
          {missingIngredients && missingIngredients.length > 0 && (
            <button
              className="btn"
              style={{
                marginTop: 8,
                padding: "4px 20px", fontSize: 14,
                background: "#00ffff54",
                color: "#00008b", borderRadius: 8,
                border: "none", cursor: "pointer"
              }}
              onClick={handleAddMissingToGrocery}
              aria-label="Add all missing ingredients to grocery list"
            >
              Add all missing ingredients to grocery
            </button>
          )}
        </div>
      )}

      {/* Instructions/steps */}
      <div style={{ margin: "18px 0 0 0" }}>
        <b>Instructions:</b>
        {instructions && (
          typeof instructions === "string" ?
            <p style={{ marginTop: 7, color: "var(--text-color)", fontSize: 15, whiteSpace: "pre-line" }}>
              {instructions}
            </p>
            :
            <ol style={{ marginTop: 6, fontSize: 15 }}>
              {Array.isArray(instructions)
                ? instructions.map((step, idx) => <li key={idx}>{step}</li>)
                : null}
            </ol>
        )}
        {!instructions && (
          <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 3 }}>
            <em>No instructions available for this recipe.</em>
          </div>
        )}
      </div>

      {/* Nutrition information */}
      <div style={{ marginTop: 22 }}>
        <b>Nutrition Info:</b>
        <NutritionInfo nutrition={nutrition} />
      </div>
    </div>
  );
}

export default RecipeDetail;
