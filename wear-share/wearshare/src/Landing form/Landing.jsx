import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main Content */}
      <main className="flex-grow-1">
        <div>
          {/* Hero Section */}
          <section className="text-center py-5 bg-primary text-white rounded my-4 mx-3">
            <h1 className="display-4 fw-bold mb-3">👚 Welcome to Wear-Share</h1>
            <p className="lead mb-4">Share fashion. Borrow style. Connect through clothes.</p>
            <div className="d-flex justify-content-center flex-wrap gap-3">
              <Link to="/login" className="btn btn-light text-primary btn-lg px-4 fw-semibold">Get Shopping</Link>
              <Link to="/signup" className="btn btn-outline-light btn-lg px-4">Learn More</Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="mx-3 mb-5">
            <h2 className="text-center mb-5 fw-bold">Why Choose Wear-Share?</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card shadow-sm border-0 text-center h-100">
                  <div className="card-body">
                    <div className="display-3 mb-3">🚚</div>
                    <h5 className="fw-bold">Fast Exchange</h5>
                    <p className="text-muted mb-0">Swap or borrow fashion items in your neighborhood quickly and easily.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 text-center h-100">
                  <div className="card-body">
                    <div className="display-3 mb-3">👗</div>
                    <h5 className="fw-bold">Stylish Variety</h5>
                    <p className="text-muted mb-0">Discover diverse outfits, styles, and wardrobes from the community.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 text-center h-100">
                  <div className="card-body">
                    <div className="display-3 mb-3">🔒</div>
                    <h5 className="fw-bold">Safe & Secure</h5>
                    <p className="text-muted mb-0">Verified users, secure interactions, and peace of mind guaranteed.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white mt-auto py-4">
  <div className="">
    <div className="row">
      <div className="col-md-4 mb-4">
        <h5 className="fw-bold">Wear-Share</h5>
        <p>Redefining how you dress — one shared outfit at a time.</p>
      </div>
      <div className="col-md-4 mb-4">
        <h5 className="fw-bold">Quick Links</h5>
        <ul className="list-unstyled">
          <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
          <li><Link to="/signup" className="text-white text-decoration-none">Register</Link></li>
        </ul>
      </div>
      <div className="col-md-4 mb-4">
        <h5 className="fw-bold">Contact Us</h5>
        <p>Email: support@wearshare.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>
    </div>
    <div className="text-center border-top pt-3 mt-3">
      <p className="mb-0">&copy; 2024 Wear-Share. All rights reserved.</p>
    </div>
  </div>
</footer>
</div>
  )}