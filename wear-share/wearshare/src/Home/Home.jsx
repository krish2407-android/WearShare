import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(request => {
  console.log('Starting Request:', request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('Response:', response.data);
    return response;
  },
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/getproduct');
        setProducts(response.data?.data || []);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getImageUrl = (product) => {
    return product?.imageURL || "https://placehold.co/300x200?text=No+Image";
  };

  const addToCart = async (product) => {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) return alert('Please login to add items to cart');

      const cartItem = {
        userId,
        productId: product._id,
        quantity: 1,
        price: product.price,
        productname: product.productname,
        imageURL: product.imageURL
      };

      const response = await axios.post('/cart/add', cartItem);
      if (response.data) alert('Product added to cart successfully!');
    } catch (err) {
      alert('Failed to add product to cart.');
    }
  };

  const handleOrderNow = (product) => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    navigate('/wear/detail', {
      state: {
        productImage: product.imageURL,
        productName: product.productname,
        productPrice: product.price,
        productId: product._id
      }
    });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Products List</h2>

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading products...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row g-4">
          {products.length > 0 ? (
            products.map(product => (
              <div className="col-md-4 col-lg-3" key={product._id}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="ratio ratio-4x3">
                    <img
                      src={getImageUrl(product)}
                      onError={(e) => e.target.src = 'https://placehold.co/300x200?text=No+Image'}
                      className="card-img-top object-fit-cover"
                      alt={product.productname}
                      style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{product.productname}</h5>
                    <p className="card-text fw-bold mb-3">₹{product.price}</p>
                    <div className="mt-auto">
                      <button
                        className="btn"
                        style={{
                          backgroundColor: 'rgb(52, 152, 219)',
                          color: 'white',
                          width: '100%',
                          marginBottom: '10px',
                        }}
                        onClick={() => handleOrderNow(product)}
                      >
                        Order Now
                      </button>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: 'rgb(52, 152, 219)',
                          color: 'white',
                          width: '100%',
                        }}
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">No Products Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
