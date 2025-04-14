import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

export const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    data.roleId = "67c52d2314431819d347f756";

    try {
      const res = await axios.post('/wears', data);
      toast.success('Registered successfully!', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'light',
        transition: Bounce,
      });
      navigate("/login");
    } catch (err) {
      toast.error('Registration failed. Please try again.', {
        position: 'top-center',
        autoClose: 5000,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  const validationSchema = {
    unameValidator: {
      required: { value: true, message: 'Please input the first name' },
      minLength: { value: 2, message: 'First name must be at least 2 characters' }
    },
    lnameValidator: {
      required: { value: true, message: 'Please input the last name' },
      minLength: { value: 2, message: 'Last name must be at least 2 characters' }
    },
    passValidator: {
      required: { value: true, message: 'Please input the password' },
      minLength: { value: 6, message: 'Password must be at least 6 characters' }
    },
    emailValidator: {
      required: { value: true, message: 'Please input the email' },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Invalid email format'
      }
    },
    phnoValidator: {
      required: { value: true, message: 'Please input the phone number' },
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Phone number must be 10 digits'
      }
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="row g-0">
              {/* Left image side */}
              <div className="col-md-6 d-none d-md-block bg-primary text-white rounded-start text-center p-5">
                <div className="h-100 d-flex flex-column justify-content-center">
                  <h2>Welcome to Wear-Share</h2>
                  <p>Join our fashion community and explore the latest trends!</p>
                  <i className="bi bi-person-plus display-1 mt-3"></i>
                </div>
              </div>

              {/* Right form side */}
              <div className="col-md-6 p-4">
                <h3 className="mb-4 text-center">Create Account</h3>
                <form onSubmit={handleSubmit(submitHandler)}>

                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} {...register('firstName', validationSchema.unameValidator)} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} {...register('lastName', validationSchema.lnameValidator)} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email', validationSchema.emailValidator)} />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password', validationSchema.passValidator)} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className={`form-control ${errors.phoneNo ? 'is-invalid' : ''}`} {...register('phoneNo', validationSchema.phnoValidator)} />
                    <div className="invalid-feedback">{errors.phoneNo?.message}</div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary rounded-pill">Register</button>
                  </div>

                  <p className="mt-3 text-center text-muted">
                    Already registered? <a href="http://localhost:5173/login" className="text-decoration-none">Login here</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
