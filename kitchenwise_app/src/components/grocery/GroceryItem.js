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
        background: checked ? "rgba(97,255,214,0.13)" : "rgba(34,201,235,0.10)",
        borderRadius: "var(--radius-lg)",
        padding: "13px 10px 13px 9px",
        marginBottom: 11,
        boxShadow: checked
          ? "0 2px 9px #00c8a04a"
          : "var(--shadow-card)",
        opacity: checked ? 0.5 : 1,
        textDecoration: checked ? "line-through" : "none",
        border: checked ? "1.5px solid #90ffc2" : "1px solid var(--border-color)",
        position: "relative",
        transition: "background 0.14s, opacity 0.18s, box-shadow 0.16s, border 0.11s"
      }}
      className="grocery-item"
      tabIndex={0}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        style={{
          marginRight: 16,
          accentColor: "#61ffd6",
          height: 22,
          width: 22,
          minWidth: 22,
          cursor: "pointer",
          transform: checked ? "scale(1.12)" : "scale(1)",
          boxShadow: checked ? "0 0 0 2px #c6ffee80" : "none",
          transition: "all 0.13s"
        }}
        aria-label={checked ? "Uncheck item" : "Check item"}
      />
      <span style={{
        flex: 1,
        fontSize: 16,
        color: checked ? "#b3fff1" : "var(--text-color)",
        fontWeight: checked ? 450 : 500,
        opacity: checked ? 0.82 : 1,
        wordBreak: "break-all"
      }}>
        {name}
      </span>
      <button
        onClick={onDelete}
        aria-label="Delete item"
        style={{
          background: "#ff8949",
          color: "#fffbe6",
          border: "none",
          borderRadius: "50%",
          padding: "5px 13px 4px 13px",
          marginLeft: 9,
          fontSize: 19,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px #ff944922",
          opacity: 0.9,
          transition: "background .12s, color .1s, box-shadow .11s"
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = "#ff4949";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = "#ff8949";
          e.currentTarget.style.color = "#fffbe6";
        }}
      >
        ×
      </button>
    </li>
  );
}

export default GroceryItem;
