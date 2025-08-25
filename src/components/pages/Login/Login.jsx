import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Login.css"; // Custom CSS

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setMessage("Login successful! 🎉");

      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="card login-card shadow-lg p-4">
        <h2 className="text-center mb-4 text-white fw-bold">Login</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <p className="text-center mt-3 text-white small">
          Don't have an account?{" "}
          <a href="/" className="text-light text-decoration-underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
