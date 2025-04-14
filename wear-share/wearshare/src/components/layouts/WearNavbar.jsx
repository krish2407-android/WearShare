import React from "react";
// import "./WearNavbar.css";
// import "../../components/user/WearSidebar.css";
import "../../components/WearNavbar.css";
import hamburgermenu from "../../../src/assets/hamburgermenu.png";


export const WearNavbar = ({ toggleSidebar }) => {
  const handleToggle = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    toggleSidebar();
  };

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      {/*begin::Container*/}
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="nav-link btn btn-light"
              type="button"
              style={{
                color: "black",
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                background: "none",
                cursor: "pointer"
              }}
              onClick={handleToggle}
            >
              <img src={hamburgermenu} style={{height:"25px",width:"25px"}} alt="menu" />
            </button>
          </li>
         <li className="nav-item d-none d-md-block">
            <a href="/wear/home" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="/wear/men" className="nav-link">
              Men
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="#">Shirts</a>
              </li>
              <li>
                <a href="#">T-Shirts</a>
              </li>
              <li>
                <a href="#">Jeans</a>
              </li>
              <li>
                <a href="#">Jackets</a>
              </li>
            </ul>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="/wear/women" className="nav-link">
              Women
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="/wear/kids" className="nav-link">
              Kids
            </a>
          </li>
        
      

        {/* Right-aligned login/signup */}
        
        </ul>

        {/* <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            ><ul className="navbar-nav ms-auto">
            <li className="nav-item d-none d-md-block">
             <a href="/login" className="nav-link">
                Login
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <a href="/signup" className="nav-link">
                Signup
              </a>
            </li>
         </ul>
              <i className="bi bi-search" />
            </a>
          </li>
          </ul>
       */}
        
        
  
  
      {/* begin::Container */}
    
          
          {/* <li className="nav-item d-none d-md-block">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="/men" className="nav-link">
              Men
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="#">Shirts</a>
              </li>
              <li>
                <a href="#">T-Shirts</a>
              </li>
              <li>
                <a href="#">Jeans</a>
              </li>
              <li>
                <a href="#">Jackets</a>
              </li>
            </ul>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="/women" className="nav-link">
              Women
            </a>
          </li>
          <li className="nav-item d-none d-md-block">
            <a href="/kids" className="nav-link">
              Kids
            </a>
          </li>
        
       */}

        {/* Right-aligned login/signup */}
         {/* <ul className="navbar-nav ms-auto">
           <li className="nav-item d-none d-md-block">
            <a href="/login" className="nav-link">
               Login
             </a>
           </li>
           <li className="nav-item d-none d-md-block">
             <a href="/signup" className="nav-link">
               Signup
             </a>
           </li>
        </ul> */}
      </div>
    </nav>
  );
};