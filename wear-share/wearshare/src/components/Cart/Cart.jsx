import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { Navigate } from 'react-router-dom';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const userId = localStorage.getItem('id');
            if (!userId) {
                setError('Please login to view cart');
                setIsLoading(false);
                return;
            }

            console.log('Fetching cart for user:', userId);
            const response = await api.get(`/cart/get/${userId}`);
            console.log('Cart response:', response.data);

            if (response.data && response.data.data) {
                setCartItems(response.data.data || []);
            } else {
                setCartItems([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            }
            setError('Failed to load cart items');
            setIsLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const userId = localStorage.getItem('id');
            if (!userId) {
                alert('Please login to remove items from cart');
                return;
            }

            await api.delete(`/cart/delete/${itemId}`);
            setCartItems(cartItems.filter(item => item._id !== itemId));
            alert('Item removed from cart');
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item');
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const userId = localStorage.getItem('id');
            if (!userId) {
                alert('Please login to update cart');
                return;
            }

            await api.put(`/cart/update/${itemId}`, { 
                quantity: newQuantity 
            });
            setCartItems(cartItems.map(item => 
                item._id === itemId ? { ...item, quantity: newQuantity } : item
            ));
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (isLoading) return <div className="cart-loading">Loading cart...</div>;
    if (error) return <div className="cart-error">{error}</div>;

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.imageURL} alt={item.productname} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.productname}</h3>
                                    <p className="item-price">₹{item.price}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                                    </div>
                                    <p className="item-total">Total: ₹{item.price * item.quantity}</p>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Cart Total: ₹{calculateTotal()}</h3>
                    </div>
                </>
            )}
        </div>
    );
}; 