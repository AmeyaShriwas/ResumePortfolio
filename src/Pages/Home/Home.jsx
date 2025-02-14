import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Home = ({ isMobile, setIsMobile }) => {
  const navigate = useNavigate();

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />

      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Text Section */}
        <motion.div 
          className="text-section"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="title">
            🚀 Create a Stunning Resume & Portfolio <br /> **in Minutes – Free!**
          </h1>
          <p className="description">
            Build your resume and portfolio effortlessly with our free online tools. 
            Showcase your skills, experience, and projects with a beautifully designed portfolio, 
            or craft a professional resume that stands out.
          </p>

          {/* Buttons */}
          <div className="button-group">
            <motion.button 
              className="btn resume-btn"
              onClick={() => navigate("/resumeBuild")}
              whileHover={{ scale: 1.1 }}
            >
              ✍️ Create a Resume Now
            </motion.button>

            <motion.button 
              className="btn portfolio-btn"
              onClick={() => navigate("/portfolioBuild")}
              whileHover={{ scale: 1.1 }}
            >
              🌟 Create a Portfolio Now
            </motion.button>
          </div>
        </motion.div>

        {/* Image Section */}
        {/* <motion.div 
          className="image-section"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="https://media.istockphoto.com/id/1412764569/photo/resume-and-keyboard-on-the-table-closeup.jpg?s=612x612&w=0&k=20&c=ZwTB59-CJq9yZADaO4j5cxaW9wlIUexcx4_iNjrNGXw="
            alt="Resume Builder"
            className="hero-image"
          />
        </motion.div> */}
      </motion.div>

      <Footer isMobile={isMobile} />

      {/* Styles */}
      <style jsx>{`
        .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 50px 20px;
          // background: linear-gradient(to right,rgb(0, 0, 0),rgb(136, 122, 103));
          color: black;
          min-height: 80vh;
        }
        .text-section {
          min-width: 300px;
          margin-bottom: 30px;
        }
        .title {
          font-size: 60px;
          font-weight: bold;
          line-height: 1.3;
        }
        .description {
          font-size: 20px;
          margin-top: 10px;
          opacity: 0.9;
        }
        .button-group {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 30px;
        }
        .btn {
          padding: 15px 25px;
          font-size: 18px;
          font-weight: bold;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .resume-btn {
          background: linear-gradient(to right, #007bff, #00c6ff);
        }
        .portfolio-btn {
          background: linear-gradient(to right, #28a745, #00ff99);
        }
        .btn:hover {
          transform: scale(1.1);
          box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
        }
        .image-section {
          max-width: 500px;
        }
        .hero-image {
          width: 100%;
          border-radius: 20px;
          box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 768px) {
          .title {
            font-size: 32px;
          }
          .description {
            font-size: 18px;
          }
          .btn {
            font-size: 16px;
            padding: 12px 20px;
          }
          .image-section {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
