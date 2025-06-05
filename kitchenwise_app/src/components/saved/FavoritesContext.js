import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * FavoritesContext stores favorite recipes, persists to localStorage,
 * and provides methods for add/remove/toggle/check favorite state.
 */

// Key for persistence
const LOCAL_STORAGE_KEY = "kw-favorites";

// Shape: { [recipeId]: {id,title,image,tags,...minimal} }
const FavoritesContext = createContext();

// PUBLIC_INTERFACE
export function FavoritesProvider({ children }) {
  // Internal state: Use an object { [id]: recipeSummary }
  const [favorites, setFavorites] = useState(() => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // PUBLIC_INTERFACE
  function addFavorite(recipe) {
    if (!recipe?.id) return;
    setFavorites((fav) => ({
      ...fav,
      [recipe.id]: {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        tags: recipe.tags,
      },
    }));
  }

  // PUBLIC_INTERFACE
  function removeFavorite(recipeId) {
    setFavorites((fav) => {
      const next = { ...fav };
      delete next[recipeId];
      return next;
    });
  }

  // PUBLIC_INTERFACE
  function toggleFavorite(recipe) {
    if (!recipe?.id) return;
    if (favorites[recipe.id]) removeFavorite(recipe.id);
    else addFavorite(recipe);
  }

  // PUBLIC_INTERFACE
  function isFavorite(recipeId) {
    return !!favorites[recipeId];
  }

  // PUBLIC_INTERFACE
  function getFavoritesList() {
    // Return as array for list rendering
    return Object.values(favorites);
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoritesList,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useFavorites() {
  return useContext(FavoritesContext);
}
