import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state;

    useEffect(() => {
        // Trigger animations
        const elements = document.querySelectorAll('.animate-in');
        elements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.5s ease-out ${index * 0.2}s forwards`;
        });
    }, []);

    if (!orderData) {
        navigate('/wear/home');
        return null;
    }

    const handleConfirmOrder = () => {
        navigate('/wear/thank-you', { state: orderData });
    };

    return (
        <div className="container py-5">
            <style>
                {`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                    @keyframes rotate {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }
                    .success-icon {
                        animation: pulse 2s infinite;
                        color: #28a745;
                    }
                    .card {
                        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                        border-radius: 20px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                        overflow: hidden;
                    }
                    .animate-in {
                        opacity: 0;
                    }
                    .product-image {
                        transition: transform 0.3s ease;
                    }
                    .product-image:hover {
                        transform: scale(1.05);
                    }
                    .delivery-option {
                        transition: all 0.3s ease;
                    }
                    .delivery-option:hover {
                        background-color: #f8f9fa;
                        transform: translateX(5px);
                    }
                `}
            </style>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <div className="text-center mb-4 animate-in">
                                <div className="success-icon mb-3">
                                    <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem' }}></i>
                                </div>
                                <h3 className="text-success">Payment Successful!</h3>
                                <p className="text-muted">Your order has been placed successfully</p>
                            </div>

                            <div className="border rounded p-4 mb-4 animate-in">
                                <h5 className="mb-3">Order Details</h5>
                                <div className="d-flex align-items-center mb-3">
                                    <img 
                                        src={orderData.product?.productImage} 
                                        alt={orderData.product?.productName}
                                        className="img-fluid rounded product-image" 
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                    <div className="ms-3">
                                        <h6 className="mb-1">{orderData.product?.productName}</h6>
                                        <p className="mb-1">Size: {orderData.size}</p>
                                        <p className="mb-1">Quantity: {orderData.quantity}</p>
                                        <h5 className="text-success mb-0">₹{orderData.totalPrice}</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded p-4 mb-4 animate-in">
                                <h5 className="mb-3">Delivery Options</h5>
                                <div className="delivery-option form-check mb-2 p-3 rounded">
                                    <input className="form-check-input" type="radio" name="delivery" id="standard" defaultChecked />
                                    <label className="form-check-label" htmlFor="standard">
                                        <i className="bi bi-truck me-2"></i>
                                        Standard Delivery (3-5 business days)
                                    </label>
                                </div>
                                <div className="delivery-option form-check p-3 rounded">
                                    <input className="form-check-input" type="radio" name="delivery" id="express" />
                                    <label className="form-check-label" htmlFor="express">
                                        <i className="bi bi-lightning-charge me-2"></i>
                                        Express Delivery (1-2 business days)
                                    </label>
                                </div>
                            </div>

                            <div className="text-center animate-in">
                                <button 
                                    className="btn btn-success"
                                    onClick={handleConfirmOrder}
                                    style={{ 
                                        padding: '10px 30px',
                                        borderRadius: '30px',
                                        fontSize: '1.1rem',
                                        boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                                    }}
                                >
                                    <i className="bi bi-check-circle me-2"></i>
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess; 