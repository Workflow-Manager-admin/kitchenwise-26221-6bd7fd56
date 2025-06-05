import React from "react";

// PUBLIC_INTERFACE
function TabBar({ currentTab, onTabChange }) {
  /**
   * A simple bottom tab bar for main navigation.
   * Accepts the currentTab (string) and onTabChange (function).
   */
  const tabs = [
    { label: "Home", icon: "🏠" },
    { label: "Search", icon: "🔍" },
    { label: "Grocery", icon: "🛒" },
    { label: "Saved", icon: "⭐" },
  ];
  return (
    <nav style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      background: "var(--base-dark)",
      borderTop: "1px solid var(--border-color)",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "6px 0",
      zIndex: 101
    }}>
      {tabs.map(tab => (
        <button
          key={tab.label}
          aria-label={tab.label}
          onClick={() => onTabChange(tab.label)}
          style={{
            background: "none",
            border: "none",
            color: currentTab === tab.label ? "var(--base-light)" : "var(--text-secondary)",
            fontSize: "1.3rem",
            fontWeight: currentTab === tab.label ? "bold" : "normal",
            flex: 1,
            padding: "6px 0",
            cursor: "pointer",
            outline: "none"
          }}
        >
          <div>{tab.icon}</div>
          <span style={{ fontSize: "0.9rem", display: "block", marginTop: 2 }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default TabBar;
