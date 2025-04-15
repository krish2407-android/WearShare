import axios from "axios";
import { useForm } from 'react-hook-form';
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000
});

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axiosInstance.post("/wearsLogin", data);

      if (res.status === 200 && res.data?.data) {
        toast.success('Login successful!', {
          position: "top-center",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
       console.log(res)
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("name", res.data.data.firstName);

        if (res.data.data.roleId.role === "user") {
          navigate("/wear/home");
        } else if (res.data.data.roleId.name === "Admin") {
          navigate("/user");
        }
      }
    } catch (err) {
      toast.dismiss();
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      console.error("Login error:", err);
    }
  };

  const validationSchema = {
    email: {
      required: { value: true, message: "Please input the email*" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format"
      }
    },
    password: {
      required: { value: true, message: "Please input the password" },
      minLength: { value: 6, message: "Password must be at least 6 characters" }
    },
    check: {
      required: { value: true, message: "Please check this box" }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url('/src/assets/login-bg.jpg')`, // replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <ToastContainer />
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "400px", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", validationSchema.email)}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", validationSchema.password)}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className={`form-check-input ${errors.check ? "is-invalid" : ""}`}
              {...register("check", validationSchema.check)}
            />
            <label className="form-check-label">Remember me</label>
            <div className="invalid-feedback d-block">{errors.check?.message}</div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>

          <div className="text-center mt-3">
            <a href="/wear" className="d-block text-decoration-none">← Back To Home</a>
            <span className="d-block mt-2">Don't have an account?</span>
            <a href="http://localhost:5173/signup" className="text-decoration-none me-2">Register Here</a>
            <a href="http://localhost:5173/forgot" className="text-decoration-none">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};
