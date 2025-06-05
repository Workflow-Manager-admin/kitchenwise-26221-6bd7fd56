import React from "react";

// A set of royalty-free, kitchen-themed hero/banner image URLs.
// Unsplash attributions (can be further referenced if needed in assets).
const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    alt: "Kitchen countertop with fresh food ingredients, top-down - Photo by Jason Briscoe/Unsplash"
  },
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh vegetables, chef's hands, kitchen prep - Photo by Louis Hansel/Unsplash"
  }
];

// PUBLIC_INTERFACE
function HomeScreen() {
  /**
   * Home screen entry point: Quick search, recent recipes.
   * Enhanced with hero/banner, kitchen visuals, brand tagline, CTA.
   */

  // Pick one hero randomly for visual freshness
  const hero = HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];

  return (
    <section className="hero-banner">
      {/* Banner Image */}
      <div className="hero-img-wrapper">
        <img
          className="hero-img"
          src={hero.url}
          alt={hero.alt}
          draggable={false}
        />
        {/* Optional overlaid brandmark */}
        <div className="hero-overlay">
          <div className="hero-brand-logo">
            <span role="img" aria-label="chef's hat" className="hero-logo-emoji">👨‍🍳</span>
            <span className="hero-app-name">KitchenWise</span>
          </div>
        </div>
      </div>
      {/* Text and CTA */}
      <div className="hero-content">
        <div className="subtitle" style={{ marginBottom: 6 }}>
          The Smarter Way to Cook at Home
        </div>
        <h1 className="title" style={{ margin: "0 0 11px 0" }}>
          Discover Tasty, Affordable Recipes<br />
          With Ingredients You Already Have
        </h1>
        <div className="description">
          KitchenWise helps you spend less & eat better.<br />
          Find hundreds of easy, budget-friendly recipes using what&apos;s in your kitchen—
          just enter your ingredients and start cooking!
        </div>
        <a
          href="#"
          className="btn btn-large hero-cta"
          style={{ marginTop: 18 }}
          onClick={e => {
            if (typeof (typeof onQuickSearch !== "undefined" && onQuickSearch) === "function") {
              e.preventDefault();
              onQuickSearch();
            } else {
              // fallback, do nothing or just prevent scroll
              e.preventDefault();
            }
          }}
        >
          🔎 Start a Quick Search
        </a>
        <div className="hero-note" style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          marginTop: 20
        }}>
          <span role="img" aria-label="spices">🥄</span> Fresh, kitchen-inspired, and free!
        </div>
      </div>
    </section>
  );
}

export default HomeScreen;
