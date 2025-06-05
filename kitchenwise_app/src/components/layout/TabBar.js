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
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "var(--tabbar-bg)",
        borderTop: "1.5px solid var(--border-color)",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 0 4px 0",
        zIndex: 101,
        boxShadow: "var(--shadow-tab)",
        borderRadius: "23px 23px 0 0",
        minHeight: 56
      }}
      className="tabbar"
    >
      {tabs.map(tab => {
        const isActive = currentTab === tab.label;
        return (
          <button
            key={tab.label}
            aria-label={tab.label}
            onClick={() => onTabChange(tab.label)}
            style={{
              background: isActive
                ? "linear-gradient(96deg, #cbffe0 50%, #dcffee 100%)"
                : "none",
              border: "none",
              outline: "none",
              color: isActive ? "#138872" : "var(--text-secondary)",
              fontSize: isActive ? "1.4rem" : "1.19rem",
              fontWeight: isActive ? 700 : 500,
              flex: 1,
              padding: isActive ? "11px 0 7px 0" : "9px 0 6px 0",
              cursor: "pointer",
              borderRadius: "14px",
              margin: "0 2px",
              boxShadow: isActive ? "0 8px 18px #5bffd912" : "none",
              transform: isActive ? "scale(1.08)" : "scale(1)",
              transition: "all .19s cubic-bezier(.86,.03,.41,.98), background .13s"
            }}
            onMouseOver={e => {
              if (!isActive) {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #e7ffe8 30%, #bcfff2 100%)";
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.color = "#079381";
              }
            }}
            onMouseOut={e => {
              if (!isActive) {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }
            }}
          >
            <div>{tab.icon}</div>
            <span style={{
              fontSize: "0.97rem",
              display: "block",
              marginTop: 2,
              fontWeight: isActive ? 600 : 400,
              letterSpacing: ".02em"
            }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default TabBar;
