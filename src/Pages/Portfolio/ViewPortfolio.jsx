import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaEye, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ViewPortfolio = () => {
  const [data, setData] = useState(null);
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
    <div style={{ background: "#F5F5F5", minHeight: "100vh", color: "#333" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm" style={{ backgroundColor: "#ffffff" }}>
        <span className="navbar-brand h2 font-weight-bold text-primary">{data.name}</span>
      </nav>

      {/* Profile Section */}
      <section className="text-center my-5">
        <motion.img
          src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
          alt="Profile"
          className="rounded-circle border border-primary shadow-lg"
          style={{ width: "160px", height: "160px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h1 className="mt-3 font-weight-bold text-dark">{data.name}</h1>
        {data.bio && <p className="px-3 text-muted">{data.bio}</p>}
        <div className="mt-3">
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary mx-2">
              <FaLinkedin size={20} /> LinkedIn
            </a>
          )}
          {data.email && (
            <a href={`mailto:${data.email}`} className="btn btn-secondary mx-2">
              <FaEnvelope size={20} /> Contact
            </a>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4 font-weight-bold text-uppercase text-dark">Projects</h2>
        <div className="row">
          {data.projects.map((project, index) => (
            <motion.div key={index} className="col-12 col-md-6 col-lg-4 d-flex" whileHover={{ scale: 1.05 }}>
              <div className="card border-0 shadow-lg rounded-lg w-100 mb-4">
                <img
                  src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage.replace(/^\/+/, "")}`}
                  className="card-img-top rounded-top"
                  alt={project.projectName}
                  style={{ height: "200px", objectFit: "cover" }}
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

      {/* Footer */}
      <footer className="bg-white text-dark text-center py-3 mt-5 border-top">
        <p className="mb-0">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewPortfolio;
