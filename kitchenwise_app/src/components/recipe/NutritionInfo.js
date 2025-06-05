import React from "react";

/**
 * NutritionInfo - display nutrition breakdown if available.
 *
 * Props:
 *   - nutrition: { calories, protein, fat, carbs, ... } OR array/list of nutrients
 */
// PUBLIC_INTERFACE
function NutritionInfo({ nutrition }) {
  if (!nutrition) {
    return (
      <div>
        <small style={{ color: "var(--text-secondary)" }}>Nutrition info not available.</small>
      </div>
    );
  }

  // If object map
  if (typeof nutrition === "object" && !Array.isArray(nutrition)) {
    const keys = Object.keys(nutrition);
    if (keys.length === 0) {
      return <div>
        <small style={{ color: "var(--text-secondary)" }}>Nutrition info not available.</small>
      </div>;
    }
    return (
      <table style={{
        width: "100%",
        maxWidth: 330,
        marginTop: 7,
        background: "rgba(0,255,255,0.04)",
        borderRadius: 8,
        fontSize: 14,
        color: "var(--text-color)",
        borderCollapse: "collapse"
      }}>
        <tbody>
          {keys.map(k =>
            <tr key={k}>
              <td style={{ paddingRight: 18, paddingLeft: 5, borderBottom: "1px solid var(--border-color)" }}>{k.charAt(0).toUpperCase() + k.slice(1)}</td>
              <td style={{ borderBottom: "1px solid var(--border-color)", textAlign: "right", fontWeight: 500 }}>
                {nutrition[k]}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  // If array of { title | name, amount }
  if (Array.isArray(nutrition) && nutrition.length > 0) {
    return (
      <table style={{
        width: "100%",
        maxWidth: 330,
        marginTop: 7,
        background: "rgba(0,255,255,0.04)",
        borderRadius: 8,
        fontSize: 14,
        color: "var(--text-color)",
        borderCollapse: "collapse"
      }}>
        <tbody>
          {nutrition.map((item, idx) =>
            <tr key={item.title || item.name || idx}>
              <td style={{ paddingRight: 14, paddingLeft: 5, borderBottom: "1px solid var(--border-color)" }}>
                {item.title || item.name}
              </td>
              <td style={{ borderBottom: "1px solid var(--border-color)", textAlign: "right", fontWeight: 500 }}>
                {item.amount} {item.unit || ""}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <small style={{ color: "var(--text-secondary)" }}>Nutrition info not available.</small>
    </div>
  );
}

export default NutritionInfo;
