import React, { useState } from 'react'
import { UserNavbar } from './UserNavbar'
import { Outlet, Link, useLocation } from 'react-router-dom'
// import './UserSidebar.css'

export const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* <UserNavbar toggleSidebar={toggleSidebar} /> */}

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className={`sidebar bg-dark text-white ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="p-3 border-bottom sidebar-header d-flex align-items-center">
            <img
              src="/src/assets/img/AdminLTELogo.png"
              alt="Admin Logo"
              className="sidebar-logo me-2"
            />
            {isSidebarOpen && (
              <div>
                <h5 className="mb-0">Admin Panel</h5>
                <small>Welcome back!</small>
              </div>
            )}
          </div>

          <nav className="p-3 flex-grow-1">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/user" className={`nav-link text-white ${isActive('/user/dashboard') ? 'active' : ''}`}>
                  <i className="bi bi-box-seam me-2"></i> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/subcategory" className={`nav-link text-white ${isActive('/user/subcategory') ? 'active' : ''}`}>
                  <i className="bi bi-grid-3x3-gap me-2"></i> Add Subcategory
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/user/chart" className={`nav-link text-white ${isActive('/user/subcategory') ? 'active' : ''}`}>
                  <i className="bi bi-grid-3x3-gap me-2"></i> chart
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/user/addproduct" className={`nav-link text-white ${isActive('/user/addproduct') ? 'active' : ''}`}>
                  <i className="bi bi-box-seam me-2"></i> Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/productlist" className={`nav-link text-white ${isActive('/user/addproduct') ? 'active' : ''}`}>
                  <i className="bi bi-box-seam me-2"></i> Product List
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/user/addform" className={`nav-link text-white ${isActive('/user/addproduct') ? 'active' : ''}`}>
                  <i className="bi bi-box-seam me-2"></i> Add Productform
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/user/admin" className={`nav-link text-white ${isActive('/user/admin') ? 'active' : ''}`}>
                  <i className="bi bi-person-plus me-2"></i> Add Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/useradmin" className={`nav-link text-white ${isActive('/user/useradmin') ? 'active' : ''}`}>
                  <i className="bi bi-people me-2"></i> Manage Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/adminorder" className={`nav-link text-white ${isActive('/user/adminorder') ? 'active' : ''}`}>
                  <i className="bi bi-cart-check me-2"></i> All Orders
                </Link>
              </li>
              <li className="nav-item mt-auto">
                <Link to="/user/logout" className="nav-link text-danger">
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content flex-grow-1 p-3">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
