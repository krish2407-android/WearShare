import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Logout.css';

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all data from localStorage
        localStorage.clear();
        
        // Show success message
        toast.success('Logged out successfully!');
        
        // Redirect to login page
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="logout-btn">
            Logout
        </button>
    );
};

export default Logout; 