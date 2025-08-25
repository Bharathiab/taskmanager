import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register/Register";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login/Login";
import Tasks from "./components/pages/Tasks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
