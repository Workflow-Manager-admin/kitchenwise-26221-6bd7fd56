import React from "react";

// PUBLIC_INTERFACE
function HomeScreen() {
  /**
   * Home screen entry point: Quick search, recent recipes.
   */
  return (
    <section style={{ paddingTop: 120, paddingBottom: 72 }}>
      <h2>Home</h2>
      <p>Welcome to KitchenWise! Start a quick search or browse your recent recipes.</p>
    </section>
  );
}

export default HomeScreen;
