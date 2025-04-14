import React, { useState } from "react";


import { Link, Outlet } from "react-router-dom";


import { WearNavbar } from "./WearNavbar";

export const WearSidebar = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
        <WearNavbar toggleSidebar={toggleSidebar} />
      <aside
          className={`app-sidebar bg-body-secondary shadow ${
            isSidebarOpen ? "open" : "d-none"
          }`}
          data-bs-theme="dark"
        >

       
     
        <div className="sidebar-brand">
          <a href="/profilee" className="brand-link">
            {/* <img
              src="../../dist/assets/img/AdminLTELogo.png"
              // alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"
            /> */}

            <span className="brand-text fw-light">KRISH JOSHI</span>
          </a>  



          <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        ></div>

        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              </ul>
              <ul className="nav nav-treeview">
                  <li className="nav-item">
                   <Link to="/wear/home" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Home</p>
                      </Link>
                  </li>
                  </ul>
                  <ul className="nav nav-treeview">
                  <li className="nav-item">
                   <Link to="/wear/cart" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>cart</p>
                      </Link>
                  </li>
                  </ul>
              {/* <li className="nav-item menu-open">
                <Link to="addaddress" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    ADD Address
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link> */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                   <Link to="/wear/men" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Men Wear</p>
                      </Link>
                  </li>
                  </ul>


                   
                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="addaddress" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Add product</p>
                    </a>
                  </li>
                  </ul>
                   
                 */}
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                  <Link to="/wear/women" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Women Wear</p>
                    </Link>
                  </li>
                  </ul>
                   
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                  <Link to="/wear/kids" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Kids Wear</p>
                    </Link>
                  </li>
                 </ul>
                 <ul className="nav nav-treeview">
                  <li className="nav-item">
                  <Link to="/wear/myaddress" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Address</p>
                    </Link>
                  </li>
                 </ul>
                 <ul className="nav nav-treeview">
                  <li className="nav-item">
                  <Link to="/wear/orderhistory" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>My order</p>
                    </Link>
                  </li>
                 </ul>
                 <ul className="nav nav-treeview">
                  <li className="nav-item">
                  <Link to="/wear/logout" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Logout</p>
                    </Link>
                  </li>
                  </ul>
            
             
              
            
            {/* </ul> */}
          
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet></Outlet>
      </main>
    </>
  );
};