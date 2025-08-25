import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Register.css"; // Custom CSS

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setMessage("Registration successful! You are logged in.");
      navigate("/tasks");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Error occurred";
      setMessage(errMsg);
      if (errMsg === "User already exists") {
        setTimeout(() => navigate("/login"), 1000);
      }
    }
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="card register-card shadow-lg p-4">
        <h2 className="text-center mb-4 text-white fw-bold">Create Account</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control input-field"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-light w-100 fw-bold btn-hover"
          >
            Register
          </button>
        </form>
        
        <p className="text-center mt-3 text-white small">
  Already have an account?{" "}
  <Link to="/login" className="text-light text-decoration-underline">
    Login
  </Link>
</p>
      </div>
    </div>
  );
}
