import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../assets/Job-j-logo.png"
import Default from "../assets/default-user.jpg"
import { openNav } from './VerticalNav';
import { IoIosArrowDown } from "react-icons/io";

import { UseAuthContext } from '../contexts/AuthContext';

import "../style/NavStyle.css"
import { FaAngleDown, FaRegistered } from 'react-icons/fa';
import { CampaignOutlined, CreateOutlined, DashboardOutlined, Login, ManageAccountsOutlined, PeopleOutline, Person2Sharp, PersonAddAlt, PersonOutline, PowerSettingsNewOutlined } from '@mui/icons-material';
import { CiMenuFries } from "react-icons/ci";


const Navbar = () => {

    const { user, logout } = UseAuthContext()
    const [openUserMenu, setOpenUserMenu] = useState(false)

    const userIcon = document.querySelector(".navUserIcon")
    const handleUserMenu = () => {
        setOpenUserMenu(true)
    }





    return (
        <div className='nav'>
            {/* NAV CONTAINER */}
            <div className="navCon">

                {/* nav left */}
                <Link to={"/"}>
                    <div className="navLeft">
                        <div className='logoDiv'>
                            <img src={Logo} className='logo' width={"100%"} />
                        </div>
                    </div>
                </Link>
                {/* end of nav left */}

                {/* nav Middle */}
                <div className="navMiddle">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/jobs"}>Jobs</Link>
                    <Link to={"/companies"}>Companies</Link>
                    <Link to={"/employees"}>Job Seekers</Link>
                    <Link to={"/contact"}>Contact</Link>
                </div>
                {/* end of nav Middle */}

                {/* nav Right */}
                <div className="navRight">

                    {/*   GUEST USER */}
                    {
                        !user && (

                            <>
                                <div className='guestUserIcon'>
                                    <div className='navUserIcon' onMouseEnter={handleUserMenu} onMouseLeave={() => { setOpenUserMenu(false) }}>

                                        <PersonOutline />

                                        {
                                            openUserMenu && (
                                                <div className="userDropdown">

                                                    <Link to={"/login"}>
                                                        <Login fontSize='sm' /> <span>Login</span>
                                                    </Link>

                                                    <Link to={"/signup"}>
                                                        <PersonAddAlt fontSize='sm' /> <span>Signup</span>
                                                    </Link>
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>

                                <div className="guestUseAuths">
                                    <Link to={"/login"} className='login'>
                                        Login
                                    </Link>
                                        
                                    <Link to={"/signup"} className='signup'>
                                        Signup
                                    </Link>
                                </div>
                            </>
                        )
                    }
                    {/*   END OF GUEST USER */}
                    {

                    }

                    {/* AUTHENTICATED USER */}
                    {
                        user && (

                            <div className=''>
                                {
                                    user.role == "employee" && (

                                        // EMPLOYEE DROPDOWN
                                        <div className='navUserIcon' onMouseEnter={handleUserMenu} onMouseLeave={() => { setOpenUserMenu(false) }}>
                                            <div className="userImg">
                                                <img src={user.featuredImg || Default} alt="" width={"100%"} />
                                            </div>
                                            <span>
                                                Hi, {user.firstName}
                                                <FaAngleDown />
                                            </span>

                                            {
                                                openUserMenu && (
                                                    <div className="userDropdown">
                                                        <Link to={"/dashboard"}>
                                                            <DashboardOutlined /> <span>Dashboard</span>
                                                        </Link>

                                                        <Link to={"/dashboard/applications"}>
                                                            <CampaignOutlined /> <span>Applied Jobs</span>
                                                        </Link>

                                                        <Link to={`/dashboard/edit-profile/${user._id}`}>
                                                            <ManageAccountsOutlined /> <span>Edit Profile</span>
                                                        </Link>

                                                        <Link onClick={logout}>
                                                            <PowerSettingsNewOutlined /> <span>Logout</span>
                                                        </Link>
                                                    </div>
                                                )
                                            }

                                        </div>
                                        // END OF EMPLOYEE DROPDOWN
                                    )
                                }

                                {

                                    user.role == "company" && (

                                        // COMPANY DROPDOWN

                                        <div className='navUserIcon' onMouseEnter={handleUserMenu} onMouseLeave={() => { setOpenUserMenu(false) }}>
                                            <div className="userImg">
                                                <img src={user.featuredImg || Default} alt="" width={"100%"} />
                                            </div>
                                            <span>
                                                Hi {user.firstName}
                                                <FaAngleDown />
                                            </span>

                                            {
                                                openUserMenu && (
                                                    <div className="userDropdown">
                                                        <Link to={"/dashboard"}>
                                                            <DashboardOutlined /> <span>Dashboard</span>
                                                        </Link>

                                                        <Link to={"/dashboard/my-jobs"}>
                                                            <CampaignOutlined /> <span>My Jobs</span>
                                                        </Link>

                                                        <Link to={"/dashboard/post-job"}>
                                                            <CreateOutlined /> <span>Post Job</span>
                                                        </Link>


                                                        <Link to={"/dashboard/applications"}>
                                                            <PeopleOutline /> <span>Applications</span>
                                                        </Link>


                                                        <Link to={`/dashboard/edit-profile/${user._id}`}>
                                                            <ManageAccountsOutlined /> <span>Edit Profile</span>
                                                        </Link>

                                                        <Link onClick={logout}>
                                                            <PowerSettingsNewOutlined /> <span>Logout</span>
                                                        </Link>
                                                    </div>
                                                )
                                            }

                                        </div>

                                        // END OF COMPANY DROPDOWN
                                    )
                                }
                            </div>
                        )
                    }
                    {/* END OF AUTHENTICATED USER */}



                    {/* PERMANENT MENU ICON */}
                    <div className="pMenu" onClick={openNav}>
                        <CiMenuFries className='icon' />
                    </div>
                    {/* END OF PERMANENT MENU ICON */}

                    {/* HEADER CTA */}
                    {
                        user && (

                            <div className="headerCta">
                                <Link to={user.role == 'employee' ? "/jobs" : "/dashboard/post-job"}>{user.role == 'employee' ? "Find Jobs" : "Post Job"}</Link>
                            </div>
                        )
                    }
                    {/* END OF HEADER CTA */}

                </div>
                {/* end of nav Right */}

            </div>
            {/* END OF NAV CONTAINER */}
        </div >
    )
}

export default Navbar