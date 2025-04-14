import React from 'react'
import hamburgermenu from "../../../src/assets/hamburgermenu.png";
import './UserNavbar.css'

export const UserNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className={`navbar ${!isSidebarOpen ? 'navbar-full-width' : ''}`}>
      <button
        className="menu-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        <img src={hamburgermenu} alt="menu" />
      </button>

      <div className="navbar-container">
        <div className="navbar-center">
          <div className="navbar-nav">
            <a href="/" className="nav-item">
              <i className="bi bi-house-door"></i>
              <span>Home</span>
            </a>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-actions">
            <a href="/login" className="action-btn login-btn">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </a>
            <a href="/Signup" className="action-btn signup-btn">
              <i className="bi bi-person-plus"></i>
              <span>Signup</span>
            </a>
          </div>

          <div className="navbar-profile">
            <div className="profile-dropdown">
              <button className="profile-toggle">
                <img 
                  src="/src/assets/img/AdminLTELogo.png" 
                  alt="Profile" 
                  className="profile-image"
                />
                <span className="profile-name">Admin</span>
                <i className="bi bi-chevron-down"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
