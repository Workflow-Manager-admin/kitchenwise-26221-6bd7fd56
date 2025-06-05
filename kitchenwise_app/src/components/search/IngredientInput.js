import React, { useState } from "react";
import VoiceInputButton from "./VoiceInputButton";

// PUBLIC_INTERFACE
/**
 * IngredientInput allows entering ingredients via text and shows recents.
 * Adds onIngredientAdd callback.
 */
function IngredientInput({
  value,
  onChange,
  onIngredientAdd,
  recentIngredients = [],
  onAddRecent,
}) {
  const [input, setInput] = useState(value || "");

  const handleChange = e => {
    setInput(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && input.trim()) {
      if (onIngredientAdd) {
        onIngredientAdd(input.trim());
        setInput("");
      }
    }
  };

  const addFromClick = item => {
    if (onIngredientAdd) onIngredientAdd(item);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: "bold", fontSize: 16 }}>
        Ingredients
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          style={{
            padding: 10,
            flex: 1,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid var(--border-color)",
            outline: "none",
            marginTop: 8,
            width: "100%",
            minWidth: 0,
          }}
          type="text"
          placeholder="e.g. tomato, chicken, pasta"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Add ingredient"
        />
        <VoiceInputButton />
        <button
          className="btn"
          style={{ marginLeft: 4, padding: "8px 10px", minWidth: 0 }}
          onClick={() => {
            if (input.trim()) {
              onIngredientAdd(input.trim());
              setInput("");
            }
          }}
          aria-label="Add ingredient"
        >Add</button>
      </div>
      {recentIngredients && recentIngredients.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <span style={{ color: "var(--text-secondary)", fontSize: 13 }}>
            Recent:
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 3 }}>
            {recentIngredients.map(rec => (
              <button
                key={rec}
                onClick={() => {
                  if (onAddRecent) onAddRecent(rec);
                  if (onIngredientAdd) onIngredientAdd(rec);
                }}
                style={{
                  background: "var(--base-light)",
                  borderRadius: 16,
                  border: "none",
                  color: "var(--base-dark)",
                  fontWeight: 500,
                  fontSize: 13,
                  padding: "4px 12px",
                  marginBottom: 2,
                  cursor: "pointer"
                }}
                aria-label={`Add recent ingredient ${rec}`}
              >
                {rec}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IngredientInput;
