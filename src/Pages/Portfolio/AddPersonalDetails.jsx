import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const PortfolioDetails = () => {
  const [personalData, setPersonalData] = useState({});
  const [projects, setProjects] = useState([
    { projectName: "", projectDescription: "", projectImage: null, techStack: "", liveLink: "", githubLink: "" },
  ]);

  const handlePersonalDataChange = (e) => {
    const { name, files, value } = e.target;
    setPersonalData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleProjectDataChange = (index, event) => {
    const { name, value, type, files } = event.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = type === "file" ? files[0] : value;
    setProjects(updatedProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append personal data
    Object.entries(personalData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append projects
    projects.forEach((project, index) => {
      Object.entries(project).forEach(([key, value]) => {
        if (value) {
          formData.append(`projects[${index}][${key}]`, value);
        }
      });
    });

    try {
      const response = await fetch("https://your-api-endpoint.com/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <Form className="p-4 border rounded bg-light shadow-sm" onSubmit={handleSubmit} encType="multipart/form-data">
        <h3 className="text-center mb-4">Personal Details</h3>
        <div className="row">
          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Ameya Shriwas" name="name" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Profile Photo</Form.Label>
            <Form.Control type="file" name="profilePhoto" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label>Short Bio</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Your expertise and what you do" name="bio" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>LinkedIn Profile</Form.Label>
            <Form.Control type="text" placeholder="LinkedIn Link" name="linkedin" onChange={handlePersonalDataChange} />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label>Resume (PDF)</Form.Label>
            <Form.Control type="file" name="resume" onChange={handlePersonalDataChange} />
          </Form.Group>
        </div>

        <h3 className="text-center mt-5 mb-4">Skills & Tech Stack</h3>
        <Form.Group className="mb-3">
          <Form.Label>Programming Languages</Form.Label>
          <Form.Control type="text" placeholder="JavaScript, TypeScript, Python" name="languages" onChange={handlePersonalDataChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Frontend Skills</Form.Label>
          <Form.Control type="text" placeholder="React, React Native, Next.js, Tailwind" name="frontend" onChange={handlePersonalDataChange} />
        </Form.Group>

        <h3 className="text-center mt-5 mb-4">Projects</h3>
        {projects.map((item, index) => (
          <div key={index} className="row mb-3 p-3 border rounded bg-light">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" placeholder="Project One" value={item.projectName} name="projectName" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Tech Stack</Form.Label>
              <Form.Control type="text" placeholder="React, Node.js" value={item.techStack} name="techStack" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Live Link</Form.Label>
              <Form.Control type="text" placeholder="https://project-live.com" value={item.liveLink} name="liveLink" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>GitHub Repository</Form.Label>
              <Form.Control type="text" placeholder="https://github.com/project" value={item.githubLink} name="githubLink" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            <Form.Group className="col-md-12 mb-3">
              <Form.Label>Project Image</Form.Label>
              <Form.Control type="file" name="projectImage" onChange={(e) => handleProjectDataChange(index, e)} />
            </Form.Group>

            {index > 0 && (
              <div className="col-md-12 text-end">
                <Button variant="danger" onClick={() => setProjects((prev) => prev.filter((_, i) => i !== index))}>
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="mt-3 text-center">
          <Button variant="primary" onClick={() => setProjects([...projects, { projectName: "", projectDescription: "", projectImage: null, techStack: "", liveLink: "", githubLink: "" }])}>
            Add More
          </Button>
        </div>

        <h3 className="text-center mt-5 mb-4">Contact</h3>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="your.email@example.com" name="email" onChange={handlePersonalDataChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="+1234567890" name="phone" onChange={handlePersonalDataChange} />
        </Form.Group>

        <div className="text-end mt-4">
          <Button variant="success" type="submit" className="me-2">Save</Button>
          <Button variant="primary">Next</Button>
        </div>
      </Form>
    </div>
  );
};

export default PortfolioDetails;
