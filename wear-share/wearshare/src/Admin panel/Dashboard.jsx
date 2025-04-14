import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUserShield,
} from "react-icons/fa";

export const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0 });
  const [orders, setOrders] = useState([]);
  const [Admin, setAdmin] = useState([]);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const res = await axios.get("/wear");
    setStats(res.data.data);

    const res2 = await axios.get("/order/getproduct");
    setOrders(res2.data.data);

    const res3 = await axios.get("/admin/getAdmin");
    setAdmin(res3.data.data);
  };

  const totalRevenue = orders.reduce((total, order) => {
    const price = order?.ProductId?.price || 0;
    const quantity = order?.quantity || 1;
    return total + price * quantity;
  }, 0);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="text-primary fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Here’s a quick overview of your platform</p>
      </div>

      <div className="row g-4">
        {/* Total Users */}
        <div className="col-md-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted">Total Users</h6>
                <h3 className="text-primary">{stats.length}</h3>
                <p className="text-muted small mb-0">Registered users</p>
              </div>
              <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3">
                <FaUsers size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="col-md-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted">Total Orders</h6>
                <h3 className="text-success">{orders.length}</h3>
                <p className="text-muted small mb-0">Orders received</p>
              </div>
              <div className="bg-success bg-opacity-10 text-success rounded-circle p-3">
                <FaShoppingCart size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="col-md-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted">Total Revenue</h6>
                <h3 className="text-warning">₹{totalRevenue.toFixed(2)}</h3>
                <p className="text-muted small mb-0">Revenue generated</p>
              </div>
              <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-3">
                <FaMoneyBillWave size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Total Admins */}
        <div className="col-md-3">
          <div className="card shadow border-0 h-100">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted">Total Admins</h6>
                <h3 className="text-info">{Admin.length}</h3>
                <p className="text-muted small mb-0">Admins onboard</p>
              </div>
              <div className="bg-info bg-opacity-10 text-info rounded-circle p-3">
                <FaUserShield size={28} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
