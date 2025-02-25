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


const ViewPortfolio = () => {
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

  const handleLoginChange = (e)=> {
const {name, value} = e.target
setLoginData((prev)=> ({
   ...prev,
   [name]: value
}))

  }

  const handleLoginSubmit = async(e)=> {
    e.preventDefault()
    dispatch(userLogin(loginData)).then((response)=> {
      console.log('res', response)
      if(response.payload.status){
          swal('Success', response.payload.message)
          navigate(`/updatePortfolio/${data.id}`)
      }
      else{
          swal('Error', response.payload.message ? response.payload.message : response.payload)
      }
    })
  }

  if (!data) {
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid p-0" style={{ background: "#1F2937", minHeight: "100vh", color: "white" }}>
    {/* Header */}
    <header style={{ backgroundColor: "#F4C95D", color: "black" }} className="d-flex justify-content-between border align-items-center p-3">
      <h4 className="m-0">{data.name}'s Portfolio</h4>
      <button className="btn" style={{ backgroundColor: "black", color: "#F4C95D" }} onClick={() => setShowSidebar(true)}>
        <FaUser /> Login
      </button>
    </header>
  
    <div className="d-flex flex-column flex-md-row">
      {/* Left Section */}
      <div className="col-md-3 p-4 text-center border" style={{ backgroundColor: "#374151", color: "white" }}>
        <motion.img
          src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
          alt="Profile"
          className="rounded-circle"
          style={{ width: "140px", height: "140px" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <h5 className="mt-3 font-weight-bold text-light">{data.name}</h5>
        {data.bio && <p className="px-3 text-light">{data.bio}</p>}
        <div className="d-flex flex-column gap-2 mt-3">
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-warning text-black">
            <FaLinkedin /> LinkedIn
          </a>
          <a href={`mailto:${data.email}`} className="btn btn-light text-dark">
            <FaEnvelope /> Contact
          </a>
          <a href={data.resume} className="btn btn-dark" download>
            <FaFileAlt /> Download Resume
          </a>
        </div>
      </div>
  
      {/* Right Section */}
      <div className="col-md-9 p-4">
        <nav className="nav nav-tabs" style={{ borderBottom: "2px solid #F4C95D" }}>
          <a className="nav-link active text-warning" data-bs-toggle="tab" href="#projects">
            Projects
          </a>
          <a className="nav-link text-light" data-bs-toggle="tab" href="#skills">
            Skills
          </a>
          <a className="nav-link text-light" data-bs-toggle="tab" href="#about">
            About Me
          </a>
          <a className="nav-link text-light" data-bs-toggle="tab" href="#experience">
            Experience
          </a>
        </nav>
  
        <div className="tab-content mt-4">
          {/* Projects Section */}
          <div className="tab-pane fade show active" id="projects">
            <h4 className="text-warning">Projects</h4>
            <div className="row">
              {data.projects.map((project, index) => (
                <motion.div key={index} className="col-12 col-sm-6 col-md-4 mb-3" whileHover={{ scale: 1.05 }}>
                  <div className="card shadow-sm border-0" style={{ backgroundColor: "#374151", color: "white" }}>
                    <div className="square-container">
                      <img
                        src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage}`}
                        className="card-img-top"
                        alt={project.projectName}
                      />
                    </div>
                    <div className="card-body">
                      <h6 className="card-title text-warning">{project.projectName}</h6>
                      <p className="card-text text-muted small">{project.projectDescription}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
  
          {/* Skills Section */}
          <div className="tab-pane fade" id="skills">
            <h4 className="text-warning">Skills</h4>
            <p>{data.skills}</p>
          </div>
  
          {/* About Me Section */}
          <div className="tab-pane fade" id="about">
            <h4 className="text-warning">About Me</h4>
            <p>{data.aboutMe}</p>
          </div>
  
          {/* Experience Section */}
          <div className="tab-pane fade" id="experience">
            <h4 className="text-warning">Experience</h4>
            <p>{data.experience}</p>
          </div>
        </div>
      </div>
    </div>
  
    {/* Footer */}
    <footer className="text-center p-3 mt-3 border" style={{ backgroundColor: "#F4C95D", color: "black" }}>
      <small>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</small>
    </footer>
  
    {/* Sidebar Login */}
    <AnimatePresence>
      {showSidebar && (
        <motion.div
          className="position-fixed top-0 start-0 vh-100 text-dark p-4 shadow-lg"
          style={{ width: "25%", backgroundColor: "#374151", color: "white" }}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5 }}
        >
          <button className="btn-close btn-close-light position-absolute top-2 end-2" onClick={() => setShowSidebar(false)}></button>
          <h4 className="text-center mb-4 text-warning">Login</h4>
          <form>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" onChange={handleLoginChange} className="form-control" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" onChange={handleLoginChange} className="form-control" placeholder="Enter password" />
            </div>
            <button type="submit" onClick={handleLoginSubmit} className="btn btn-warning w-100 text-black">
              Login
            </button>
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
  
        .nav-tabs .nav-link.active {
          background-color: transparent !important;
          border-bottom: 3px solid #F4C95D !important;
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
