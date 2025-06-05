import React, { useState, useEffect } from "react";
import GroceryList from "./GroceryList";

// PUBLIC_INTERFACE
/**
 * GroceryScreen manages the grocery list state and persistence.
 *
 * Provides:
 * - Add item input
 * - Links to GroceryList component for list, check, and delete logic
 */
function GroceryScreen() {
  // Load initial list from localStorage
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("kw-grocery");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [input, setInput] = useState("");

  // Keep localStorage in sync whenever items change
  useEffect(() => {
    localStorage.setItem("kw-grocery", JSON.stringify(items));
  }, [items]);

  // PUBLIC_INTERFACE
  function addItem(text) {
    const value = (text || input).trim();
    if (!value) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(16).slice(2), // simple unique
        name: value,
        checked: false,
      },
    ]);
    setInput("");
  }

  // PUBLIC_INTERFACE
  function toggleItem(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  // PUBLIC_INTERFACE
  function deleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  // PUBLIC_INTERFACE
  function clearList() {
    if (
      window.confirm(
        "Clear all items from your grocery list? This cannot be undone."
      )
    ) {
      setItems([]);
    }
  }

  // PUBLIC_INTERFACE
  function handleInputKey(e) {
    if (e.key === "Enter") {
      addItem();
    }
  }

  return (
    <section style={{ paddingTop: 120, paddingBottom: 72, maxWidth: 480, margin: "auto" }}>
      <h2>Grocery List</h2>

      <form
        style={{ display: "flex", gap: 8, marginBottom: 18, alignItems: "center" }}
        onSubmit={e => {
          e.preventDefault();
          addItem();
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
            onClick={clearList}
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
