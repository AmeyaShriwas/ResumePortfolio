import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaEye, FaGithub, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ViewPortfolio = () => {
  const [data, setData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching portfolio data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!data) {
    return <div className="text-center text-light py-5">Loading...</div>;
  }

  return (
    <div style={{ background: "linear-gradient(135deg, #3d5a80, #293241)", minHeight: "100vh", color: "#fff" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark p-3 shadow" style={{ backgroundColor: "#222" }}>
        <span className="navbar-brand h2 font-weight-bold">{data.name}</span>
        <button className="btn btn-outline-light ms-auto" onClick={() => setShowSidebar(true)}>
          <FaUser /> Login
        </button>
      </nav>

      {/* Sidebar */}
      <div className={`bg-dark text-light p-4 position-fixed top-0 end-0 vh-100 shadow-lg ${showSidebar ? "d-block" : "d-none"}`} style={{ width: "300px" }}>
        <button className="btn-close btn-close-white position-absolute top-2 end-2" onClick={() => setShowSidebar(false)}></button>
        <h4 className="text-center mb-4">Login</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default ViewPortfolio;
