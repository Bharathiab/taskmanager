import React from "react";
import { useNavigate } from "react-router-dom";
import Tasks from "./Tasks";

function Dashboard() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); 
    navigate("/"); 
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Welcome, {userInfo?.name || "User"}!</h2>
        </div>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Show Tasks */}
      <Tasks />
    </div>
  );
}

export default Dashboard;
