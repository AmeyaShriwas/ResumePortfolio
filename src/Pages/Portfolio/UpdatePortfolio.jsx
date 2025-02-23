import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaSave, FaUpload } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const UpdatePortfolioPage = () => {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.resumeportfolio.ameyashriwas.in/portfolio/${id}`
      );
      setData(response.data.data);
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
      updatedData.append(key, formData[key]);
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

  if (!data) {
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
            <label className="form-label">Resume (PDF)</label>
            <input type="file" name="resume" className="form-control" onChange={handleFileChange} />
          </div>
          <button className="btn btn-success w-100" onClick={handleSave}>
            <FaSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePortfolioPage;
