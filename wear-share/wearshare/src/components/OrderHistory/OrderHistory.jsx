import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchShipping();
  }, []);

  const fetchShipping = async () => {
    const response = await axios.get('/shipping/getshipping');
    setShipping(response.data.data);
  };

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem('id');

      if (!userId) {
        toast.error('Please login to view orders');
        setLoading(false);
        return;
      }

      const response = await axios.get(`/order/getorders/${userId}`);
      if (response.data && response.data.success) {
        const userOrders = response.data.data.filter(order => order.userId === userId);
        setOrders(userOrders.length > 0 ? userOrders : []);
        if (userOrders.length === 0) toast.info("You haven't placed any orders yet");
      } else {
        setOrders([]);
        toast.error('No orders found');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/order/delete/${orderId}`);
      if (response.data.success) {
        toast.success('Order deleted successfully!');
        setOrders(prev => prev.filter(order => order._id !== orderId));
      } else {
        toast.success('Order deleted successfully!');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Error deleting order');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ordered': return '#ffc107';
      case 'confirmed': return '#17a2b8';
      case 'processing': return '#007bff';
      case 'shipped': return '#28a745';
      case 'delivered': return '#6c757d';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="text-center mb-4">🧾 My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const foundShipping = shipping.find(s => s.orderId && s.orderId._id === order._id);
                const status = foundShipping ? foundShipping.status : 'No Shipping Info';
                const price = (order.ProductId?.price || order.price || 0) * order.quantity;

                return (
                  <tr key={order._id}>
                    <td>#{order._id.slice(-6)}</td>
                    <td className="d-flex align-items-center gap-2">
                      <img
                        src={order.ProductId?.imageURL}
                        alt={order.ProductId?.productname}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <span>{order.ProductId?.productname}</span>
                    </td>
                    <td>{order.size}</td>
                    <td>{order.quantity}</td>
                    <td>₹{price}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: getStatusColor(status),
                          fontSize: '0.9rem',
                          padding: '0.5em 1em'
                        }}
                      >
                        {status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(order._id)}
                      >
                        Delete Order
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
