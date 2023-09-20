import React from 'react'
import logo from "../assets/logo_main.png"
import { Link } from "react-router-dom"
import { toast } from "react-hot-toast"
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function decodeBase64Url(token) {
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
}


const Navbar = (props) => {
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;
    let token = props.token;
    let setToken = props.setToken;

    let userRole;
    if (token) {
        const tokenPayload = decodeBase64Url(token.split(".")[1]);
        // console.log("this is for token in navbar");
        // console.log(tokenPayload);
        userRole = tokenPayload.role;
    }

    // const tokenPayload = decodeBase64Url(token.split(".")[1]);
    // const userRole = tokenPayload.role;

    // const userRole = 'student'
    return (
        <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>

            <Link to="/">
                <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
            </Link>

            <nav>
                <ul className='text-richblack-100 flex gap-x-6'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/About">About</Link>
                    </li>
                    <li>
                        <Link to="/Contact">Contact</Link>
                    </li>
                </ul>
            </nav>

            {/* Login - SignUp - LogOut - Dashboard */}
            <div className='flex items-center gap-x-4'>
                {!isLoggedIn &&
                    <Link to="/login">
                        <button className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                            Log in
                        </button>
                    </Link>
                }
                {!isLoggedIn &&
                    <Link to="/signup">
                        <button className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                            Sign up
                        </button>
                    </Link>
                }
                {isLoggedIn &&
                    <Link to="/">
                        <button onClick={() => {
                            setIsLoggedIn(false);
                            setToken(null);
                            toast.success("Logged Out");
                        }}
                            className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                            Log Out
                        </button>
                    </Link>
                }
                {isLoggedIn && userRole === 'student' &&
                    <Link to="/dashboard">
                        <button
                            className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                            Dashboard
                        </button>
                    </Link>
                }

                {
                    isLoggedIn && userRole === 'instructor' &&
                    <Link to="/instructor-dashboard">
                        <button
                            className='bg-richblack-800 text-richblack-100 py-[8px] 
                px-[12px] rounded-[8px] border border-richblack-700'>
                            Dashboard
                        </button>
                    </Link>
                }
            </div>

        </div>
    )
}

export default Navbar
