import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem('id');
            if (!userId) {
                toast.error('Please login to view profile');
                navigate('/login');
                return;
            }

            // First try to get user data from localStorage
            const userDataFromStorage = localStorage.getItem('userData');
            if (userDataFromStorage) {
                setUserData(JSON.parse(userDataFromStorage));
                setLoading(false);
                return;
            }

            // If not in localStorage, try to fetch from API
            const response = await axios.get(`/wear/getuser/${userId}`);
            if (response.data && response.data.data) {
                setUserData(response.data.data);
                // Store in localStorage for future use
                localStorage.setItem('userData', JSON.stringify(response.data.data));
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load profile data. Please try again.');
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="profile-loading">Loading profile...</div>;
    }

    if (!userData) {
        return <div className="profile-error">No profile data found</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>My Profile</h2>
                <div className="profile-info">
                    <div className="info-group">
                        <label>Name</label>
                        <p>{userData.name}</p>
                    </div>
                    <div className="info-group">
                        <label>Email</label>
                        <p>{userData.email}</p>
                    </div>
                    <div className="info-group">
                        <label>Phone Number</label>
                        <p>{userData.phone || 'Not provided'}</p>
                    </div>
                    <div className="info-group">
                        <label>Account Created</label>
                        <p>{new Date(userData.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="profile-actions">
                    <button 
                        className="edit-profile-btn"
                        onClick={() => navigate('/editprofile')}
                    >
                        Edit Profile
                    </button>
                    <button 
                        className="change-password-btn"
                        onClick={() => navigate('/changepassword')}
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile; 