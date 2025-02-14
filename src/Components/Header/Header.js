import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Home, FileText, User, LogIn, UserPlus } from "lucide-react"; 

const Header = ({ isMobile, setIsMobile }) => {
  const [headerActive, setHeaderActive] = useState("HOME");
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const navigate = useNavigate();

  const headerData = [
    { name: "HOME", icon: <Home size={20} />, path: "/" },
    { name: "RESUME", icon: <FileText size={20} />, path: "/resumebuild" },
    { name: "PORTFOLIO", icon: <FileText size={20} />, path: "/portfolio" },
    // { name: "LOGIN", icon: <LogIn size={20} />, path: "/login" },
    // { name: "SIGNUP", icon: <UserPlus size={20} />, path: "/signup" },
  ];

  useEffect(() => {
    const fetchWidth = () => setIsMobile(window.innerWidth <= 800);
    fetchWidth();
    window.addEventListener("resize", fetchWidth);
    return () => window.removeEventListener("resize", fetchWidth);
  }, [setIsMobile]);

  const handleActiveHeader = (data) => {
    setHeaderActive(data.name);
    navigate(data.path);
    setToggleHamburger(false); // Close menu after selection on mobile
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-3 w-100 shadow-sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "linear-gradient(135deg,rgb(0, 0, 0),rgb(38, 69, 102))",
        color: "white",
      }}
    >
      {/* Logo */}
      <motion.div
        className="fw-bold fs-4"
        whileHover={{ scale: 1.1 }}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Resume & Portfolio
      </motion.div>

      {/* Desktop Navigation */}
      {!isMobile ? (
        <ul className="nav justify-content-around">
          {headerData.map((data, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-2"
              style={{
                color: data.name === headerActive ? "#FFD700" : "#FFF",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease-in-out",
                borderBottom: data.name === headerActive ? "2px solid #FFD700" : "none",
              }}
              onClick={() => handleActiveHeader(data)}
            >
              {data.icon} <span className="ms-2">{data.name}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        // Mobile Hamburger Menu
        <div onClick={() => setToggleHamburger(!toggleHamburger)} style={{ cursor: "pointer" }}>
          {toggleHamburger ? <X size={28} /> : <Menu size={28} />}
        </div>
      )}

      {/* Mobile Menu - Slide-in Animation */}
      {isMobile && toggleHamburger && (
        <motion.div
          className="mobile-menu position-absolute start-0 top-100 w-100 p-3 bg-white shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            overflow: "hidden",
            borderRadius: "0 0 10px 10px",
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
          }}
        >
          <ul className="list-unstyled">
            {headerData.map((data, index) => (
              <motion.li
                key={index}
                className="p-3 rounded d-flex align-items-center"
                whileHover={{ scale: 1.05 }}
                style={{
                  color: data.name === headerActive ? "#007bff" : "#333",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                  transition: "color 0.3s ease",
                  background: data.name === headerActive ? "#e3f2fd" : "transparent",
                }}
                onClick={() => handleActiveHeader(data)}
              >
                {data.icon} <span className="ms-2">{data.name}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
