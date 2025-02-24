import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaFileAlt, FaUser, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal, Button, Form } from "react-bootstrap";


const UpdatePortfolioPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [editField, setEditField] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [personalDetails, setPersonalDetails] = useState({
    name: data?.name || "",
    bio: data?.bio || "",
    linkedin: data?.linkedin || "",
    email: data?.email || "",
  });

  const naviagate = useNavigate()

  
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`
      );
      console.log('res', response)
      setData(response.data.data);
      const personal = {
        
          name: response.data.data?.name,
          bio: response.data.data?.bio,
          linkedin: response.data.data?.linkedin,
          email: response.data.data?.email,
        
      }
      setPersonalDetails(personal)
    } catch (error) {
      console.error("Error fetching portfolio data", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, [id]);

  const handleOpenModel = (field) => {
    setEditField(field);
    setShowModal(true);
    if (field === "profilePhoto") {
      setImageFile(null);
    } else {
      
    }
  };

  const handlePersonalDetailsChange = (e)=> {
    const {name, value} = e.target
     setPersonalDetails((prev)=> ({
         ...prev,
       [name]: value
     }))
  }

  const handleSave = async () => {
    try {
      if(editField === 'profilePhoto'){
        console.log('updated data', data)
       
        const formData = new FormData()
     
        if (imageFile) {
            formData.append("profilePhoto", imageFile);
        }
      
        try {
            const response = await axios.post(`https://api.resumeportfolio.ameyashriwas.in/portfolio/updateProfilePhoto/${data.id}`, formData);
            console.log('res updated',response.data);
            setData(response?.data?.data)
        } catch (error) {
            console.error("Error updating portfolio:", error);
        }
      }
      else{
      
        try {
          const response = await axios.post(`https://api.resumeportfolio.ameyashriwas.in/portfolio/updatePersonalDetails/${data.id}`, personalDetails);
          console.log('res updated',response.data);
          setData(response?.data?.data)
      } catch (error) {
          console.error("Error updating portfolio:", error);
      }

      }
    
      setShowModal(false);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  if (!data) {
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid p-0" style={{ background: "white", minHeight: "100vh" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-dark text-light p-3">
        <h4 className="m-0">{data.name}'s Portfolio</h4>
        <button className="btn btn-outline-light" onClick={()=> navigate('/user/login')}>
          <FaUser /> Logout
        </button>
      </header>

      <div className="d-flex flex-column flex-md-row">
        {/* Left Section */}
        <div className="col-md-3 bg-white p-4 text-center border">
          <motion.div className="position-relative d-inline-block">
            <motion.img
              src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
              alt="Profile"
              className="rounded-circle border border-warning shadow-lg"
              style={{ width: "140px", height: "140px" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <button className="btn btn-sm btn-warning position-absolute bottom-0 end-0" onClick={()=>handleOpenModel('profilePhoto')}>
              <FaEdit />
            </button>
          </motion.div>
          <h5 className="mt-3 font-weight-bold d-flex justify-content-center align-items-center gap-2">
            {data.name} <FaEdit onClick={()=>handleOpenModel('name')} className="text-warning cursor-pointer" />
          </h5>
          {data.bio && (
            <p className="px-3 d-flex justify-content-center align-items-center gap-2">
              {data.bio} <FaEdit onClick={()=>handleOpenModel('bio')} className="text-warning cursor-pointer" />
            </p>
          )}
          <div className="d-flex flex-column gap-2 mt-3">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary d-flex justify-content-between">
              <FaLinkedin /> LinkedIn <FaEdit  onClick={()=>handleOpenModel('linkedin')}/>
            </a>
            <a href={`mailto:${data.email}`} className="btn btn-dark d-flex justify-content-between">
              <FaEnvelope /> Contact <FaEdit  onClick={()=>handleOpenModel('email')} />
            </a>
            <a href={data.resume} className="btn btn-secondary d-flex justify-content-between" download>
              <FaFileAlt /> Download Resume <FaEdit onClick={()=>handleOpenModel('resume')} />
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
                    <div className="card shadow-sm border-0 position-relative">
                      <div className="square-container">
                        <img
                          src={`https://api.resumeportfolio.ameyashriwas.in/${project.projectImage}`}
                          className="card-img-top"
                          alt={project.projectName}
                        />
                      </div>
                      <button className="btn btn-sm btn-warning position-absolute top-0 end-0 m-2">
                        <FaEdit onClick={()=>handleOpenModel('projectImage')} />
                      </button>
                      <div className="card-body">
                        <h6 className="card-title d-flex justify-content-between">
                          {project.projectName} <FaEdit onClick={()=>handleOpenModel('projectName')} className="text-warning cursor-pointer" />
                        </h6>
                        <p className="card-text text-muted small d-flex justify-content-between">
                          {project.projectDescription} <FaEdit onClick={()=>handleOpenModel('projectDescription')} className="text-warning cursor-pointer" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="tab-pane fade" id="skills">
              <h4>Skills</h4>
              <p className="d-flex justify-content-between">
                {data.skills} <FaEdit onClick={()=>handleOpenModel('skills')} className="text-warning cursor-pointer" />
              </p>
            </div>

            {/* About Me Section */}
            <div className="tab-pane fade" id="about">
              <h4>About Me</h4>
              <p className="d-flex justify-content-between">
                {data.aboutMe} <FaEdit onClick={()=>handleOpenModel('aboutMe')} className="text-warning cursor-pointer" />
              </p>
            </div>

            {/* Experience Section */}
            <div className="tab-pane fade" id="experience">
              <h4>Experience</h4>
              <p className="d-flex justify-content-between">
                {data.experience} <FaEdit onClick={()=>handleOpenModel('experience')} className="text-warning cursor-pointer" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editField === "profilePhoto" ? (
            <Form.Group>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImageFile(e.target.files[0])} />
            </Form.Group>
          ) :
        
           (
            <Form.Group>
            <Form.Label>Update Personal Details</Form.Label>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                name="name" 
                type="text" 
                value={personalDetails?.name} 
                onChange={handlePersonalDetailsChange} 
              />
            </Form.Group>
          
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control 
                name="bio" 
                as="textarea" 
                value={personalDetails?.bio} 
                onChange={handlePersonalDetailsChange} 
              />
            </Form.Group>
          
            <Form.Group>
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control 
                name="linkedin" 
                type="text" 
                value={personalDetails?.linkedin} 
                onChange={handlePersonalDetailsChange} 
              />
            </Form.Group>
          
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                name="email" 
                type="email" 
                value={personalDetails?.email} 
                onChange={handlePersonalDetailsChange} 
              />
            </Form.Group>
          </Form.Group>
          
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="bg-dark text-light text-center p-3 mt-3">
        <small>&copy; {new Date().getFullYear()} {data.name}. All Rights Reserved.</small>
      </footer>

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
          
          .position-relative {
            position: relative;
          }

          .btn-warning {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cursor-pointer {
            cursor: pointer;
          }

          @media (max-width: 768px) {
            .col-md-3 {
              width: 100%;
              text-align: center;
            }
            
            .col-md-9 {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default UpdatePortfolioPage;
