import React, { useState } from 'react';
import './App.css';

// Layout and screens
import Navbar from "./components/layout/Navbar";
import TabBar from "./components/layout/TabBar";
import HomeScreen from "./components/home/HomeScreen";
import SearchScreen from "./components/search/SearchScreen";
import GroceryScreen from "./components/grocery/GroceryScreen";
import SavedScreen from "./components/saved/SavedScreen";
import { FavoritesProvider } from "./components/saved/FavoritesContext";
import { GroceryListProvider } from "./components/grocery/GroceryListContext";

/**
 * The App component manages the global layout, tab switching, and main navigation.
 */
function App() {
  const [tab, setTab] = useState("Home");

  // Screen selection logic
  // Callback for HomeScreen to trigger search tab
  const handleQuickSearch = () => setTab("Search");

  let ScreenComponent;
  let screenProps = {};
  if (tab === "Home") {
    ScreenComponent = HomeScreen;
    screenProps = { onQuickSearch: handleQuickSearch };
  }
  else if (tab === "Search") ScreenComponent = SearchScreen;
  else if (tab === "Grocery") ScreenComponent = GroceryScreen;
  else if (tab === "Saved") ScreenComponent = SavedScreen;
  else ScreenComponent = HomeScreen;

  return (
    <FavoritesProvider>
      <GroceryListProvider>
        <div className="app">
          <Navbar />
          <main style={{ minHeight: "75vh", paddingBottom: 76 }}>
            <div className="container">
              {/* Pass screenProps only for HomeScreen */}
              <ScreenComponent {...screenProps} />
            </div>
          </main>
          <TabBar currentTab={tab} onTabChange={setTab} />
        </div>
      </GroceryListProvider>
    </FavoritesProvider>
  );
}

export default App;