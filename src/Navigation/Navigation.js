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
import Signup from '../Pages/Authentication/Signup'
import Login from '../Pages/Authentication/Login'
import ForgotPassword from '../Pages/Authentication/ForgotPassword'
import UpdatePassword from '../Pages/Authentication/UpdatePassword'
import ViewPortfolio from '../Pages/Portfolio/ViewPortfolio'


const Navigation = () => {
   const [isMobile, setIsMobile] = useState(false)
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/signup' element={<Signup isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/login' element={<Login isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/forgotPassword' element={<ForgotPassword isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/updatePassword' element={<UpdatePassword isMobile={isMobile} setIsMobile={setIsMobile}/>}/>



            <Route path='/resumebuild' element={<ResumeBuild isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/selectResume' element={<SelectResume isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/portfolio' element={<Portfolio isMobile={isMobile} setIsMobile={setIsMobile}/>}/>
            <Route path='/viewPortfolio' element={<ViewPortfolio isMobile={isMobile} setIsMobile={setIsMobile}/>}/>

            <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default Navigation
