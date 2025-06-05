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
import { UserPreferencesProvider } from "./components/user/UserPreferencesContext";
import UserSettings from "./components/user/UserSettings";

/**
 * The App component manages the global layout, tab switching, and main navigation.
 */
function App() {
  const [tab, setTab] = useState("Home");
  const [showSettings, setShowSettings] = useState(false);

  // Callback for HomeScreen to trigger search tab
  const handleQuickSearch = () => setTab("Search");
  // Callback for Navbar to show settings
  const handleShowSettings = () => setShowSettings(true);

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
    <UserPreferencesProvider>
      <FavoritesProvider>
        <GroceryListProvider>
          <div className="app">
            <Navbar onSettings={handleShowSettings} />
            <main style={{ minHeight: "75vh", paddingBottom: 76 }}>
              <div className="container">
                {/* Pass screenProps only for HomeScreen */}
                <ScreenComponent {...screenProps} />
              </div>
            </main>
            <TabBar currentTab={tab} onTabChange={setTab} />
            {showSettings && (
              <div
                style={{
                  position: "fixed",
                  zIndex: 10002,
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  background: "rgba(0,16,31,0.46)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UserSettings onClose={() => setShowSettings(false)} />
              </div>
            )}
          </div>
        </GroceryListProvider>
      </FavoritesProvider>
    </UserPreferencesProvider>
  );
}

export default App;