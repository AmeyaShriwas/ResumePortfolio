import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaSave, FaUpload, FaUser, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";
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
    <div className="container-fluid p-0" style={{ background: "white", minHeight: "100vh" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-dark text-light p-3">
        <h4 className="m-0">{formData.name}'s Portfolio</h4>
        <button className="btn btn-outline-light">
          <FaUser /> Login
        </button>
      </header>

      <div className="container py-5">
        <div className="row">
          <div className="col-md-3 text-center border p-4">
            <img
              src={`https://api.resumeportfolio.ameyashriwas.in/${formData.profilePhoto?.replace(/^\/+/, "")}`}
              alt="Profile"
              className="rounded-circle border border-warning shadow-lg"
              style={{ width: "140px", height: "140px" }}
            />
            <h5 className="mt-3">{formData.name}</h5>
            {formData.bio && <p>{formData.bio}</p>}
            <a href={formData.linkedin} target="_blank" className="btn btn-primary m-2">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={`mailto:${formData.email}`} className="btn btn-dark m-2">
              <FaEnvelope /> Contact
            </a>
            <a href={formData.resume} className="btn btn-secondary m-2" download>
              <FaFileAlt /> Download Resume
            </a>
          </div>

          <div className="col-md-9">
            <h2 className="text-center mb-4">Update Portfolio</h2>
            <div className="mb-3">
              <label className="form-label">Profile Picture</label>
              <input type="file" name="profilePhoto" className="form-control" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
            <button className="btn btn-success w-100" onClick={handleSave}>
              <FaSave /> Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        &copy; {new Date().getFullYear()} {formData.name}'s Portfolio
      </footer>
    </div>
  );
};

export default UpdatePortfolioPage;
