import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ViewAddresses.css';

export const ViewAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const userId = localStorage.getItem("id");
      console.log('Fetching addresses for user:', userId);
      
      if (!userId) {
        toast.error('Please login to view addresses');
        navigate('/login');
        return;
      }

      const response = await axios.get(`/address/getalladdress/${userId}`);
      console.log('Address response:', response.data);
      
      if (response.data && response.data.data) {
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to fetch addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        const response = await axios.delete(`/address/delete/${addressId}`);
        if (response.data) {
          toast.success('Address deleted successfully');
          fetchAddresses();
        }
      } catch (error) {
        console.error('Error deleting address:', error);
        toast.error('Failed to delete address');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading addresses...</div>;
  }

  return (
    <div className="addresses-container">
      <h2>My Addresses</h2>
      <button 
        className="add-address-btn"
        onClick={() => navigate('/wear/addaddress')}
      >
        Add New Address
      </button>
      
      {addresses.length === 0 ? (
        <div className="no-addresses">
          <p>No addresses found. Add your first address!</p>
        </div>
      ) : (
        <div className="addresses-grid d-flex flex-wrap">
          {addresses.map((address) => (
            <div key={address._id} className="address-card">
              <div className="address-content">
                {/* <p className="address-name">{address.name}</p> */}
                <p className="address-text">{address.addressURL}</p>
                {/* <p className="address-phone">{address.phone}</p> */}
                {/* <p className="address-text">{address.address}</p> */}
                <p className="address-location">
                  {address.cityId?.name}, {address.stateId?.name}
                </p>
                {/* <p className="address-pincode">Pincode: {address.pincode}</p> */}
              </div>
              <div className="address-actions">
                <button 
                  className="edit-btn"
                  onClick={() => navigate(`/editaddress/${address._id}`)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteAddress(address._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 