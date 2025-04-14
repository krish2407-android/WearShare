import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('/order/getproduct');
      if (response.data?.success) {
        setOrders(response.data.data);
      } else {
        toast.error('No orders data received');
        setOrders([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`/shipping/update/${orderId}`, { status: newStatus });
      if (response.data.success) {
        toast.success('Order status updated');
        fetchAllOrders();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Status update failed');
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'ordered':
        return 'badge bg-warning text-dark';
      case 'confirmed':
        return 'badge bg-primary';
      case 'delivered':
        return 'badge bg-success';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">All Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle text-center shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-6)}</td>
                  <td>{order.userId?.firstName || 'N/A'}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <img
                        src={order.ProductId?.imageURL}
                        alt={order.ProductId?.productname}
                        className="rounded"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                      <span>{order.ProductId?.productname}</span>
                    </div>
                  </td>
                  <td>{order.quantity}</td>
                  <td>₹{order.ProductId?.price * order.quantity}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    >
                      <option value="ordered">Ordered</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Order Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6>Order Info</h6>
                  <p><strong>ID:</strong> #{selectedOrder._id.slice(-6)}</p>
                  <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> <span className={getStatusBadge(selectedOrder.status)}>{selectedOrder.status}</span></p>
                </div>

                <div className="mb-3">
                  <h6>Customer</h6>
                  <p><strong>Name:</strong> {selectedOrder.userId?.firstName}</p>
                  <p><strong>Email:</strong> {selectedOrder.userId?.email}</p>
                </div>

                <div className="mb-3 d-flex gap-4 align-items-center">
                  <img
                    src={selectedOrder.ProductId?.imageURL}
                    alt={selectedOrder.ProductId?.productname}
                    className="rounded"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div>
                    <p><strong>Product:</strong> {selectedOrder.ProductId?.productname}</p>
                    <p><strong>Size:</strong> {selectedOrder.size}</p>
                    <p><strong>Qty:</strong> {selectedOrder.quantity}</p>
                    <p><strong>Price:</strong> ₹{selectedOrder.ProductId?.price}</p>
                  </div>
                </div>

                <div>
                  <h6>Shipping Info</h6>
                  <p><strong>Address:</strong> {selectedOrder.addressId?.addressURL || 'N/A'}</p>
                  <p><strong>Pincode:</strong> {selectedOrder.addressId?.pincode || 'N/A'}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
