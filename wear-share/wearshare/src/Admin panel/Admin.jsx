import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const Admin = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      data.roleId = "67bd4378dee14e50d2a2a067";
      setLoading(true);
      const response = await axios.post("/admin/addadmin", data);
      if (response.data) {
        toast.success("✅ Admin registered successfully!");
        reset();
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || "❌ Failed to register admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">New Admin Registration</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                {...register("firstname", {
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
                placeholder="Enter full name"
              />
              {errors.firstname && (
                <div className="text-danger">{errors.firstname.message}</div>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                {...register("lastname", {
                  required: "Last name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
                placeholder="Enter last name"
              />
              {errors.lastname && (
                <div className="text-danger">{errors.lastname.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                placeholder="Enter email address"
              />
              {errors.email && (
                <div className="text-danger">{errors.email.message}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                {...register("password", {
                  required: "Password is required"
                })}
                placeholder="Enter password"
              />
              {errors.password && (
                <div className="text-danger">{errors.password.message}</div>
              )}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number"
                  }
                })}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone.message}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registering...
                  </>
                ) : (
                  "Register Admin"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
