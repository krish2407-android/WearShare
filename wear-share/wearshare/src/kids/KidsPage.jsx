import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/frontend_assets/p_img33.png';
import img2 from '../assets/frontend_assets/p_img16.png';
import img3 from '../assets/frontend_assets/p_img14.png';
import img4 from '../assets/frontend_assets/p_img18.png';

export const KidsPage = () => {
  const products = [
    { id: 1, img: img1, title: 'Classic Fit Trousers', price: 40 },
    { id: 2, img: img2, title: 'Chinos', price: 45 },
    { id: 3, img: img3, title: 'Formal Trousers', price: 50 },
    { id: 4, img: img4, title: 'Cargo Pants', price: 55 },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Kid's Wear</h2>
      <div className="row g-4">
        {products.map(product => (
          <div className="col-md-6 col-lg-3" key={product.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="ratio ratio-4x3">
                <img
                  src={product.img}
                  alt={product.title}
                  className="card-img-top object-fit-cover"
                  style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{product.title}</h5>
                <p className="card-text fw-bold mb-3">₹{product.price}</p>
                <div className="mt-auto">
                  <Link
                    to="/wear/detail"
                    className="btn w-100"
                    style={{ backgroundColor: '#87CEEB', color: 'white' }}
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

export default KidsPage;
