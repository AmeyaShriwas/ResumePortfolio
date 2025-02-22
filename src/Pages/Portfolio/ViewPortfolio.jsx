import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaEye, FaGithub, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ViewPortfolio.css";

const ViewPortfolio = () => {
  const [data, setData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching portfolio data", error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="portfolio-container">
      {/* Fixed Navbar */}
      <nav className="navbar fixed-top">
        <span className="navbar-brand">{data.name}</span>
        <button className="btn-login" onClick={() => setShowSidebar(true)}>
          <FaUser /> Login
        </button>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
        <button className="close-btn" onClick={() => setShowSidebar(false)}>×</button>
        <h4>Login</h4>
        <form>
          <input type="email" placeholder="Enter email" className="input-field" />
          <input type="password" placeholder="Enter password" className="input-field" />
          <button type="submit" className="submit-btn">Login</button>
        </form>
      </div>

      {/* Profile Section */}
      <section className="profile-section">
        <motion.img
          src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
          alt="Profile"
          className="profile-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="profile-name">{data.name}</h1>
        {data.bio && <p className="bio">{data.bio}</p>}
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {data.projects.map((project, index) => (
            <motion.div key={index} className="project-card" whileHover={{ scale: 1.05 }}>
              <img
                src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage.replace(/^\/+/, "")}`}
                alt={project.projectName}
                className="project-image"
              />
              <div className="project-details">
                <h5>{project.projectName}</h5>
                <p>{project.projectDescription}</p>
                <div className="project-links">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-view">
                      <FaEye /> View
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-github">
                      <FaGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewPortfolio;
