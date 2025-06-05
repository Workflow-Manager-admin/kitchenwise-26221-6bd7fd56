import React from "react";

// PUBLIC_INTERFACE
/**
 * FiltersPanel for dietary/price/sorting filters.
 * Accepts value + onChange for controlled filter state.
 */
function FiltersPanel({ filters, onChange }) {
  const f = filters || {};
  // Handle updates for individual filters
  const onUpdate = obj => {
    if (onChange) onChange({ ...filters, ...obj });
  };

  return (
    <div style={{
      display: "flex",
      gap: 20,
      padding: "10px 0",
      marginBottom: 12,
      flexWrap: "wrap",
      alignItems: "flex-end",
      borderBottom: "1px solid var(--border-color)",
    }}>
      {/* Diet */}
      <div>
        <label style={{ fontSize: 13 }}>Diet</label>
        <select style={{ marginTop: 4, borderRadius: 4, padding: 4 }}
          value={f.diet || "any"}
          onChange={e => onUpdate({ diet: e.target.value })}
        >
          <option value="any">Any</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>
      {/* Price */}
      <div>
        <label style={{ fontSize: 13 }}>Max Cost/Serving</label>
        <input
          type="number"
          min="0"
          step="0.1"
          style={{ width: 70, marginTop: 4, borderRadius: 4, padding: 4 }}
          value={f.maxCost === undefined ? "" : f.maxCost}
          onChange={e => {
            const val = e.target.value;
            onUpdate({ maxCost: val === "" ? undefined : Number(val) });
          }}
          placeholder="$"
        />
      </div>
      {/* Sort */}
      <div>
        <label style={{ fontSize: 13 }}>Sort By</label>
        <select style={{ marginTop: 4, borderRadius: 4, padding: 4 }}
          value={f.sortBy || ""}
          onChange={e => onUpdate({ sortBy: e.target.value })}
        >
          <option value="">Default</option>
          <option value="cost">Cost</option>
          <option value="prep">Prep Time</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
}

export default FiltersPanel;
