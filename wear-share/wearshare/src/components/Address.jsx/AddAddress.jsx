import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AddAddress = () => {
  const navigate = useNavigate();
  const [states, setstates] = useState([]);
  const [cities, setcities] = useState([]);
  const [areas, setareas] = useState([]);

  const getAllStates = async () => {
    try {
      const res = await axios.get("/state/get");
      setstates(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch states');
    }
  };

  const getCityByStateId = async (id) => {
    try {
      const res = await axios.get("/city/getcitybystate/" + id);
      setcities(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch cities');
    }
  };

  const getAreaByCityId = async (id) => {
    try {
      const res = await axios.get("/area/getareabycity/" + id);
      setareas(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch areas');
    }
  };

  useEffect(() => {
    getAllStates();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        toast.error('Please login to add address');
        navigate('/login');
        return;
      }

      const selectedState = states.find(state => state._id === data.stateId)?.name || '';
      const selectedCity = cities.find(city => city._id === data.cityId)?.name || '';
      const selectedArea = areas.find(area => area._id === data.areaId)?.name || '';

      const addressData = {
        userId: userId,
        address: data.address,
        area: data.areaId,
        city: data.cityId,
        state: data.stateId,
        pincode: data.pincode,
        addressURL: `${data.address}, ${selectedArea}, ${selectedCity}, ${selectedState}, ${data.pincode}`
      };

      const res = await axios.post('/address/add', addressData);
      
      if (res.data) {
        toast.success('Address added successfully!');
        navigate(-1);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add address. Please try again.');
    }
  };

  const validationSchema = {
    address: { required: "Address is required" },
    stateId: { required: "State is required" },
    cityId: { required: "City is required" },
    areaId: { required: "Area is required" },
    pincode: {
      required: "Pincode is required",
      minLength: { value: 6, message: "Pincode must be 6 digits" },
      maxLength: { value: 6, message: "Pincode must be 6 digits" }
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <ToastContainer theme="dark" />
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Add New Address</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3">
            <label className="form-label">Address Line</label>
            <input
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              placeholder="Enter your street address"
              {...register("address", validationSchema.address)}
            />
            {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Select State</label>
            <select
              className={`form-select ${errors.stateId ? "is-invalid" : ""}`}
              {...register("stateId", validationSchema.stateId)}
              onChange={(e) => getCityByStateId(e.target.value)}
            >
              <option value="">-- Select State --</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>{state.name}</option>
              ))}
            </select>
            {errors.stateId && <div className="invalid-feedback">{errors.stateId.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Select City</label>
            <select
              className={`form-select ${errors.cityId ? "is-invalid" : ""}`}
              {...register("cityId", validationSchema.cityId)}
              onChange={(e) => getAreaByCityId(e.target.value)}
            >
              <option value="">-- Select City --</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>
            {errors.cityId && <div className="invalid-feedback">{errors.cityId.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Select Area</label>
            <select
              className={`form-select ${errors.areaId ? "is-invalid" : ""}`}
              {...register("areaId", validationSchema.areaId)}
            >
              <option value="">-- Select Area --</option>
              {areas.map((area) => (
                <option key={area._id} value={area._id}>{area.name}</option>
              ))}
            </select>
            {errors.areaId && <div className="invalid-feedback">{errors.areaId.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="number"
              className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
              placeholder="Enter 6-digit pincode"
              {...register("pincode", validationSchema.pincode)}
            />
            {errors.pincode && <div className="invalid-feedback">{errors.pincode.message}</div>}
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
