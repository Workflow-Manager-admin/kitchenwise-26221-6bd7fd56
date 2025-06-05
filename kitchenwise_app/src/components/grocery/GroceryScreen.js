// Refactored to use GroceryListContext for state management!
import React, { useState } from "react";
import GroceryList from "./GroceryList";
import { useGroceryList } from "./GroceryListContext";

// PUBLIC_INTERFACE
/**
 * GroceryScreen manages the grocery list state and persistence.
 *
 * Provides:
 * - Add item input
 * - Links to GroceryList component for list, check, and delete logic
 */
function GroceryScreen() {
  // Now uses context!
  const [input, setInput] = useState("");
  const {
    items,
    addItem,
    toggleItem,
    deleteItem,
    clearList
  } = useGroceryList();

  function handleInputKey(e) {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  function handleAdd() {
    if (input.trim()) {
      addItem(input.trim());
      setInput("");
    }
  }

  function handleClear() {
    if (
      window.confirm(
        "Clear all items from your grocery list? This cannot be undone."
      )
    ) {
      clearList();
    }
  }

  return (
    <section style={{ paddingTop: 120, paddingBottom: 72, maxWidth: 480, margin: "auto" }}>
      <h2>Grocery List</h2>

      <form
        style={{ display: "flex", gap: 8, marginBottom: 18, alignItems: "center" }}
        onSubmit={e => {
          e.preventDefault();
          handleAdd();
        }}
        autoComplete="off"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleInputKey}
          placeholder="Add a grocery item"
          aria-label="Add grocery item"
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 6,
            border: "1px solid var(--border-color)",
            fontSize: 16,
            outline: "none",
            background: "var(--base-dark)",
            color: "var(--text-color)"
          }}
        />
        <button
          className="btn"
          type="submit"
          style={{ minWidth: 55, padding: "8px 12px" }}
          aria-label="Add item"
        >
          Add
        </button>
        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: "#ff4949",
              color: "white",
              border: "none",
              borderRadius: 6,
              padding: "8px 12px",
              cursor: "pointer"
            }}
            aria-label="Clear the whole grocery list"
          >
            Clear
          </button>
        )}
      </form>

      <GroceryList
        items={items}
        onToggle={toggleItem}
        onDelete={deleteItem}
      />

      {items.length === 0 && (
        <div style={{ color: "var(--text-secondary)", marginTop: 24 }}>
          <em>Your grocery checklist is empty. Add new items above.</em>
        </div>
      )}
    </section>
  );
}

export default GroceryScreen;
