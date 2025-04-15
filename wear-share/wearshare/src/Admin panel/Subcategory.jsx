import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000,
});

export const Subcategory = () => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!subcategoryName.trim()) {
      newErrors.subcategoryName = 'Subcategory name is required';
    }
    if (!category) {
      newErrors.category = 'Category is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post('/subcategory/addsubcategory', {
        name: subcategoryName,
        
        CategoryId:category
      });
       console.log(response)
      if (response.status === 201) {
        toast.success('✨ Subcategory added successfully!');
        setSubcategoryName('');
        setCategory('');
        setErrors({});
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        'Failed to add subcategory. Please try again.';
      toast.error(`❌ ${errorMessage}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Add Subcategory</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="subcategoryName" className="form-label">
              Subcategory Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.subcategoryName ? 'is-invalid' : ''}`}
              id="subcategoryName"
              value={subcategoryName}
              onChange={(e) => setSubcategoryName(e.target.value)}
              placeholder="Enter subcategory name"
            />
            {errors.subcategoryName && (
              <div className="invalid-feedback">{errors.subcategoryName}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="67d04fed96da78132a68c962">Men</option>
              <option value="67d0500396da78132a68c966">Women</option>
              <option value="67d04ff796da78132a68c964">Kids</option>
            </select>
            {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!subcategoryName.trim() || !category}
          >
            Add Subcategory
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
