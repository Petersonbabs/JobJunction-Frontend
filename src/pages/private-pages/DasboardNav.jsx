import React from 'react'
import { UseAuthContext } from '../../contexts/AuthContext'
import Default from "../../assets/default-user.jpg"
import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { FaList, FaUserEdit } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { BookOutlined, CampaignOutlined, CreateOutlined, LocationOnOutlined, PowerSettingsNewOutlined } from '@mui/icons-material'

const DasboardNav = ({display, applicationText }) => {

    const { user, logout } = UseAuthContext()


    return (


        <div className='dashboardNav' >
            <div className="dashboardNavCon">
                {/* user image & name */}
                <div className='top-left'>
                    <div className='left'>
                        <img src={user.featuredImg || Default} width={"100%"} />
                    </div>

                    <div className="right">
                        <h4>{user.fullName}</h4>
                        <span style={{ lineHeight: "1", display: "block", marginBottom: "5px" }}><LocationOnOutlined fontSize='xs' /> {user.location || "No location"}</span>

                        <Link style={{ color: "#fff", background: "var(--blue)", fontSize: "14px", padding: "5px", borderRadius: "5px" }} to={user.role == "company" ? `/company/${user._id}` : `/employee/${user._id}`}>view profile</Link>

                    </div>
                </div>
                {/*end of  user image & name */}

                {/* DASHBOARD NAV LIST */}
                <div className="nav-list">
                    <List>

                        {/* dashboard link*/}
                        <Link to={"/dashboard"}>
                            <ListItem disablePadding className='listItem'>
                                <ListItemButton className='listBtn' sx={{ "&:hover": { background: "transparent" } }}>
                                    <BookOutlined className='navIcon' />
                                    <ListItemText primary="User Dashboard" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {/* end of dashboard link*/}

                        {/* My jobs link*/}
                        <Link to={"/dashboard/my-jobs"} style={{
                            display: display
                        }}>
                            <ListItem disablePadding className='listItem'>
                                <ListItemButton className='listBtn' sx={{ "&:hover": { background: "transparent" } }}>
                                    <CampaignOutlined className='navIcon' />
                                    <ListItemText primary="My Jobs" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {/* end of My jobs link*/}

                        {/* applications link*/}
                        <Link to={"/dashboard/applications"}>
                            <ListItem disablePadding className='listItem'>
                                <ListItemButton className='listBtn' sx={{ "&:hover": { background: "transparent" } }}>
                                    <FaList className='navIcon' />
                                    <ListItemText primary={applicationText} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {/* end of applications link*/}

                        {/* post job link */}
                        <Link to={"/dashboard/post-job"} style={{
                            display: display
                        }}>
                            <ListItem disablePadding className='listItem'>
                                <ListItemButton className='listBtn' sx={{ "&:hover": { background: "transparent" } }}>
                                    <CreateOutlined className='navIcon' />
                                    <ListItemText primary="Post Job" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {/*end of post job link */}



                        {/* edit profile link */}
                        <Link to={`/dashboard/edit-profile/${user._id}`}>
                            <ListItem disablePadding className='listItem'>
                                <ListItemButton className='listBtn' sx={{ "&:hover": { background: "transparent" } }}>
                                    <FaUserEdit className='navIcon' />
                                    <ListItemText primary="Edit Profile" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {/*end of edit profile link */}


                        {/* logout */}
                        <Link onClick={logout}>
                            <ListItem disablePadding className='listItem'>
                                <ListItemButton className='listBtn' sx={{ "&:hover": { background: "transparent" } }}>
                                    <PowerSettingsNewOutlined className='navIcon' />
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        {/*end of logout */}




                    </List>

                </div>
                {/* END OF DASHBOARD NAV LIST */}
            </div>
        </div >
    )
}

export default DasboardNav