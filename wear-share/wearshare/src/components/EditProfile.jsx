import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

export const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem('id');
            if (!userId) {
                toast.error('Please login to edit profile');
                navigate('/login');
                return;
            }

            const response = await axios.get(`/wear/getuser/${userId}`);
            if (response.data && response.data.data) {
                const userData = response.data.data;
                setFormData({
                    name: userData.name || '',
                    email: userData.email || '',
                    phone: userData.phone || ''
                });
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load profile data');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('id');
            const response = await axios.put(`/wear/updateuser/${userId}`, formData);
            
            if (response.data.success) {
                toast.success('Profile updated successfully');
                navigate('/profilee');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    if (loading) {
        return <div className="edit-profile-loading">Loading profile...</div>;
    }

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-card">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="form-actions">
                        <button 
                            type="submit" 
                            className="save-profile-btn"
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={() => navigate('/profilee')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile; 