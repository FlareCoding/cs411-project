import React from 'react';
import './Header.css'; // Importing the CSS file for styles

function Header({ username, email, onLogout }) {
  return (
    <div className="header">
      <div>
        <h2>{username}</h2>
        <p>{email}</p>
      </div>
      <button onClick={onLogout} className="logoutButton">Logout</button>
    </div>
  );
}

export default Header;
