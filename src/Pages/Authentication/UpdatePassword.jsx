import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import { motion } from "framer-motion";

const UpdatePassword = ({ isMobile, setIsMobile }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setErrors({ password: "Both fields are required" });
    } else if (password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters" });
    } else if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
    } else {
      alert("Password updated successfully!");
      navigate("/login");
    }
  };

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />
      <div className="d-flex justify-content-center align-items-center vh-100" style={{
        background: "linear-gradient(135deg, rgb(255, 255, 255), rgb(255, 255, 255))",
        color: "#fff",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card p-4 shadow-lg border-0"
          style={{ width: "400px", borderRadius: "15px", background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)" }}
        >
          <h3 className="text-center mb-4">Update Password</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary w-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Password
            </motion.button>
          </form>
          <div className="text-center mt-3">
            Remember your password? <span className="text-dark" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>Login now</span>
          </div>
        </motion.div>
      </div>
      <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
    </>
  );
};

export default UpdatePassword;
