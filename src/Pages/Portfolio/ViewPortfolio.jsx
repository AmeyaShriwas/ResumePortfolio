import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "./../../Assets/portfolio.jpeg";
import dummy from "./../../Assets/dummy.png";

const ViewPortfolio = () => {
    const data = {
      personalData: {
        name: "Ameya Shriwas",
        profilePhoto: logo,
        bio: "A passionate Full Stack Developer with expertise in React, React Native, and Node.js.",
        linkedin: "https://linkedin.com/in/ameya-shriwas",
        resume: "https://example.com/resume.pdf",
        languages: "JavaScript, TypeScript, Python",
        frontend: "React, React Native, Next.js, Tailwind",
        email: "ameya@example.com",
        phone: "+1234567890",
      },
      projects: [
        {
          projectName: "Amazon Clone",
          projectDescription: "An e-commerce platform built with React and Node.js, featuring authentication, secure checkout, and a recommendation engine.",
          projectImage: dummy,
          techStack: "React, Node.js, MongoDB, Redux",
          liveLink: "https://amazon-clone.com",
          githubLink: "https://github.com/ameya/amazon-clone",
        },
        {
          projectName: "Myntra Clone",
          projectDescription: "A fashion marketplace with a clean UI, secure payments, and a personalized shopping experience.",
          projectImage: dummy,
          techStack: "Next.js, Firebase, TailwindCSS",
          liveLink: "https://myntra-clone.com",
          githubLink: "https://github.com/ameya/myntra-clone",
        },
        {
          projectName: "Task Manager App",
          projectDescription: "A simple yet powerful task management app that helps users track daily tasks and manage projects efficiently.",
          projectImage: dummy,
          techStack: "React Native, Expo, Firebase",
          liveLink: "https://task-manager-app.com",
          githubLink: "https://github.com/ameya/task-manager",
        },
      ],
    };
  
    return (
      <div style={{ backgroundColor: "#3d5a80", minHeight: "100vh" }}>
        <nav className="navbar navbar-expand-lg navbar-dark p-4" style={{ backgroundColor: "#3d5a80", position: "sticky", top: 0 }}>
          <a className="navbar-brand h2 font-weight-bold text-light">{data.personalData.name}</a>
          <button style={{color:'white'}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="navbar-nav d-flex flex-lg-row flex-column text-center">
              {data.personalData.resume && (
                <a href={data.personalData.resume} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-2 mx-2 px-4 py-2 shadow">Resume</a>
              )}
              {data.personalData.email && (
                <a href={`mailto:${data.personalData.email}`} className="btn btn-outline-light mt-2 mx-2 px-4 py-2 shadow">Contact</a>
              )}
                <a className="btn btn-outline-light mt-2 mx-2 px-4 py-2 shadow">Login</a>
            </div>
          </div>
        </nav>
  
        <section className="text-center my-5 p-2">
          <img src={data.personalData.profilePhoto} alt="Profile" className="rounded-circle mt-3 shadow-lg border border-warning" style={{ width: "160px", height: "160px" }} />
          <h1 className="display-4 font-weight-bold text-light mt-3">{data.personalData.name}</h1>
          {data.personalData.bio && <p className="text-light">{data.personalData.bio}</p>}
          <div className="mt-4">
            {data.personalData.linkedin && (
              <a href={data.personalData.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-2 mx-2 px-4 py-2 shadow">LinkedIn</a>
            )}
            {data.personalData.resume && (
              <a href={data.personalData.resume} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-2 mx-2 px-4 py-2 shadow">Download Resume</a>
            )}
          </div>
        </section>
  
        <section id="projects" className="py-5" style={{ backgroundColor: "#3d5a80" }}>
          <h2 className="text-center mb-5 font-weight-bold text-uppercase text-light">Projects</h2>
          <div className="container">
            <div className="row">
              {data.projects.map((project, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
                  <div className="card border-0 shadow-lg rounded-lg w-100 mb-4">
                    <img src={project.projectImage} className="card-img-top rounded-top" alt={project.projectName} style={{ height: "200px" }} />
                    <div className="card-body text-center">
                      <h5 className="card-title font-weight-bold text-dark">{project.projectName}</h5>
                      <p className="card-text text-muted">{project.projectDescription}</p>
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm px-4 py-2">View Project</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <footer className="bg-dark text-light text-center py-3 mt-5">
          <p className="mb-0">© {new Date().getFullYear()} {data.personalData.name}. All rights reserved.</p>
        </footer>
      </div>
    );
};
  
export default ViewPortfolio;
