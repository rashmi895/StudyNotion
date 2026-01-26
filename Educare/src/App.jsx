import React from 'react'
import {Route,Routes} from "react-router-dom";
import OpenRoute from './Components/Core/Auth/openRoutes';
import SignUp from './Pages/signUp';
import Login from './Pages/Login';
import Navbar from './Components/Common/Navbar';
import Home from "./Pages/Home";
import AboutUs from './Pages/AboutUs';
import VerifyEmail from './Pages/verifyEmail';
import ForgotPassword from './Pages/forgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
const App = () => {
  return (
    <div >
      <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-inter">
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
         <Route path="signup" element={
              <OpenRoute>
                <SignUp/>
              </OpenRoute>
            } />
            <Route path="login" element={
              <OpenRoute>
                <Login/>
              </OpenRoute>
            } />  

              <Route path="verify-email" element={
              <OpenRoute>
                <VerifyEmail/>
              </OpenRoute>
            } /> 

             <Route path="forgot-password" element={
              <OpenRoute>
                <ForgotPassword/>
              </OpenRoute>
            } /> 

             <Route path="update-password" element={
              <OpenRoute>
                <UpdatePassword/>
              </OpenRoute>
            } /> 

 <Route path="about-us" element={
              <OpenRoute>
                <AboutUs/>
              </OpenRoute>
            } /> 

      </Routes>
      </div>
    </div>
  )
}

export default App;

