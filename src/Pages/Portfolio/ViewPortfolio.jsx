import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaGithub, FaFileAlt, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./ViewPortfolio.css";

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
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className="sticky-top bg-dark text-light p-3 d-flex justify-content-between align-items-center shadow">
        <h2 className="m-0">{data.name}'s Portfolio</h2>
        <button className="btn btn-outline-light" onClick={() => setShowSidebar(true)}>
          <FaUser /> Login
        </button>
      </header>

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Left Section */}
        <div className="left-section">
          <motion.img
            src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
            alt="Profile"
            className="profile-img"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h4 className="mt-3">{data.name}</h4>
          {data.bio && <p className="text-center px-2">{data.bio}</p>}
          <div className="social-links">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={`mailto:${data.email}`} className="btn btn-dark">
              <FaEnvelope /> Contact
            </a>
            <a href={data.resume} className="btn btn-secondary" download>
              <FaFileAlt /> Resume
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <nav className="nav nav-tabs">
            <a className="nav-link active" data-bs-toggle="tab" href="#projects">Projects</a>
            <a className="nav-link" data-bs-toggle="tab" href="#skills">Skills</a>
            <a className="nav-link" data-bs-toggle="tab" href="#about">About Me</a>
            <a className="nav-link" data-bs-toggle="tab" href="#experience">Experience</a>
          </nav>

          <div className="tab-content mt-3">
            <div className="tab-pane fade show active" id="projects">
              <h3>Projects</h3>
              <div className="row">
                {data.projects.map((project, index) => (
                  <motion.div key={index} className="col-md-4 project-card" whileHover={{ scale: 1.05 }}>
                    <div className="card shadow">
                      <img src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage.replace(/^\/+/, "")}`} className="card-img-top small-img" alt={project.projectName} />
                      <div className="card-body text-center">
                        <h5 className="card-title text-dark">{project.projectName}</h5>
                        <p className="card-text text-muted">{project.projectDescription}</p>
                        <a href={project.projectLink} className="btn btn-sm btn-primary">View</a>
                        <a href={project.gitHub} className="btn btn-sm btn-dark ms-2">GitHub</a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="tab-pane fade" id="skills">
              <h3>Skills</h3>
              <p>{data.skills}</p>
            </div>
            <div className="tab-pane fade" id="about">
              <h3>About Me</h3>
              <p>{data.aboutMe}</p>
            </div>
            <div className="tab-pane fade" id="experience">
              <h3>Experience</h3>
              <p>{data.experience}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center p-3 mt-4">
        <p>&copy; 2024 {data.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewPortfolio;
