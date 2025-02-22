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
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", width: "100%", display: "flex" }}>
      {/* Left Section */}
      <div style={{ width: "30%", background: "white", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <motion.img
          src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
          alt="Profile"
          className="rounded-circle border border-warning shadow-lg"
          style={{ width: "160px", height: "160px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="mt-3 font-weight-bold">{data.name}</h1>
        {data.bio && <p className="px-3 text-center">{data.bio}</p>}
        <div className="d-flex gap-3 mt-3">
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <FaLinkedin /> LinkedIn
          </a>
          <a href={`mailto:${data.email}`} className="btn btn-dark">
            <FaEnvelope /> Contact Us
          </a>
          <a href={data.resume} className="btn btn-secondary" download>
            <FaFileAlt /> Download Resume
          </a>
        </div>
        <button className="btn btn-outline-dark mt-3" onClick={() => setShowSidebar(true)}>
          <FaUser /> Login
        </button>
      </div>

      {/* Right Section */}
      <div style={{ width: "70%", padding: "20px" }}>
        <nav className="nav nav-tabs">
          <a className="nav-link active" data-bs-toggle="tab" href="#projects">Projects</a>
          <a className="nav-link" data-bs-toggle="tab" href="#skills">Skills</a>
          <a className="nav-link" data-bs-toggle="tab" href="#about">About Me</a>
          <a className="nav-link" data-bs-toggle="tab" href="#experience">Experience</a>
        </nav>
        <div className="tab-content mt-4">
          <div className="tab-pane fade show active" id="projects">
            <h2>Projects</h2>
            <div className="row">
              {data.projects.map((project, index) => (
                <motion.div key={index} className="col-md-6" whileHover={{ scale: 1.05 }}>
                  <div className="card border-0 shadow-lg mb-4">
                    <img src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage.replace(/^\/+/, "")}`} className="card-img-top" alt={project.projectName} />
                    <div className="card-body text-center">
                      <h5 className="card-title text-dark">{project.projectName}</h5>
                      <p className="card-text text-muted">{project.projectDescription}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="tab-pane fade" id="skills">
            <h2>Skills</h2>
            <p>{data.skills}</p>
          </div>
          <div className="tab-pane fade" id="about">
            <h2>About Me</h2>
            <p>{data.aboutMe}</p>
          </div>
          <div className="tab-pane fade" id="experience">
            <h2>Experience</h2>
            <p>{data.experience}</p>
          </div>
        </div>
      </div>

      {/* Sidebar Login */}
      <div className={`position-fixed top-0 start-0 vh-100 bg-dark text-light p-4 shadow-lg ${showSidebar ? "d-block" : "d-none"}`} style={{ width: "30%" }}>
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
