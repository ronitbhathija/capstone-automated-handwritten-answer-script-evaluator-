import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ForgetPassword from "./pages/ForgetPassword";
import Dashboard from "./pages/Dashboard"
import InstructorDashboard from "./pages/InstructorDashboard"
import { useEffect, useState } from 'react'
import PrivateRoute from "./components/PrivateRoute";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);



  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken} />

      <Routes>

        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login/forgetpassword" element={<ForgetPassword />} />

        <Route path="/instructor-dashboard" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <InstructorDashboard />
          </PrivateRoute>
        } />

        <Route path="/dashboard" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </PrivateRoute>

        } />

      </Routes>

    </div>
  )
}

export default App;
