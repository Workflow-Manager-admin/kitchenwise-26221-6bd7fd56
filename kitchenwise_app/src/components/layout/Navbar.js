import React from "react";

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * Persistent top navigation bar (shows logo, quick actions).
   */
  return (
    <nav className="navbar">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div className="logo">
          <span className="logo-symbol">*</span> KitchenWise
        </div>
        <button className="btn" style={{ minWidth: 96 }}>Settings</button>
      </div>
    </nav>
  );
}

export default Navbar;
