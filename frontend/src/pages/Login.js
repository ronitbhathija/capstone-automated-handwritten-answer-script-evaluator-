import React from 'react'
import Template from '../components/Template'
import loginImg from "../assets/login.png"

const Login = ({ setIsLoggedIn, setToken }) => {
  return (
    <Template
      title="Welcome Back"
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
      setToken={setToken}
    />
  )
}

export default Login
