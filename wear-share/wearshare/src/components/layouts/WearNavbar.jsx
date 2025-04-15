import React from "react";
import { Link } from "react-router-dom";
import hamburgermenu from "../../../src/assets/hamburgermenu.png";
import "../../components/WearNavbar.css";

export const WearNavbar = ({ toggleSidebar }) => {
  const handleToggle = (e) => {
    e.preventDefault();
    toggleSidebar();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Sidebar toggle button */}
        <button
          className="btn btn-outline-light me-3"
          onClick={handleToggle}
          style={{ border: "none", background: "transparent" }}
        >
          <img
            src={hamburgermenu}
            alt="Menu"
            style={{ height: "25px", width: "25px" }}
          />
        </button>

        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/wear/home">
  WearShare
</Link>

        {/* Toggler for responsive navbar */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#wearNavbarContent"
          aria-controls="wearNavbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="wearNavbarContent">
          {/* Left nav */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/wear/home" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wear/men" className="nav-link text-white">
                Men
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wear/women" className="nav-link text-white">
                Women
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/wear/kids" className="nav-link text-white">
                Kids
              </Link>
            </li>
          </ul>

          {/* Optional right nav */}
          {/* <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link text-white">
                Signup
              </Link>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
};
