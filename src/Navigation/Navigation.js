import React from 'react'
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import ErrorPage from '../Pages/404Page/ErrorPage'
import { useState } from 'react'
import ResumeBuild from '../Pages/ResumeBuild/ResumeBuild'
import SelectResume from '../Pages/SelectResume/SelectResume'
import Portfolio from '../Pages/Portfolio/Portfolio'
import ViewPortfolio from '../Pages/Portfolio/ViewPortfolio'
import PortfolioTwo from '../Pages/Portfolio/PortfolioTwo'
import UserLogin from '../Pages/Portfolio/UserLogin'
import UserSignup from '../Pages/Portfolio/UserSignup'
import UserForgotPassword from '../Pages/Portfolio/UserForgotPassword'
import UserUpdatePassword from '../Pages/Portfolio/UserUpdatePassword'
import UserVerifyOtp from '../Pages/Portfolio/UserVerifyOtp'


const Navigation = () => {
   const [isMobile, setIsMobile] = useState(false)
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/resumebuild' element={<ResumeBuild isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/selectResume' element={<SelectResume isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/portfolio' element={<Portfolio isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/portfolioTwo' element={<PortfolioTwo isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/user/login' element={<UserLogin isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/user/signup' element={<UserSignup isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/user/verify-otp' element={<UserVerifyOtp isMobile={isMobile} setIsMobile={setIsMobile}/>}/>

            <Route path='/user/forgotPassword' element={<UserForgotPassword isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/user/updatePassword' element={<UserUpdatePassword isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/viewPortfolio' element={<ViewPortfolio isMobile={isMobile} setIsMobile={setIsMobile}/>}/>

            <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default Navigation
