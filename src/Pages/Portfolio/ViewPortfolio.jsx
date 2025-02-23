import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaFileAlt, FaUser, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", width: "100%", display: "flex" }}>
      {/* Left Section */}
      <div style={{ width: "20%", background: "white", padding: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.img
          src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
          alt="Profile"
          className="rounded-circle border border-warning shadow-lg"
          style={{ width: "120px", height: "120px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h4 className="mt-3 text-center font-weight-bold">{data.name}</h4>
        {data.bio && <p className="px-2 text-center" style={{ fontSize: "14px" }}>{data.bio}</p>}
        <div className="d-flex flex-column gap-2 mt-3 w-100">
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm w-100">
            <FaLinkedin /> LinkedIn
          </a>
          <a href={`mailto:${data.email}`} className="btn btn-dark btn-sm w-100">
            <FaEnvelope /> Contact
          </a>
          <a href={data.resume} className="btn btn-secondary btn-sm w-100" download>
            <FaFileAlt /> Resume
          </a>
        </div>
        <button className="btn btn-outline-dark btn-sm mt-3" onClick={() => setShowSidebar(true)}>
          <FaUser /> Login
        </button>
      </div>

      {/* Right Section */}
      <div style={{ width: "80%", padding: "20px" }}>
        <h2 className="text-center mb-4">Projects</h2>
        <div className="row">
          {data.projects.map((project, index) => (
            <motion.div key={index} className="col-md-4" whileHover={{ scale: 1.05 }}>
              <div className="card border-0 shadow-sm mb-3">
                <img src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage.replace(/^\/+/, "")}`} className="card-img-top" alt={project.projectName} style={{ height: "150px", objectFit: "cover" }} />
                <div className="card-body text-center p-2">
                  <h6 className="card-title text-dark m-0">{project.projectName}</h6>
                  <p className="text-muted" style={{ fontSize: "12px" }}>{project.projectDescription}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                      <FaExternalLinkAlt /> Live
                    </a>
                    <a href={project.projectGithub} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm">
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sidebar Login */}
      <div className={`position-fixed top-0 start-0 vh-100 bg-dark text-light p-4 shadow-lg ${showSidebar ? "d-block" : "d-none"}`} style={{ width: "25%" }}>
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
