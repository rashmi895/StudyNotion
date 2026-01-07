import React from 'react'
import {Route,Routes} from "react-router-dom";
import OpenRoute from './Components/Core/Auth/openRoutes';
import SignupForm from './Components/Core/Auth/SignUpForm';
import LoginForm from './Components/Core/Auth/LoginForm';
import Home from "./Pages/Home";
const App = () => {
  return (
    <div >
      <div className="w-screen min-h-screen bg-[#000814] flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
         <Route path="signup" element={
              <OpenRoute>
                <SignupForm/>
              </OpenRoute>
            } />
            <Route path="login" element={
              <OpenRoute>
                <LoginForm/>
              </OpenRoute>
            } />  
      </Routes>
      </div>
    </div>
  )
}

export default App;

