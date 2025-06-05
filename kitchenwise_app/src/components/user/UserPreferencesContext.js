import React, { createContext, useContext, useState, useEffect } from "react";

// Key for localStorage persistence
const LOCAL_STORAGE_KEY = "kw-user-prefs";

// Defaults
const DEFAULTS = {
  currency: "$",
  budget: 20,
};

const UserPreferencesContext = createContext();

// PUBLIC_INTERFACE
export function UserPreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) return { ...DEFAULTS, ...JSON.parse(stored) };
      return { ...DEFAULTS };
    } catch {
      return { ...DEFAULTS };
    }
  });

  // Sync changes to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  // PUBLIC_INTERFACE
  function setBudget(budget) {
    setPrefs((prev) => ({ ...prev, budget }));
  }

  // PUBLIC_INTERFACE
  function setCurrency(currency) {
    setPrefs((prev) => ({ ...prev, currency }));
  }

  // PUBLIC_INTERFACE
  function toggleCurrency() {
    setPrefs((prev) => ({
      ...prev,
      currency: prev.currency === "$" ? "₹" : "$"
    }));
  }

  // PUBLIC_INTERFACE
  function resetPreferences() {
    setPrefs({ ...DEFAULTS });
  }

  const value = {
    ...prefs,
    setBudget,
    setCurrency,
    toggleCurrency,
    resetPreferences,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}
