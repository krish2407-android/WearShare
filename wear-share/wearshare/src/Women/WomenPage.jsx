import React from 'react';
import { Link } from 'react-router-dom';
import img1 from "../assets/frontend_assets/p_img5.png";
import img2 from "../assets/frontend_assets/p_img13.png";
import img3 from "../assets/frontend_assets/p_img20.png";
import img4 from "../assets/frontend_assets/p_img36.png";

export const WomenPage = () => {
  const products = [
    { id: 1, name: "Classic Fit Trousers", price: 40, image: img1 },
    { id: 2, name: "Chinos", price: 45, image: img2 },
    { id: 3, name: "Formal Trousers", price: 50, image: img3 },
    { id: 4, name: "Cargo Pants", price: 55, image: img4 },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Women’s Wear</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold text-success">₹{product.price}</p>
                <div className="mt-auto">
                  <Link
                    to="/wear/detail"
                    className="btn w-100"    style={{ backgroundColor: '#87CEEB', color: 'white' }}
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
