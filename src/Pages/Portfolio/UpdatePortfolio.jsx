import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaLinkedin, FaEnvelope, FaFileAlt, FaUser, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal, Button, Form } from "react-bootstrap";
import { UserLogout } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const UpdatePortfolioPage = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [editField, setEditField] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [personalDetails, setPersonalDetails] = useState({
    name: data?.name || "",
    tagLine: data?.tagLine || "",
    linkedin: data?.linkedin || "",
    email: data?.email || "",
  });
  const [experienceDetails, setExperienceDetails] = useState({
    from: "",
    to: data?.bio || "",
    training_company: "",
    course_job: "",
    description: ""
  });
  const [updateBio, setUpdateBio] = useState({bio: ''})
  const [updateSkills, setUpdateSkills] = useState({skills: ''})

  const [allProjects, setAllProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState({
  })
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)
  const { token } = useSelector(state => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`
      );
      console.log('res', response)
      setData(response.data.data);

      const personal = {

        name: response.data.data?.name,
        tagLine: response.data.data?.tagLine,
        linkedin: response.data.data?.linkedin,
        email: response.data.data?.email,

      }
      setPersonalDetails(personal)
      const bioGet = {
        bio: response.data.data?.bio
      }
      setUpdateBio(bioGet)

      const skillsGet = {
        skills: response.data.data?.skills
      }
      setUpdateSkills(skillsGet)
      setAllProjects(response.data.projects)
    } catch (error) {
      console.error("Error fetching portfolio data", error);
    }
  };

  const handelLogout = () => {
    const id = data.id
    navigate(`/viewPortfolio/${id}`)


  }


  useEffect(() => {
    fetchData();
  }, [id]);

  const handleOpenModel = (field, index) => {
    console.log('data', data)
    setSelectedProjectIndex(index)
    const allProjects = data.projects.filter((data, i) => i === index)[0]
    console.log('dat', allProjects)
    const allExperience = data.training_Experience.filter((data, i)=> i === index )[0]
    setExperienceDetails(allExperience)
    setSelectedProject(allProjects)
    setEditField(field);
    setShowModal(true);
    if (field === "profilePhoto") {
      setImageFile(null);
    } else {

    }
  };

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleExperienceDetailsChange = (e) => {
    const { name, value } = e.target
    setExperienceDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBioDetailsChange = (e)=> {
    const { name, value } = e.target
    setUpdateBio((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSkillsDetailsChange = (e)=> {
    const { name, value } = e.target
    setUpdateSkills((prev) => ({
      ...prev,
      [name]: value
    }))
  }


  const handleSave = async () => {
    try {

      if (editField === 'profilePhoto') {
        console.log('updated data', data);

        const formData = new FormData();
        if (imageFile) {
          formData.append("profilePhoto", imageFile);
        }

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateProfilePhoto/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }
      else if (editField === 'projects') {
        const formData = new FormData();
        console.log('selected project', selectedProject);

        for (let key in selectedProject) {
          if (key === "projectImage" && selectedProject.projectImage instanceof File) {
            formData.append(key, selectedProject.projectImage); // Append the file
          } else {
            formData.append(key, selectedProject[key]);
          }
        }

        formData.append("index", selectedProjectIndex);

        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateProjects/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                // REMOVE "Content-Type": "application/json"
                // Axios will automatically set the correct "multipart/form-data"
              },
            }
          );

          console.log("res updated", response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }


      } else  if (editField === 'skills') {
        console.log('updated data', data);

        const formData = new FormData();
        formData.append("skills", updateSkills.skills);


        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateSkillsDetails/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      } else if (editField === 'aboutMe') {
        console.log('updated data', data);

        const formData = new FormData();
          formData.append("bio", updateBio.bio);


        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateBioDetails/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }
      

      else if (editField === 'experience') {
        console.log('updated data', data);

        const formData = new FormData();
        for(let key in experienceDetails){
          formData.append(key, experienceDetails[key]);

        }


        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updateExperienceDetails/${data.id}`,
            formData,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"

              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }
      else {
        try {
          const response = await axios.post(
            `https://api.resumeportfolio.ameyashriwas.in/portfolio/updatePersonalDetails/${data.id}`,
            personalDetails,
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            }
          );

          console.log('res updated', response.data);
          setData(response?.data?.data);
        } catch (error) {
          console.error("Error updating portfolio:", error);
        }
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };


  const handleProjectDetailsChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setSelectedProject(prev => ({
        ...prev,
        [name]: e.target.files[0] // Store the file object
      }));
    } else {
      setSelectedProject(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  if (!data) {
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid p-0" style={{ background: "white", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ backgroundColor: "white", color: "black" }} className="d-flex justify-content-between border align-items-center p-3">
        <h4 className="m-0">{data.name}'s Portfolio</h4>
        <button className="btn" style={{ backgroundColor: "#7C99AC", color: "white" }} onClick={() => handelLogout()}>
          <FaUser /> Logout
        </button>
      </header>


      <div className="d-flex flex-column flex-md-row" style={{ minHeight: '80vh' }}>
        {/* Left Section */}
        <div className="col-md-3 bg-white p-4 text-center border">
          <motion.div className="position-relative d-inline-block">
            <motion.img
              src={`https://api.resumeportfolio.ameyashriwas.in/${data.profilePhoto.replace(/^\/+/, "")}`}
              alt="Profile"
              className="rounded-circle shadow-lg"
              style={{ width: "200px", height: "200px" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <button className="btn btn-sm btn-warning position-absolute bottom-0 end-0" onClick={() => handleOpenModel('profilePhoto', 0)}>
              <FaEdit />
            </button>
          </motion.div>
          <h5 className="mt-3 font-weight-bold d-flex justify-content-center align-items-center gap-2">
            {data.name} <FaEdit onClick={() => handleOpenModel('name', 0)} className="text-warning cursor-pointer" />
          </h5>

          {data.tagLine && (
            <p
              className="text-dark"
              style={{
                fontSize: "16px",
                fontStyle: "italic",
                backgroundColor: "#f8f9fa",
                padding: "12px 20px",
                borderRadius: "8px",
                display: "inline-block",
                borderLeft: "4px solid #007bff", // Highlight effect
                maxWidth: "80%",
                margin: "10px auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
              }}
            >
              {data.tagLine} <FaEdit onClick={() => handleOpenModel('tagLine', 0)} className="text-warning cursor-pointer" />
            </p>
          )}
         <div className="d-flex flex-column gap-2 mt-3" style={{ position: "relative" }}>
  {/* LinkedIn Button */}
  <div className="d-flex align-items-center">
    <a 
      href={data.linkedin} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="btn w-100 d-flex justify-content-between align-items-center" 
      style={{ backgroundColor: "#7C99AC", color: "white" }}
    >
      <FaLinkedin /> LinkedIn
    </a>
    <FaEdit 
      onClick={() => handleOpenModel('linkedin', 0)} 
      style={{ marginLeft: "10px", cursor: "pointer", color: "#7C99AC" }}
    />
  </div>

  {/* Contact Button */}
  <div className="d-flex align-items-center">
    <a 
      href={`mailto:${data.email}`} 
      className="btn w-100 d-flex justify-content-between align-items-center" 
      style={{ backgroundColor: "#7C99AC", color: "white" }}
    >
      <FaEnvelope /> Contact
    </a>
    <FaEdit 
      onClick={() => handleOpenModel('email', 0)} 
      style={{ marginLeft: "10px", cursor: "pointer", color: "#7C99AC" }}
    />
  </div>

  {/* Resume Download Button */}
  <div className="d-flex align-items-center">
    <a 
      href={data.resume} 
      className="btn w-100 d-flex justify-content-between align-items-center" 
      style={{ backgroundColor: "#7C99AC", color: "white" }} 
      download
    >
      <FaFileAlt /> Download Resume
    </a>
    <FaEdit 
      onClick={() => handleOpenModel('resume', 0)} 
      style={{ marginLeft: "10px", cursor: "pointer", color: "#7C99AC" }}
    />
  </div>
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
              <div style={{
                width: "100%",
                display: 'flex',
                overflow: 'scroll',
                gap: '20px',
                borderRadius: '10px'
              }}>
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
                        <FaEdit onClick={() => handleOpenModel('projects', index)} />
                      </button>
                      <div className="card-body">
                        <h6 className="card-title d-flex justify-content-between">
                          {project.projectName} <FaEdit onClick={() => handleOpenModel('projects', index)} className="text-warning cursor-pointer" />
                        </h6>
                        <p className="card-text text-muted small d-flex justify-content-between">
                          {project.projectDescription.length > 100 ? project.projectDescription?.slice(0, 100) : project.projectDescription} <FaEdit onClick={() => handleOpenModel('projects', index)} className="text-warning cursor-pointer" />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Section */}

            <div className="tab-pane fade" id="skills">
              <h4 className="text-dark">Skills</h4>
              <p  className="text-dark" onClick={() => handleOpenModel('skills', 0)} style={{ display: 'flex', gap: '15px' }}>{data.skills.split(",").map((data) => {
                return (
                  <p className="text-light" style={{ backgroundColor: 'grey', padding: '10px', margin: '10px', borderRadius: '10px' }}>{data}  </p>
                )
              })} <FaEdit size={25} onClick={() => handleOpenModel('skills', 0)} className="text-warning cursor-pointer" /></p>
            </div>

            {/* About Me Section */}
            <div className="tab-pane fade" id="about">
              <h4>About Me</h4>
              <p className="d-flex justify-content-between">
                {data.bio} <FaEdit size={25} onClick={() => handleOpenModel('aboutMe', 0)} className="text-warning cursor-pointer" />
              </p>
            </div>

            {/* Experience Section */}

            <div className="tab-pane fade" id="experience" style={{ padding: "20px" }}>
              <h4 className="text-dark mb-4" style={{ borderBottom: "2px solid #007bff", paddingBottom: "5px" }}>
                Experience
              </h4>

              {data.training_Experience.map((data, index) => (
                <div
                  key={index}
                  className="card shadow-sm mb-3 border-0"
                  style={{ padding: "15px", borderRadius: "8px", backgroundColor: "#7C99AC", color: "white" }}
                >
                  <p className="mb-1 fw-bold" style={{ fontSize: "14px", color: 'white' }}>
                    {data.from} - {data.to}                   <FaEdit onClick={() => handleOpenModel('experience', index)} className="text-warning cursor-pointer" />

                  </p>

                  <p className="mb-1 fw-semibold" style={{ fontSize: "16px", color: 'white' }}>
                    {data.training_company} - <span style={{ fontSize: "16px", color: 'white' }} >{data.course_job}</span>
                  </p>

                  <p style={{ fontSize: "14px", lineHeight: "1.5", color: 'white' }}>
                    {data.description}
                  </p>
                </div>
              ))}
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
          ) : editField === "projects" ? (
            <>
              <div className="card shadow-sm border-0 position-relative">
                <div className="card-body">
                  {/* Remove value for file input */}
                  <Form.Control name="projectImage" type="file" onChange={handleProjectDetailsChange} />
                </div>

                <div className="card-body">
                  <Form.Control value={selectedProject?.projectName || ''} name="projectName" type="text" onChange={handleProjectDetailsChange} />
                </div>

                <div className="card-body">
                  <Form.Control value={selectedProject?.projectDescription || ''} name="projectDescription" as="textarea" onChange={handleProjectDetailsChange} />
                </div>

                <div className="card-body">
                  <Form.Control value={selectedProject?.techStack || ''} name="techStack" type="text" onChange={handleProjectDetailsChange} />
                </div>

                <div className="card-body">
                  <Form.Control value={selectedProject?.liveLink || ''} name="liveLink" type="text" onChange={handleProjectDetailsChange} />
                </div>

                <div className="card-body">
                  <Form.Control value={selectedProject?.githubLink || ''} name="githubLink" type="text" onChange={handleProjectDetailsChange} />
                </div>
              </div>
            </>

          ) : editField === "aboutMe" ? (
            
            <Form.Group>
             <Form.Label>Update About Me</Form.Label>

             <Form.Group>
               <Form.Label>About Me</Form.Label>
               <Form.Control
                 name="bio"
                 type="text"
                 value={updateBio?.bio}
                 onChange={handleBioDetailsChange}
               />
             </Form.Group>
             </Form.Group>

           
         ): editField === "skills" ? (
            
          <Form.Group>
           <Form.Label>Update Skills</Form.Label>

           <Form.Group>
             <Form.Label>Skills</Form.Label>
             <Form.Control
               name="skills"
               type="text"
               value={updateSkills?.skills}
               onChange={handleSkillsDetailsChange}
             />
           </Form.Group>
           </Form.Group>

         
       ): editField === "experience" ? (
            
          <Form.Group>
           <Form.Label>Update Experience</Form.Label>
           <Form.Group>
             <Form.Label>Company Name</Form.Label>
             <Form.Control
               name="training_company"
               type="text"
               value={experienceDetails?.training_company}
               onChange={handleExperienceDetailsChange}
             />
           </Form.Group>
           <Form.Group>
             <Form.Label>From</Form.Label>
             <Form.Control
               name="from"
               type="date"
               value={experienceDetails?.from}
               onChange={handleExperienceDetailsChange}
             />
           </Form.Group>
           <Form.Group>
             <Form.Label>To</Form.Label>
             <Form.Control
               name="to"
               type="date"
               value={experienceDetails?.to}
               onChange={handleExperienceDetailsChange}
             />
           </Form.Group>
           <Form.Group>
             <Form.Label>Position</Form.Label>
             <Form.Control
               name="course_job"
               type="text"
               value={experienceDetails?.course_job}
               onChange={handleExperienceDetailsChange}
             />
           </Form.Group>
           <Form.Group>
             <Form.Label>Description</Form.Label>
             <Form.Control
               name="description"
               type="text"
               value={experienceDetails?.description}
               onChange={handleExperienceDetailsChange}
             />
           </Form.Group>
           </Form.Group>

         
       ):
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
                <Form.Label>Tag Line</Form.Label>
                <Form.Control
                  name="tagLine"
               type="text"
                  value={personalDetails?.tagLine}
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
      <footer className="text-center p-3 mt-3 border" style={{ backgroundColor: "white", color: "black" }}>
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
