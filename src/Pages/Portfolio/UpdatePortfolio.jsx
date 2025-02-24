import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Portfolio.css";

const UpdatePortfolioPage = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState({
    name: "",
    description: "",
    projects: [],
    images: [],
  });

  useEffect(() => {
    // Fetch portfolio data
    fetch(`/api/portfolios/${id}`)
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch((err) => console.error("Error fetching portfolio:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolio((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...portfolio.projects];
    updatedProjects[index][field] = value;
    setPortfolio((prev) => ({ ...prev, projects: updatedProjects }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated data
    fetch(`/api/portfolios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(portfolio),
    })
      .then((res) => res.json())
      .then((data) => console.log("Portfolio updated:", data))
      .catch((err) => console.error("Error updating portfolio:", err));
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-content">
        <h2 className="portfolio-title">Update Portfolio</h2>
        <form className="portfolio-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={portfolio.name} onChange={handleChange} className="input-field" />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={portfolio.description} onChange={handleChange} className="textarea-field"></textarea>
          </div>

          <h3 className="portfolio-section-title">Projects</h3>
          {portfolio.projects.map((project, index) => (
            <div key={index} className="project-item">
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                className="input-field"
              />
              <textarea
                value={project.description}
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                className="textarea-field"
              ></textarea>
            </div>
          ))}

          <h3 className="portfolio-section-title">Images</h3>
          <div className="portfolio-images">
            {portfolio.images.map((img, index) => (
              <img key={index} src={img} alt={`Portfolio ${index}`} className="portfolio-image" />
            ))}
          </div>

          <button type="submit" className="update-button">Update Portfolio</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePortfolioPage;
