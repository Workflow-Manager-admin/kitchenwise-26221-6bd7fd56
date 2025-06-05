import React from "react";

// PUBLIC_INTERFACE
function GroceryItem({ name, checked, onToggle }) {
  /**
   * Individual grocery list item (stub)
   */
  return (
    <li>
      <input type="checkbox" checked={checked} onChange={onToggle} />
      {name}
    </li>
  );
}

export default GroceryItem;
