import React from "react";
import FavoriteList from "./FavoriteList";

// PUBLIC_INTERFACE
function SavedScreen() {
  /**
   * List of favorited recipes, empty state shown if none.
   */
  return (
    <section style={{ paddingTop: 120, paddingBottom: 72 }}>
      <h2>Saved Recipes</h2>
      <FavoriteList />
    </section>
  );
}

export default SavedScreen;
