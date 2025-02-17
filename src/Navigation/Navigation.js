import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../Pages/Home/Home';
import ResumeBuild from '../Pages/ResumeBuild/ResumeBuild';
import SelectResume from '../Pages/SelectResume/SelectResume';
import Portfolio from '../Pages/Portfolio/Portfolio';
import ViewPortfolio from '../Pages/Portfolio/ViewPortfolio';
import PortfolioTwo from '../Pages/Portfolio/PortfolioTwo';
import UserLogin from '../Pages/Portfolio/UserLogin';
import UserSignup from '../Pages/Portfolio/UserSignup';
import UserForgotPassword from '../Pages/Portfolio/UserForgotPassword';
import UserUpdatePassword from '../Pages/Portfolio/UserUpdatePassword';
import UserVerifyOtp from '../Pages/Portfolio/UserVerifyOtp';
import ErrorPage from '../Pages/404Page/ErrorPage';
import ProtectedRoute from './ProtectedRotes'; // Import the ProtectedRoute component

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn } = useSelector(state => state.user);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Auth routes - available to everyone */}
          <Route path="/" element={<Home isMobile={isMobile} setIsMobile={setIsMobile} />} />
          <Route path="/user/login" element={<UserLogin isMobile={isMobile} setIsMobile={setIsMobile} />} />
          <Route path="/user/signup" element={<UserSignup isMobile={isMobile} setIsMobile={setIsMobile} />} />
          <Route path="/user/verify-otp" element={<UserVerifyOtp isMobile={isMobile} setIsMobile={setIsMobile} />} />
          <Route path="/user/forgotPassword" element={<UserForgotPassword isMobile={isMobile} setIsMobile={setIsMobile} />} />
          <Route path="/user/updatePassword" element={<UserUpdatePassword isMobile={isMobile} setIsMobile={setIsMobile} />} />

          {/* Protected routes - only accessible if logged in */}
          <Route
            path="/resumebuild"
            element={<ProtectedRoute element={ResumeBuild} isMobile={isMobile} setIsMobile={setIsMobile} />}
          />
          <Route
            path="/selectResume"
            element={<ProtectedRoute element={SelectResume} isMobile={isMobile} setIsMobile={setIsMobile} />}
          />
          <Route
            path="/portfolio"
            element={<ProtectedRoute element={Portfolio} isMobile={isMobile} setIsMobile={setIsMobile} />}
          />
          <Route
            path="/portfolioTwo"
            element={<ProtectedRoute element={PortfolioTwo} isMobile={isMobile} setIsMobile={setIsMobile} />}
          />
          <Route
            path="/viewPortfolio"
            element={<ProtectedRoute element={ViewPortfolio} isMobile={isMobile} setIsMobile={setIsMobile} />}
          />

          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Navigation;
