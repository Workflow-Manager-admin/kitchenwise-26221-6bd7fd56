import React from "react";
import { useUserPreferences } from "./UserPreferencesContext";

// PUBLIC_INTERFACE
function CurrencyToggle() {
  /**
   * Toggle between currency display (context-backed)
   */
  const { currency, toggleCurrency } = useUserPreferences?.() || {};
  return (
    <button
      className="btn"
      style={{ marginLeft: 8 }}
      onClick={toggleCurrency}
      aria-label="Toggle currency"
      type="button"
    >
      {currency === "₹" ? "₹/ $" : "$/ ₹"}
    </button>
  );
}

export default CurrencyToggle;
