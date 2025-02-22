import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaEye, FaGithub, FaFileAlt, FaUser } from "react-icons/fa";
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
      <div className={`sidebar bg-dark text-light p-4 position-fixed top-0 end-0 vh-100 shadow-lg ${showSidebar ? "d-block" : "d-none"}`} style={{ width: "300px" }}>
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

      {/* Profile Section */}
      <section className="text-center my-5">
        <motion.img
          src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
          alt="Profile"
          className="rounded-circle border border-warning shadow-lg"
          style={{ width: "160px", height: "160px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="mt-3 display-5 font-weight-bold">{data.name}</h1>
        {data.bio && <p className="px-3">{data.bio}</p>}
      </section>

      {/* Projects Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4 font-weight-bold text-uppercase">Projects</h2>
        <div className="row">
          {data.projects.map((project, index) => (
            <motion.div key={index} className="col-12 col-md-6 col-lg-4 d-flex" whileHover={{ scale: 1.05 }}>
              <div className="card border-0 shadow-lg rounded-lg w-100 mb-4">
                <img
                  src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage.replace(/^\/+/, "")}`}
                  className="card-img-top rounded-top"
                  alt={project.projectName}
                  style={{ height: "200px" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title font-weight-bold text-dark">{project.projectName}</h5>
                  <p className="card-text text-muted">{project.projectDescription}</p>
                  <div className="d-flex justify-content-center">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary mx-2">
                        <FaEye /> View
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark mx-2">
                        <FaGithub /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p className="mb-0">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewPortfolio;
