import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

export const ProductList = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [imageURL, setimageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedFile = watch("image");

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedFile && selectedFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setimageURL(reader.result);
      reader.readAsDataURL(selectedFile[0]);
    } else {
      setimageURL(null);
    }
  }, [selectedFile]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/product/getproduct");
      setProducts(res.data?.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="text-center mb-4">📦 Product List</h2>

      {isLoading ? (
        <div className="text-center">Loading products...</div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-sm">
                {product.imageURL && (
                  <img 
                    src={product.imageURL} 
                    alt={product.productname}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.productname}</h5>
                  <p className="card-text mb-1"><strong>Price:</strong> ₹{product.price}</p>
                  <p className="card-text mb-3"><strong>Stock:</strong> {product.quantity}</p>
                  <button
                    className="btn btn-danger mt-auto"
                    onClick={async () => {
                      try {
                        if (window.confirm('Are you sure you want to delete this product?')) {
                          await api.delete(`/product/delete/${product._id}`);
                          const updatedProducts = products.filter(p => p._id !== product._id);
                          setProducts(updatedProducts);
                          toast.success("🗑️ Product deleted successfully!");
                        }
                      } catch (error) {
                        toast.error("❌ Failed to delete product. Please try again.");
                      }
                    }}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
