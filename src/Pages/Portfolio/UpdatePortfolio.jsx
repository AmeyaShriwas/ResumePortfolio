import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaSave, FaUpload } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const UpdatePortfolioPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    linkedin: "",
    email: "",
    phone: "",
    skills: "",
    profilePhoto: null,
    resume: null,
    projects: [],
  });
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`
      );
      setFormData(response.data.data);
    } catch (error) {
      console.error("Error fetching portfolio data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData({ ...formData, [name]: file });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index][name] = value;
    setFormData({ ...formData, projects: updatedProjects });
  };

  const handleSave = async () => {
    const updatedData = new FormData();
    for (const key in formData) {
      if (key === "projects") {
        updatedData.append(key, JSON.stringify(formData[key]));
      } else {
        updatedData.append(key, formData[key]);
      }
    }
    try {
      await axios.put(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Portfolio updated successfully!");
      fetchData();
    } catch (error) {
      console.error("Error updating portfolio", error);
    }
  };

  if (!formData.name) {
    return <div className="text-center text-dark py-5">Loading...</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Update Portfolio</h2>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input type="file" name="profilePhoto" className="form-control" onChange={handleFileChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea name="bio" className="form-control" value={formData.bio} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">LinkedIn</label>
            <input type="text" name="linkedin" className="form-control" value={formData.linkedin} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Skills</label>
            <input type="text" name="skills" className="form-control" value={formData.skills} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Resume (PDF)</label>
            <input type="file" name="resume" className="form-control" onChange={handleFileChange} />
          </div>
          <h4 className="mt-4">Projects</h4>
          {formData.projects.map((project, index) => (
            <div key={index} className="border p-3 my-3">
              <div className="mb-3">
                <label className="form-label">Project Name</label>
                <input type="text" name="projectName" className="form-control" value={project.projectName} onChange={(e) => handleProjectChange(index, e)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Project Description</label>
                <textarea name="projectDescription" className="form-control" value={project.projectDescription} onChange={(e) => handleProjectChange(index, e)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Tech Stack</label>
                <input type="text" name="techStack" className="form-control" value={project.techStack} onChange={(e) => handleProjectChange(index, e)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Live Link</label>
                <input type="text" name="liveLink" className="form-control" value={project.liveLink} onChange={(e) => handleProjectChange(index, e)} />
              </div>
              <div className="mb-3">
                <label className="form-label">GitHub Link</label>
                <input type="text" name="githubLink" className="form-control" value={project.githubLink} onChange={(e) => handleProjectChange(index, e)} />
              </div>
            </div>
          ))}
          <button className="btn btn-success w-100" onClick={handleSave}>
            <FaSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePortfolioPage;
