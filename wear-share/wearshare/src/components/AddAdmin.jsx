import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddAdmin.css';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AddAdmin = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNo: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(null); // Clear any previous errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // First check if server is running
            await axios.get('/wear', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const response = await axios.post('/wears', {
                ...formData,
                role: 'Admin'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                toast.success('Admin user created successfully!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    phoneNo: ''
                });
            }
        } catch (error) {
            console.error('Error creating admin:', error);
            
            if (error.code === 'ERR_NETWORK' || error.message.includes('Failed to fetch')) {
                setError('Unable to connect to the server. Please make sure the backend server is running on port 5000.');
                toast.error('Server connection error. Please check if the backend is running on port 5000.');
            } else {
                setError(error.response?.data?.message || 'Failed to create admin user');
                toast.error(error.response?.data?.message || 'Failed to create admin user');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-admin-container">
            <h2>Add New Admin</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="add-admin-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNo"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Creating Admin...' : 'Add Admin'}
                </button>
            </form>
        </div>
    );
}; 