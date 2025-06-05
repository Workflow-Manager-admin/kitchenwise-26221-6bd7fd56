import React from "react";
import GroceryItem from "./GroceryItem";

/**
 * GroceryList displays and manages a list of grocery items
 * Props:
 *   items: [{id, name, checked}]
 *   onToggle(id): check/uncheck
 *   onDelete(id): delete
 */
// PUBLIC_INTERFACE
function GroceryList({ items, onToggle, onDelete }) {
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <ul style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      maxWidth: 420,
    }}>
      {items.map((item) => (
        <GroceryItem
          key={item.id}
          id={item.id}
          name={item.name}
          checked={!!item.checked}
          onToggle={() => onToggle && onToggle(item.id)}
          onDelete={() => onDelete && onDelete(item.id)}
        />
      ))}
    </ul>
  );
}

export default GroceryList;
