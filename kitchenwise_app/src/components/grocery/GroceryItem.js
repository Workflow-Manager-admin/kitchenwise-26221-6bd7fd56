import React from "react";

/**
 * GroceryItem renders an individual grocery item with check-off and delete ability.
 * Props:
 *  - id, name, checked, onToggle(), onDelete()
 */
// PUBLIC_INTERFACE
function GroceryItem({ name, checked, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        background: "rgba(0,255,255,0.08)",
        borderRadius: 8,
        padding: "10px 6px 10px 0",
        marginBottom: 10,
        boxShadow: checked
          ? "0 0 2px #00ffff44"
          : "0 2px 8px rgba(0,0,0,0.09)",
        opacity: checked ? 0.65 : 1,
        textDecoration: checked ? "line-through" : "none",
        transition: "background 0.1s, opacity 0.15s"
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        style={{
          marginRight: 14,
          accentColor: "#00ffff",
          height: 20,
          width: 20,
          cursor: "pointer",
        }}
        aria-label={checked ? "Uncheck item" : "Check item"}
      />
      <span style={{
        flex: 1,
        fontSize: 16,
        color: checked ? "var(--text-secondary)" : "var(--text-color)",
        wordBreak: "break-all"
      }}>
        {name}
      </span>
      <button
        onClick={onDelete}
        aria-label="Delete item"
        style={{
          background: "#ff4949",
          color: "white",
          border: "none",
          borderRadius: 6,
          padding: "4px 10px",
          marginLeft: 10,
          fontSize: 15,
          cursor: "pointer"
        }}
      >
        ×
      </button>
    </li>
  );
}

export default GroceryItem;
