import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaFileAlt, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { userLogin, UserLogin } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";


const ViewPortfolio = ({ isMobile, setIsMobile }) => {
  const [data, setData] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { id } = useParams();
  const [loginData, setLoginData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }))

  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    dispatch(userLogin(loginData)).then((response) => {
      console.log('res', response)
      if (response.payload.status) {
        swal('Success', response.payload.message)
        navigate(`/updatePortfolio/${data.id}`)
      }
      else {
        swal('Error', response.payload.message ? response.payload.message : response.payload)
      }
    })
  }

  if (!data) {
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid p-0" style={{ background: "white", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ backgroundColor: "white", color: "black" }} className="d-flex justify-content-between border align-items-center p-3">
        <h4 className="m-0">{data.name}'s Portfolio</h4>
        <button className="btn" style={{ backgroundColor: "#7C99AC", color: "white" }} onClick={() => setShowSidebar(true)}>
          <FaUser /> Login
        </button>
      </header>

      <div className="d-flex flex-column flex-md-row">
        {/* Left Section */}
        <div className="col-md-3 bg-white p-4 text-center border">
          <motion.img
            src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "140px", height: "140px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h5 className="mt-3 font-weight-bold text-dark">{data.name}</h5>
          {data.bio && <p className="px-3 text-dark">{data.bio}</p>}
          <div className="d-flex flex-column gap-2 mt-3">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: "#7C99AC", color: "white" }}>
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
            <a className="nav-link active text-dark" data-bs-toggle="tab" href="#projects">
              Projects
            </a>
            <a className="nav-link text-dark" data-bs-toggle="tab" href="#skills">
              Skills
            </a>
            <a className="nav-link text-dark" data-bs-toggle="tab" href="#about">
              About Me
            </a>
            <a className="nav-link text-dark" data-bs-toggle="tab" href="#experience">
              Experience
            </a>
          </nav>

          <div className="tab-content mt-4">
            {/* Projects Section */}
            <div className="tab-pane fade show active" id="projects">
              <h4 className="text-dark" style={{ marginBottom: '20px' }}>Projects</h4>
              <div
                className="scroll-container"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  position: "relative",
                }}
              >
                <motion.div
                  className="scroll-content"
                  style={{
                    display: "flex",
                    gap: "26px",
                  }}
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    ease: "linear",
                    duration: 15,
                    repeat: Infinity,
                  }}
                >
                  {data.projects.concat(data.projects).map((project, index) => (
                <div
                key={index}
                className="project-card"
                style={{
                  flex: "0 0 auto",
                  width: isMobile ? "300px" : "600px", // Increased width when not mobile
                  height: isMobile ? "350px" : "400px", // Height remains the same
                  border: "1px solid grey",
                  overflow: "hidden",
                }}
              >
                <div className="card shadow-sm border-0" style={{ display: "flex", flexDirection: "column" }}>
                  {/* Image section (50% height) */}
                  <div className="square-container" style={{ overflow: "hidden" }}>
                    <img
                      src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage}`}
                      className="card-img-top"
                      alt={project.projectName}
                      style={{ width: "100%"}} // Ensures full image display
                    />
                  </div>
              
                  {/* Content section (50% height) */}
                  <div className="card-body" style={{display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <h6 className="card-title text-dark"  style={{ color: "black" }}>{project.projectName}</h6>
              
                    {/* Show full description when not mobile */}
                    <p
                      className="card-text text-muted small"
                      style={{
                        overflow: "hidden",
                        color:'black',
                        display: isMobile ? "-webkit-box" : "block", // Adjust display style based on mobile
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: isMobile ? 3 : "unset", // Limit to 3 lines only on mobile
                        whiteSpace: isMobile ? "nowrap" : "normal", // Prevent wrapping on mobile
                      }}
                    >
                      {project.projectDescription}
                    </p>
                  </div>
                </div>
              </div>
              

                  ))}
                </motion.div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="tab-pane fade" id="skills">
              <h4 className="text-dark">Skills</h4>
              <p className="text-dark" style={{ display: 'flex', gap: '15px' }}>{data.skills.split(",").map((data) => {
                return (
                  <p className="text-light" style={{ backgroundColor: 'grey', padding: '10px', margin: '10px', borderRadius: '10px' }}>{data}</p>
                )
              })}</p>
            </div>

            {/* About Me Section */}
            <div className="tab-pane fade" id="about">
              <h4 className="text-dark">About Me</h4>
              <p className="text-dark">{data.aboutMe}</p>
            </div>

            {/* Experience Section */}
            <div className="tab-pane fade" id="experience">
              <h4 className="text-dark">Experience</h4>
              <p className="text-dark">{data.experience}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center p-3 mt-3 border" style={{ backgroundColor: "white", color: "black" }}>
        <small>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</small>
      </footer>

      {/* Sidebar Login */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            className="position-fixed top-0 start-0 vh-100 text-dark p-4 shadow-lg"
            style={{ width: "25%", backgroundColor: "white" }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5 }}
          >
            <button className="btn-close btn-close-dark position-absolute top-2 end-2" onClick={() => setShowSidebar(false)}></button>
            <h4 className="text-center mb-4 text-dark">Login</h4>
            <form>
              <div className="mb-3">
                <label className="form-label text-dark">Email</label>
                <input type="email" name="email" onChange={handleLoginChange} className="form-control" placeholder="Enter email" />
              </div>
              <div className="mb-3">
                <label className="form-label text-dark">Password</label>
                <input type="password" name="password" onChange={handleLoginChange} className="form-control" placeholder="Enter password" />
              </div>
              <button type="submit" onClick={handleLoginSubmit} className="btn w-100" style={{ backgroundColor: "#7C99AC", color: "white" }}>Login</button>
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