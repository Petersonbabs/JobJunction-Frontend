import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../assets/Job-junction-logo-real.png"
import Default from "../assets/default-user.jpg"
import { openNav } from './VerticalNav';
import { IoIosArrowDown } from "react-icons/io";

import { UseAuthContext } from '../contexts/AuthContext';

import "../style/NavStyle.css"
import { FaAngleDown } from 'react-icons/fa';
import { CampaignOutlined, CreateOutlined, DashboardOutlined, PeopleOutline, Person2Sharp, PersonOutline, PowerOffOutlined, PowerSettingsNewOutlined } from '@mui/icons-material';

const Nav = () => {

    const { user, logout } = UseAuthContext()
    const [openUserMenu, setOpenUserMenu] = useState(true)

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
                        <img src={Logo} className='logo' width={"100%"} />
                        <h3>JobJunction</h3>

                    </div>
                </Link>
                {/* end of nav left */}

                {/* nav Middle */}
                <div className="navMiddle">

                </div>
                {/* end of nav Middle */}

                {/* nav Right */}
                <div className="navRight">

                    {/*   GUEST USER */}
                    {
                        !user && (
                            <div className='guestUserIcon'>
                                <div className='navUserIcon' onMouseEnter={handleUserMenu} onMouseLeave={() => { setOpenUserMenu(false) }}>
                                            
                                            <PersonOutline />

                                            {
                                                openUserMenu && (
                                                    <div className="userDropdown">

                                                        <Link to={"/login"}>
                                                            <PowerSettingsNewOutlined /> <span>Login</span>
                                                        </Link>
                                                    </div>
                                                )
                                            }

                                        </div>
                            </div>
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
                                                Hi {user.firstName}
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
                                                            <PersonOutline /> <span>Edit Profile</span>
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


                                                        <Link to={"/dashboard/my-jobs"}>
                                                            <PeopleOutline /> <span>Applications</span>
                                                        </Link>


                                                        <Link to={`/dashboard/edit-profile/${user._id}`}>
                                                            <PersonOutline /> <span>Edit Profile</span>
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
                        <MenuIcon className='icon' />
                    </div>
                    {/* END OF PERMANENT MENU ICON */}
                </div>
                {/* end of nav Right */}

            </div>
            {/* END OF NAV CONTAINER */}
        </div >
    )
}

export default Nav