import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaFileAlt, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ViewPortfolio = () => {
  const [data, setData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`
      );
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
    <div className="container-fluid p-0" style={{ background: "white", minHeight: "100vh" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-dark text-light p-3">
        <h4 className="m-0">{data.name}'s Portfolio</h4>
        <button className="btn btn-outline-light" onClick={() => setShowSidebar(true)}>
          <FaUser /> Login
        </button>
      </header>

      <div className="d-flex flex-column flex-md-row border">
        {/* Left Section */}
        <div className="col-md-3 bg-white p-4 text-center">
          <motion.img
            src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
            alt="Profile"
            className="rounded-circle border border-warning shadow-lg"
            style={{ width: "140px", height: "140px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h5 className="mt-3 font-weight-bold">{data.name}</h5>
          {data.bio && <p className="px-3">{data.bio}</p>}
          <div className="d-flex flex-column gap-2 mt-3">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={`mailto:${data.email}`} className="btn btn-dark">
              <FaEnvelope /> Contact
            </a>
            <a href={data.resume} className="btn btn-secondary" download>
              <FaFileAlt /> Download Resume
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-9 p-4">
          <nav className="nav nav-tabs">
            <a className="nav-link active" data-bs-toggle="tab" href="#projects">
              Projects
            </a>
            <a className="nav-link" data-bs-toggle="tab" href="#skills">
              Skills
            </a>
            <a className="nav-link" data-bs-toggle="tab" href="#about">
              About Me
            </a>
            <a className="nav-link" data-bs-toggle="tab" href="#experience">
              Experience
            </a>
          </nav>

          <div className="tab-content mt-4">
            {/* Projects Section */}
            <div className="tab-pane fade show active" id="projects">
              <h4>Projects</h4>
              <div className="row">
                {data.projects.map((project, index) => (
                  <motion.div key={index} className="col-12 col-sm-6 col-md-4 mb-3" whileHover={{ scale: 1.05 }}>
                    <div className="card shadow-sm border-0">
                      <div className="square-container">
                        <img
                          src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage}`}
                          className="card-img-top"
                          alt={project.projectName}
                        />
                      </div>
                      <div className="card-body">
                        <h6 className="card-title">{project.projectName}</h6>
                        <p className="card-text text-muted small">{project.projectDescription}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="tab-pane fade" id="skills">
              <h4>Skills</h4>
              <p>{data.skills}</p>
            </div>

            {/* About Me Section */}
            <div className="tab-pane fade" id="about">
              <h4>About Me</h4>
              <p>{data.aboutMe}</p>
            </div>

            {/* Experience Section */}
            <div className="tab-pane fade" id="experience">
              <h4>Experience</h4>
              <p>{data.experience}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center p-3 mt-3">
        <small>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</small>
      </footer>

      {/* Sidebar Login */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="position-fixed top-0 start-0 vh-100 text-dark p-4 shadow-lg"
            style={{ width: "25%", backgroundColor:'white' }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
          >
            <button className="btn-close btn-close-dark position-absolute top-2 end-2" onClick={() => setShowSidebar(false)}></button>
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style>
        {`
          .square-container {
            width: 100%;
            padding-top: 100%;
            position: relative;
            overflow: hidden;
          }
          
          .square-container img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          @media (max-width: 768px) {
            .col-md-3 {
              width: 100%;
              text-align: center;
            }
            
            .col-md-9 {
              width: 100%;
            }

            .position-fixed {
              width: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ViewPortfolio;
