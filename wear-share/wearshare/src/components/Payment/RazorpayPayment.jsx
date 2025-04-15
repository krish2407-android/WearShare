import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RazorpayPayment = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (error) {
      toast.error('Failed to fetch order details');
      navigate('/');
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Check if user is logged in
      const userId = localStorage.getItem('id');
      if (!userId) {
        toast.error('Please login to continue');
        navigate('/login');
        return;
      }

      // Load Razorpay SDK
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error('Failed to load payment gateway');
        return;
      }

      // For testing, we'll create a dummy order ID
      const dummyOrderId = `order_${Date.now()}`;

      // Configure Razorpay options for test mode
      const options = {
        key: "rzp_test_1DP5mmOlF5G5ag", // Test key
        amount: orderDetails.amount * 100, // amount in paisa
        currency: "INR",
        name: "WearShare",
        description: `Order #${orderId}`,
        order_id: dummyOrderId,
        handler: async (response) => {
          try {
            // For testing, we'll simulate a successful payment
            toast.success('Payment successful! (Test Mode)');
            navigate('/orders');
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: localStorage.getItem('name') || 'Test User',
          email: localStorage.getItem('email') || 'test@example.com',
          contact: localStorage.getItem('phone') || '9999999999'
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled');
          }
        }
      };

      // Create Razorpay instance and open payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      toast.error('Payment initialization failed');
    } finally {
      setLoading(false);
    }
  };

  if (!orderDetails) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Payment Details (Test Mode)</h2>
          
          <div className="order-details mb-4">
            <div className="row">
              <div className="col-md-6">
                <p><strong>Order ID:</strong> {orderId}</p>
                <p><strong>Amount:</strong> ₹{orderDetails.amount}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Status:</strong> {orderDetails.status}</p>
              </div>
            </div>
          </div>

          <div className="alert alert-info">
            <strong>Note:</strong> This is a test payment. Use any test card details to proceed.
          </div>

          <div className="d-grid gap-2">
            <button 
              className="btn btn-primary"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RazorpayPayment; 