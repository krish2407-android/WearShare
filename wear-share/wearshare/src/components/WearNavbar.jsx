import React from 'react';
import { Link } from 'react-router-dom';
import './WearNavbar.css';

export const WearNavbar = () => {
    return (
        <nav className="wear-navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    WearShare
                </Link>
                
                <div className="navbar-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/products" className="nav-link">Products</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>

                <div className="auth-buttons">
                    <Link to="/login" className="auth-button login-button">Login</Link>
                    <Link to="/signup" className="auth-button signup-button">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
}; 