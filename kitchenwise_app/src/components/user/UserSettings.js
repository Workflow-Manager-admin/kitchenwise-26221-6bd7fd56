import React, { useState } from "react";
import { useUserPreferences } from "./UserPreferencesContext";
import CurrencyToggle from "./CurrencyToggle";

// PUBLIC_INTERFACE
function UserSettings({ onClose }) {
  /**
   * User settings/configuration page.
   * Allows editing budget and toggling currency.
   */
  const prefs = useUserPreferences();
  const [budget, setBudget] = useState(prefs.budget);

  function handleBudgetChange(e) {
    const val = parseFloat(e.target.value);
    setBudget(isNaN(val) ? "" : val);
  }

  function handleBudgetBlur() {
    if (typeof budget === "number" && prefs.setBudget) {
      prefs.setBudget(budget);
    }
  }

  return (
    <div
      style={{
        background: "var(--base-dark)",
        color: "var(--text-color)",
        borderRadius: 13,
        maxWidth: 360,
        margin: "48px auto 0 auto",
        boxShadow: "0 4px 20px #0d234066",
        padding: 28,
        position: "relative",
        minHeight: 230,
      }}
      aria-modal={onClose ? true : undefined}
      role={onClose ? "dialog" : undefined}
    >
      <button
        aria-label="Close settings"
        style={{
          position: "absolute",
          right: 12,
          top: 12,
          background: "none",
          border: "none",
          color: "var(--text-secondary)",
          fontSize: 20,
          cursor: "pointer",
        }}
        onClick={() => onClose && onClose()}
        type="button"
      >
        ×
      </button>
      <h3 style={{ marginTop: 4, marginBottom: 16 }}>User Settings</h3>
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
          Max Budget ($/₹ per recipe)
        </label>
        <input
          type="number"
          value={budget}
          min={1}
          step={1}
          onChange={handleBudgetChange}
          onBlur={handleBudgetBlur}
          className="input"
          style={{
            padding: 9,
            borderRadius: 5,
            fontSize: 16,
            border: "1px solid var(--border-color)",
            background: "var(--card-bg)",
            color: "var(--text-color)",
            width: 120,
          }}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>
          Currency
        </label>
        <CurrencyToggle />
      </div>
      <button
        className="btn"
        style={{ marginTop: 18, padding: "9px 14px", borderRadius: 8 }}
        onClick={prefs.resetPreferences}
        type="button"
      >
        Reset to Default
      </button>
    </div>
  );
}

export default UserSettings;
