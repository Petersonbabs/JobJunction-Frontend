import React from 'react'
import Logo from "../assets/Job-junction-logo-real.png"
import { FaAngleRight, FaForward, FaUser } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { UseAuthContext } from '../contexts/AuthContext'
import { ClearOutlined } from '@mui/icons-material'


const verticalNavCon = document.querySelector(".verticalNavCon")
// let navBackdrop = document.querySelector(".navBackdrop")
export const openNav = (e) => {
    let navBackdrop = document.querySelector(".navBackdrop")
    navBackdrop.classList.add("showVerticalNav")
}


export const closeNav = (e) => {
    let navBackdrop = document.querySelector(".navBackdrop")
    const navHeader = document.querySelector(".header")
    const verticalNav = document.querySelector(".verticalNav")

    if (
        !verticalNav.contains(e.target) &&
        !navHeader.contains(e.target) ||
        verticalNav.contains(e.target) &&
        e.target.tagName == "A" ||
        e.target.tagName == "button" ||
        e.target.tagName == "I" ||
        navHeader.contains(e.target) &&
        e.target.tagName == "A" ||
        e.target.tagName == "IMG" ||
        e.target.tagName == "svg" ||
        e.target.tagName == "path") {
        navBackdrop.classList.remove("showVerticalNav")
    }
}



const VerticalNav = () => {



    const { user } = UseAuthContext()



    return (
        <div className="navBackdrop " onClick={closeNav}>
            <div className='verticalNavCon'>
                <div className='header'>
                    <div className="logo">
                        <Link to={"/"}>
                            <img src={Logo} alt="" width={"100%"} />
                        </Link>
                    </div>

                    <div className="icons">
                        <Link to={"/dashboard"}>
                            <FaUser className='icon' />
                        </Link>

                        <ClearOutlined className='icon' />
                    </div>
                </div>
                <div className='verticalNav'>

                    <div className="links">

                        <Link to={"/"} >
                            Home
                            <FaAngleRight />
                        </Link>
                        <Link to={"/jobs"}>
                            Jobs
                            <FaAngleRight />
                        </Link>
                        <Link to={"/companies"}>
                            Companies
                            <FaAngleRight />
                        </Link>
                        <Link to={"/employees"}>
                            Job Seekers
                            <FaAngleRight />
                        </Link>
                    </div>


                    <button>
                        {
                            !user && <Link to={"/login"}>Login</Link>
                                ||

                                user.role === "employee" ?
                                <Link to={"/jobs"}>Find Jobs</Link>
                                :
                                <Link to={"/dashboard/post-job"}>Post Job</Link>
                        }
                    </button>

                    <div className="siteInfo">
                        <h3>Call us</h3>
                        <h4>+234 808 332 1116</h4>
                        <span>timiebabs@gmail.com</span>
                    </div>

                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerticalNav

