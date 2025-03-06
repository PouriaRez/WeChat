import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { OrbitProgress } from "react-loading-indicators";

import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setAuthenticated(localStorage.getItem("authToken") !== null);
        setLoading(false);
      }, 1000);
    }, []);

    if (loading)
      return <OrbitProgress variant="disc" color="#ffffff" size="large" />;

    return authenticated ? <>{element}</> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
