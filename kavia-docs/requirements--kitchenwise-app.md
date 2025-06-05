# KitchenWise Main Container: Requirements & Architectural Specification

## 1. Overview

KitchenWise (codename: SmartChef) is a mobile-friendly web app designed to help users discover affordable recipes based on ingredients they have at home. It allows ingredient input (manual and voice), retrieves recipes from public APIs (Spoonacular/Edamam), offers a grocery list builder, recipe favoritism, and supports budgeting and localization. The app emphasizes a bright, clean, kitchen-inspired design and is intended to be straightforward for both developers and end-users.

---

## 2. Product/Feature Requirements

### 2.1 Ingredient Input
- Users can enter ingredients either manually through a text field or via voice input.
- Recently used ingredients are displayed for quick selection or one-tap addition.

### 2.2 Recipe Search & Results
- Recipes retrieved from Spoonacular and/or Edamam APIs, filtered by:
    - Available ingredients (as input).
    - Budget constraint max (user-defined).
    - Dietary filters (e.g., vegetarian, vegan).
- Results are displayed as cards, showing:
    - Image, title, prep time, cost per serving, veg/vegan tags.
    - Sorting/filtering by price, time, or rating.
- Users can tap on a card for detailed view.

### 2.3 Recipe Detail Page
- Presents step-by-step preparation instructions.
- Shows estimated cost and optional nutritional breakdown.
- Easy access to add missing ingredients to grocery list.

### 2.4 Grocery List Builder
- Users can add missing ingredients from recipes or input their own items.
- Provides interactive checklist (items can be checked off or swiped to delete).

### 2.5 User Options & Personalization
- Users can save or favorite recipes for quick access on future visits.
- Settings page includes:
    - Max budget toggle.
    - Currency switch (₹/INR or $/USD).
- Recents/favorites accessible from navigation.

### 2.6 UI & Navigation
- Utilizes bottom tab navigation, inspired by mobile-first design. Four main tabs:
    1. **Home** – Quick search, recently viewed recipes
    2. **Search** – Ingredient input and discovery
    3. **Grocery** – Grocery list builder/manager
    4. **Saved** – Favorited or bookmarked recipes
- Recipe cards feature kitchen-inspired highlights, minimal layout, images, and clean typography.
- Ingredient tags use intuitive icons.

---

## 3. Architectural & Component Structure

### 3.1 Main Tech Stack
- **Frontend Framework:** React (v18+)
- **Languages:** JavaScript ES6+
- **UI:** Pure HTML/CSS (no third-party UI frameworks), custom responsive design
- **State Management:** Local state/React hooks; may use context in future as app grows
- **API Integration:** Fetch calls to Spoonacular/Edamam (to be implemented)
- **Testing:** Uses Jest (setupTests.js included in template)
- **Linting:** ESLint config provided

### 3.2 Component Overview
- **App:** Root component (defined in `src/App.js`) manages branding, theming, navbar, and page routing.
- **Navbar:** Persistent, fixed navigation with logo and primary navigation buttons.
- **Tab Navigation:** Bottom navigation with icons/tabs for Home/Search/Grocery/Saved pages.
- **IngredientInput:** Handles text and voice input, recently-used display.
- **RecipeCard:** Displays summary info for each recipe in results.
- **RecipeDetail:** Full recipe page/modal for detailed instructions and nutrition info.
- **GroceryList:** Displays and manages shopping list, checkboxes, and swipe-to-delete.
- **Settings/UserOptions:** For budget, currency, saved recipes, etc.

> **Note:** At present, only the top-level layout (`App.js`) and visual classes are scaffolded. Functional component decomposition and API integration are future implementation steps.

---

## 4. UI/UX Specifications

### 4.1 Color & Theme

Primary color system is specified in `src/App.css`:
- **Base light:** `#00ffff` (cyan-accent)
- **Base dark:** `#00008b` (deep navy background)
- **Text color:** White (`#ffffff`)
- **Text secondary:** `rgba(255,255,255,0.7)` (subdued)
- **Border color:** Subtle, `rgba(255,255,255,0.1)`

#### Component Style Guide
- Rounded edges, card shadows, clean/modern sans-serif fonts.
- Brand styling reflects a kitchen/fresh-cooking theme: light blue/cyan contrasts over navy canvas.
- Custom buttons, container paddings, and responsive layouts (no external UI library).

### 4.2 Layout

- Navbar fixed top with logo and quick actions.
- Page content vertically stacked, max-width 900px in center, generous padding.
- Responsive and mobile-first: readable, tap-friendly elements, and clean whitespace management.

---

## 5. Technical Dependencies

- **React** (v18.2+)
- **react-dom** (v18.2+)
- **react-scripts** (for build and dev)
- **cross-env** (for environment scripts, dev only)
- **Jest** and `@testing-library/jest-dom` for tests
- **ESLint** for code linting (`eslint.config.mjs`)

> **Note:** No backend/server component is included in this container. Recipe search is envisioned via direct browser fetch to public APIs.

---

## 6. Anticipated Implementation Issues & Open Items

- **API Key Management:** Handling API keys for third-party recipe sources in a client-side React app may need a proxy/server for security.
- **Voice Input:** Implementation of voice input requires browser feature detection and fallbacks.
- **Persistent Data:** Favorites, recent ingredients, and user settings are expected to be stored in localStorage or similar.
- **Currency Localization:** Proper handling of exchange rates or displaying as per user region.
- **Swipe/delete gestures:** For the shopping list, requires custom event handling for mobile browsers.
- **Accessibility:** Ensuring navigation, color contrast, and ingredient entry meets accessibility standards.
- **Testing Coverage:** All core features should eventually have component and integration Jest tests.
- **Component Expansion:** Only a base layout is implemented; all feature components to be built per this specification.

---

## 7. Summary Architecture Diagram

```mermaid
flowchart TD
    A[Navbar/Branding]
    B[Tab Navigation]
    C[Home Page]
    D[Search Page<br/>(Ingredient Input + Results)]
    E[Grocery List Page]
    F[Saved/Recents Page]
    G[Recipe Card]
    H[Recipe Detail]
    I[Settings/Options]
    A-->B
    B-->C
    B-->D
    B-->E
    B-->F
    D-->G
    G-->H
    F-->H
    C-->H
    E-->I
```

---

## 8. References

- App structure, color, and component CSS: `kitchenwise_app/src/App.js`, `kitchenwise_app/src/App.css`
- Template usage notes and developer info: `kitchenwise_app/README.md`
- Main project outline and features: Work item and user-supplied details

---

This document should be treated as the foundational requirements and architecture guideline for KitchenWise developers and stakeholders. Further functional, UI, and API integration details will be specified as each feature is developed.
