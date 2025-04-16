import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThankYou = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Trigger confetti animation
        const confetti = document.querySelector('.confetti');
        if (confetti) {
            confetti.style.animation = 'confetti 3s ease-out forwards';
        }
    }, []);

    return (
        <div className="container py-5">
            <style>
                {`
                    @keyframes confetti {
                        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                    }
                    @keyframes bounceIn {
                        0% { transform: scale(0.3); opacity: 0; }
                        50% { transform: scale(1.05); opacity: 0.8; }
                        70% { transform: scale(0.9); opacity: 0.9; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .thank-you-card {
                        animation: bounceIn 1s ease-out;
                        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                        border-radius: 20px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    }
                    .confetti {
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        background-color: #f00;
                        opacity: 0;
                    }
                    .success-icon {
                        animation: bounceIn 1s ease-out;
                        color: #28a745;
                        font-size: 5rem;
                    }
                    .thank-you-text {
                        animation: fadeIn 1s ease-out 0.5s both;
                    }
                    .button-group {
                        animation: fadeIn 1s ease-out 1s both;
                    }
                `}
            </style>

            <div className="row justify-content-center">
                <div className="col-md-8 text-center position-relative">
                    {/* Confetti Animation */}
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}

                    <div className="thank-you-card p-5">
                        <div className="success-icon mb-4">
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        
                        <div className="thank-you-text">
                            <h2 className="mb-3" style={{ color: '#28a745' }}>Thank You for Shopping!</h2>
                            <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                                Your order has been confirmed and will be delivered to you soon.
                            </p>
                            <div className="mb-4">
                                <i className="bi bi-truck text-primary" style={{ fontSize: '2rem' }}></i>
                                <p className="mt-2">Your order is being processed</p>
                            </div>
                        </div>

                        <div className="button-group">
                            <button 
                                className="btn btn-primary me-2"
                                onClick={() => navigate('/wear/orderhistory')}
                                style={{ padding: '10px 25px', borderRadius: '30px' }}
                            >
                                <i className="bi bi-list-check me-2"></i>
                                View Order History
                            </button>
                            <button 
                                className="btn btn-outline-primary"
                                onClick={() => navigate('/wear/home')}
                                style={{ padding: '10px 25px', borderRadius: '30px' }}
                            >
                                <i className="bi bi-cart me-2"></i>
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou; 