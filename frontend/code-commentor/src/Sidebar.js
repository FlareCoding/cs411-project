import React from 'react';
import './Sidebar.css'; // Ensure the CSS file is correctly linked

function Sidebar({ isOpen, onToggle }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button onClick={onToggle} className="toggleBtn">
        {isOpen ? '>' : '<'} {/* Adjust these symbols as needed */}
      </button>
      <div className="sidebarContent">
        {/* Sidebar content like links, menus, etc. */}
        <p>Menu Item 1</p>
        <p>Menu Item 2</p>
        <p>Menu Item 3</p>
      </div>
    </div>
  );
}

export default Sidebar;
