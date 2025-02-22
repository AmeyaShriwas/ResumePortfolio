import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaEye, FaGithub, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ViewPortfolio = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("Projects");
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
    <div style={{ background: "#F5F5F5", minHeight: "100vh", color: "#333" }} className="container py-5">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-4 bg-white p-4 rounded shadow-lg">
          <motion.img
            src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
            alt="Profile"
            className="rounded-circle border shadow-lg d-block mx-auto"
            style={{ width: "120px", height: "120px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h2 className="text-center mt-3 font-weight-bold">{data.name}</h2>
          {data.bio && <p className="text-center text-muted">{data.bio}</p>}
          <div className="d-flex justify-content-center gap-2 mt-3">
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <FaLinkedin /> LinkedIn
              </a>
            )}
            {data.contact && (
              <a href={`mailto:${data.contact}`} className="btn btn-dark">
                <FaEnvelope /> Contact
              </a>
            )}
          </div>
          {data.resume && (
            <a href={data.resume} download className="btn btn-secondary w-100 mt-3">
              <FaFileAlt /> Download Resume
            </a>
          )}
        </div>

        {/* Right Section */}
        <div className="col-md-8 p-4">
          {/* Tabs */}
          <ul className="nav nav-tabs mb-4">
            {["Projects", "Skills", "About Me", "Experience"].map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  style={{ color: activeTab === tab ? "#333" : "#666" }}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>

          {/* Content */}
          <div className="bg-white p-4 rounded shadow-lg">
            {activeTab === "Projects" && (
              <div className="row">
                {data.projects.map((project, index) => (
                  <motion.div key={index} className="col-md-6 mb-4" whileHover={{ scale: 1.05 }}>
                    <div className="card border-0 shadow-lg">
                      <img
                        src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage.replace(/^\/+/, "")}`}
                        className="card-img-top"
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
            )}

            {activeTab === "Skills" && (
              <ul className="list-group">
                {data.skills.map((skill, index) => (
                  <li key={index} className="list-group-item border-0 text-dark">
                    {skill}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "About Me" && <p className="text-muted">{data.about}</p>}

            {activeTab === "Experience" && (
              <ul className="list-group">
                {data.experience.map((exp, index) => (
                  <li key={index} className="list-group-item border-0 text-dark">
                    <strong>{exp.position}</strong> at {exp.company} ({exp.duration})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPortfolio;
