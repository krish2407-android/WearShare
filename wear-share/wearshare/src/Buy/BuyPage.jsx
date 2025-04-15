import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BuyPage = () => {
  const location = useLocation();
//   const { ProductId, OrderId, status, orderData } = location.state || {};
  const { register, handleSubmit, formState: { errors } } = useForm();


  const [product, setproduct] = useState(ProductId)

  // 🔍 Debug: Print the values to console

  
  useEffect(() => {
    console.log("ProductId", product);
    console.log("OrderId", OrderId);
    // console.log("Order Data", orderData);
  }, [ProductId, OrderId, orderData]);

  const onSubmit = async (data) => {
    try {
      const paymentInfo = {
        OrderId,
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentMethod === "Online" ? "Paid" : "Pending",
      };

      await axios.post('/buy/addbuy', paymentInfo);
      toast.success("✅ Payment info added successfully", { autoClose: 3000 });
    } catch (error) {
      toast.error("❌ Payment failed", { autoClose: 3000 });
    }
  };

  if (!ProductId || !OrderId) {
    return (
      <div className="container py-5 text-center">
        <ToastContainer />
        <h4 className="text-danger">❌ No product or order found!</h4>
        <p>Please go back and try placing the order again.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <img src={ProductId?.imageURL} className="img-fluid mb-3" alt={ProductId?.productname} />
            <h5>{ProductId?.productname}</h5>
            <p>Price: ₹{ProductId?.price}</p>
            <p>Status: <span className="badge bg-success">{status || "Ordered"}</span></p>
            <p>Quantity: {orderData?.quantity || '-'}</p>
            <p>Size: {orderData?.size || '-'}</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4">
            <h5>Select Payment Method</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select
                  className="form-select"
                  {...register("paymentMethod", { required: "Please select a payment method" })}
                >
                  <option value="">Choose...</option>
                  <option value="COD">Cash on Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
                {errors.paymentMethod && <div className="text-danger">{errors.paymentMethod.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100">Confirm Payment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
