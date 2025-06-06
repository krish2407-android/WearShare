import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const productData = location.state;

    const [product, setProduct] = useState(productData);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [totalPrice, setTotalPrice] = useState(productData?.productPrice || 0);

    const quantity = watch("quantity", 1);

    useEffect(() => {
        if (!productData) {
            toast.error('No product selected', { autoClose: 3000 });
            navigate('/wear/home');
        } else {
            setProduct(productData);
            setTotalPrice(productData.productPrice);
        }
    }, [productData, navigate]);

    useEffect(() => {
        if (product) fetchAddresses();
    }, [product]);

    useEffect(() => {
        if (product?.productPrice) {
            setTotalPrice(product.productPrice * quantity);
        }
    }, [quantity, product?.productPrice]);

    const fetchAddresses = async () => {
        try {
            const userId = localStorage.getItem('id');
            if (!userId) {
                toast.error('Please login to view addresses', { autoClose: 3000 });
                navigate('/login');
                return;
            }
            const response = await axios.get(`/address/getalladdress/${userId}`);
            setAddresses(response.data?.data || []);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to load addresses.', { autoClose: 3000 });
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setIsPlacingOrder(true);
            if (!selectedAddress) return toast.error('Please select a delivery address', { autoClose: 3000 });
            if (!product?.productId) return toast.error('Product info missing', { autoClose: 3000 });

            const orderData = {
                userId: localStorage.getItem('id'),
                ProductId: product.productId,
                quantity: data.quantity,
                addressId: selectedAddress,
                size: data.size,
            };

            const response = await axios.post('/order/addorder/', orderData);
            toast.success("🎉 Order placed successfully!", { autoClose: 3000 });

            const shippingData = {
                orderId: response.data.data._id,
                status: "ordered",
                userId: localStorage.getItem('id'),
            };

            await axios.post('/shipping/addshipping', shippingData);
            toast.success("📦 Shipping info added", { autoClose: 3000 });

            // Navigate to payment success page with order details
            navigate("/wear/payment-success", {
                state: {
                    product: product,
                    size: data.size,
                    quantity: data.quantity,
                    totalPrice: totalPrice,
                    orderId: response.data.data._id
                }
            });
        } catch (err) {
            toast.error('❌ Failed to place order. Please try again.', { autoClose: 3000 });
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (!product) return null;

    return (
        <div className="container py-5">
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes slideIn {
                        from { transform: translateX(-20px); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes scaleIn {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.02); }
                        100% { transform: scale(1); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                    .animate-slide-in {
                        animation: slideIn 0.5s ease-out forwards;
                    }
                    .animate-scale-in {
                        animation: scaleIn 0.5s ease-out forwards;
                    }
                    .card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    }
                    .address-card {
                        transition: all 0.3s ease;
                    }
                    .address-card:hover {
                        transform: translateX(5px);
                        background-color: #f8f9fa;
                    }
                    .pay-button {
                        transition: all 0.3s ease;
                        animation: pulse 2s infinite;
                    }
                    .pay-button:hover {
                        transform: scale(1.05);
                    }
                `}
            </style>
            <ToastContainer />
            <div className="row g-5">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0 animate-fade-in">
                        <img
                            src={product?.productImage}
                            alt={product?.productName}
                            className="card-img-top img-fluid"
                        />
                        <div className="card-body">
                            <h4 className="card-title mb-2">{product?.productName}</h4>
                            <h5 className="text-success">₹{product?.productPrice}</h5>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm border-0 p-4 animate-slide-in">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h5 className="mb-3">Order Details</h5>

                            <div className="mb-3 animate-scale-in">
                                <label className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue="1"
                                    {...register("quantity", { required: true, min: 1 })}
                                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                />
                                {errors.quantity && <div className="invalid-feedback">Enter a valid quantity</div>}
                            </div>

                            <div className="mb-3 animate-scale-in">
                                <label className="form-label">Size</label>
                                <select
                                    {...register("size", { required: "Size is required" })}
                                    className={`form-select ${errors.size ? 'is-invalid' : ''}`}
                                >
                                    <option value="">Select size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                                {errors.size && <div className="invalid-feedback">{errors.size.message}</div>}
                            </div>

                            <div className="mb-4">
                                <h6 className="mb-2">Select Delivery Address</h6>
                                {loading ? (
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="spinner-border text-primary" role="status"></div>
                                        <span>Loading addresses...</span>
                                    </div>
                                ) : addresses.length > 0 ? (
                                    <div className="row row-cols-1 g-3">
                                        {addresses.map((address, index) => (
                                            <div className="col" key={address._id}>
                                                <div 
                                                    className={`card p-3 address-card ${selectedAddress === address._id ? 'border-primary' : ''}`}
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    <div className="form-check">
                                                        <input
                                                            type="radio"
                                                            className="form-check-input"
                                                            id={address._id}
                                                            name="deliveryAddress"
                                                            value={address._id}
                                                            checked={selectedAddress === address._id}
                                                            onChange={(e) => setSelectedAddress(e.target.value)}
                                                        />
                                                    </div>
                                                    <p className="mb-1 mt-2"><i className="bi bi-geo-alt-fill me-2"></i>{address.addressURL}</p>
                                                    <small className="text-muted">Pincode: {address.pincode}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="alert alert-warning mt-2 animate-scale-in">
                                        <p>No addresses found.</p>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => navigate('/wear/addaddress', {
                                                state: { from: '/wear/detail', productData: product }
                                            })}
                                        >
                                            <i className="bi bi-plus-lg"></i> Add New Address
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4 animate-scale-in">
                                <h6 className="mb-2">Payment Method</h6>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="cod"
                                        value="cod"
                                        defaultChecked
                                    />
                                    <label className="form-check-label" htmlFor="cod">
                                        Cash on Delivery
                                    </label>
                                </div>
                            </div>

                            <div className="border-top pt-3 mb-4 animate-fade-in">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Total Amount:</h5>
                                    <h4 className="text-success mb-0">₹{totalPrice}</h4>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-success w-100 pay-button" 
                                disabled={isPlacingOrder}
                            >
                                {isPlacingOrder ? (
                                    <span className="d-flex align-items-center justify-content-center">
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Placing Order...
                                    </span>
                                ) : 'Pay Now'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetail;
