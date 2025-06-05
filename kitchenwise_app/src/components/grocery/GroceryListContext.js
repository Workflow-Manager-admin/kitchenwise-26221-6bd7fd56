import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * GroceryListContext stores the grocery items, persists to localStorage,
 * and provides CRUD actions for manipulating the list.
 */

// Key for localStorage.
const LOCAL_STORAGE_KEY = "kw-grocery";

// Item model: { id, name, checked }
const GroceryListContext = createContext();

// PUBLIC_INTERFACE
export function GroceryListProvider({ children }) {
  // Initialize from localStorage, fallback to empty list.
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // PUBLIC_INTERFACE
  function addItem(name) {
    if (!name?.trim()) return;
    setItems(prev => [
      ...prev,
      {
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        name: name.trim(),
        checked: false
      }
    ]);
  }

  // PUBLIC_INTERFACE (for batch add)
  function addMultipleItems(namesArray) {
    const addable = (namesArray || [])
      .map(str => (typeof str === "string" ? str.trim() : ""))
      .filter(Boolean)
      .filter(n => !items.some(item => item.name.toLowerCase() === n.toLowerCase()));
    if (addable.length === 0) return;
    setItems(prev => [
      ...prev,
      ...addable.map(name => ({
        id: Date.now().toString() + Math.random().toString(16).slice(2),
        name,
        checked: false
      }))
    ]);
  }

  // PUBLIC_INTERFACE
  function toggleItem(id) {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  // PUBLIC_INTERFACE
  function deleteItem(id) {
    setItems(prev => prev.filter(item => item.id !== id));
  }

  // PUBLIC_INTERFACE
  function clearList() {
    setItems([]);
  }

  // PUBLIC_INTERFACE
  function setChecked(id, checked) {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !!checked } : item
      )
    );
  }

  // PUBLIC_INTERFACE
  function hasIngredient(name) {
    return items.some(item => item.name.trim().toLowerCase() === name.trim().toLowerCase());
  }

  // Expose API
  const value = {
    items,
    addItem,
    addMultipleItems,
    toggleItem,
    deleteItem,
    clearList,
    setChecked,
    hasIngredient
  };

  return (
    <GroceryListContext.Provider value={value}>
      {children}
    </GroceryListContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useGroceryList() {
  return useContext(GroceryListContext);
}
