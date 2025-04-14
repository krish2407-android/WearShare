import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// import './BuyPage.css'; // Assuming you have a CSS file for styling

export const BuyPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [order, setOrder] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        productName: "",
        quantity: 1,
        paymentMethod: "COD",
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = localStorage.getItem('id');
                // Access productId directly from location state
                const productId = location.state?._id;

                console.log('User ID:', userId);
                console.log('Product ID:', productId);

                if (!userId) {
                    console.error('Please login to continue');
                    navigate('/login');
                    return;
                }

                if (!productId) {
                    console.error('Product details not found');
                    navigate('/');
                    return;
                }

                const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
                const productResponse = await axios.get(`http://localhost:5000/api/products/${productId}`);
                
                setOrder(prevOrder => ({
                    ...prevOrder,
                    email: userResponse.data.email,
                    phone: userResponse.data.phone,
                    productName: productResponse.data.name
                }));
            } catch (error) {
                console.error('Error fetching user or product details:', error);
                toast.error('Error loading details. Please try again.');
            }
        };

        fetchUserDetails();
    }, [location.state, navigate]);

    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order Placed:", order);
        navigate("/order-success"); // Redirect to order success page
    };

    return (
        <div className="container">
            <h2>Buy Now</h2>
            <form onSubmit={handleSubmit} className="buy-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={order.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={order.email}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={order.phone}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={order.productName}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={order.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Payment Method</label>
                    <select name="paymentMethod" value={order.paymentMethod} onChange={handleChange}>
                        <option value="COD">Cash on Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Buy Now</button>
            </form>
        </div>
    );
}

export default BuyPage;

   