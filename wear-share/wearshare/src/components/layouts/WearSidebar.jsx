import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { WearNavbar } from "./WearNavbar";

export const WearSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    try {
      // Check what is stored in localStorage
      const storedUsername = localStorage.getItem("name");
      console.log("Stored Username:", storedUsername); // Log to check if it's being fetched properly
      
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        console.log("No username found in localStorage.");
      }
    } catch (error) {
      console.error("Failed to fetch username from localStorage", error);
    }
  }, []);

  return (
    <>
      <WearNavbar toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        {/* Sidebar */}
        <aside
          className={`bg-dark text-white p-3 shadow h-100 position-fixed ${
            isSidebarOpen ? "d-block" : "d-none"
          }`}
          style={{ width: "250px", minHeight: "100vh" }}
        >
          <div className="sidebar-brand mb-4">
            <Link to="/profilee" className="text-white text-decoration-none fs-4 fw-bold">
              {username || "Welcome"} {/* Display the username if available */}
            </Link>
          </div>

          <nav>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/wear/home" className="nav-link text-white">
                  <i className="bi bi-house me-2"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wear/cart" className="nav-link text-white">
                  <i className="bi bi-cart me-2"></i> Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wear/men" className="nav-link text-white">
                  <i className="bi bi-person me-2"></i> Men Wear
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wear/women" className="nav-link text-white">
                  <i className="bi bi-gender-female me-2"></i> Women Wear
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wear/kids" className="nav-link text-white">
                  <i className="bi bi-emoji-smile me-2"></i> Kids Wear
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wear/myaddress" className="nav-link text-white">
                  <i className="bi bi-geo-alt me-2"></i> My Address
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wear/orderhistory" className="nav-link text-white">
                  <i className="bi bi-clock-history me-2"></i> My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/wear/logout" className="nav-link text-white">
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main
          className="flex-grow-1 p-4 ms-250"
          style={{
            marginLeft: isSidebarOpen ? "250px" : "0px",
            transition: "margin-left 0.3s",
          }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};
