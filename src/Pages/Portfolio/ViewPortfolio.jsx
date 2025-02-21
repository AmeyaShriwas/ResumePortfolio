import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const ViewPortfolio = () => {
  const [data, setData] = useState(null);
  const {id} = useParams()

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`
      );
      console.log('res', response)
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
    <div style={{ backgroundColor: "#3d5a80", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark p-3 shadow"
        style={{ backgroundColor: "#293241", position: "sticky", top: 0, zIndex: 1000 }}
      >
        <a className="navbar-brand h2 font-weight-bold text-light">{data.name}</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="navbar-nav d-flex flex-lg-row flex-column text-center">
            {data.resume && (
              <a
                href={data.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light mt-2 mx-2 px-4 py-2 shadow"
              >
                Resume
              </a>
            )}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="btn btn-outline-light mt-2 mx-2 px-4 py-2 shadow"
              >
                Contact
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <section className="text-center my-5 p-3">
        <img
          src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, '')}`}
          alt="Profile"
          className="rounded-circle mt-3 shadow-lg border border-warning"
          style={{ width: "160px", height: "160px" }}
        />
        <h1 className="display-4 font-weight-bold text-light mt-3">{data.name}</h1>
        {data.bio && <p className="text-light px-3">{data.bio}</p>}
        <div className="mt-4">
          {data.linkedin && (
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light mt-2 mx-2 px-4 py-2 shadow"
            >
              LinkedIn
            </a>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-5" style={{ backgroundColor: "#3d5a80" }}>
        <h2 className="text-center mb-5 font-weight-bold text-uppercase text-light">Projects</h2>
        <div className="container">
          <div className="row">
            {data.projects.map((project, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
                <div className="card border-0 shadow-lg rounded-lg w-100 mb-4">
                  <img
                    src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage.replace(/^\/+/, '')}`}
                    className="card-img-top rounded-top"
                    alt={project.projectName}
                    style={{ height: "200px" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title font-weight-bold text-dark">{project.projectName}</h5>
                    <p className="card-text text-muted">{project.projectDescription}</p>
                    <div className="d-flex justify-content-center">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm mx-2 px-4 py-2"
                        >
                          View
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-dark btn-sm mx-2 px-4 py-2"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p className="mb-0">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewPortfolio;
