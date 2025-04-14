import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Resetpass = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/resetpassword", {
        token,
        password: data.password,
      });

      console.log("Response reset:", res.data);

      toast.success("Password reset successful! You can now log in!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (err) {
      toast.error("Error resetting password", {
        position: "top-center",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Reset password error:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ToastContainer theme="dark" />
      <div className="forget">
        <div className="form-container">
          <h1>RESET PASSWORD</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
              />
            </div>
            <div>
              <input type="submit" className="submit-button" value="Reset" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
