import { BookOutlined, CampaignOutlined, CreateOutlined, Person2Outlined, PowerSettingsNewOutlined } from '@mui/icons-material'
import { List, ListItem, ListItemButton } from '@mui/material'
import React from 'react'
import { FaList } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { UseAuthContext } from '../../contexts/AuthContext'

const SmallDashboardNav = ({ navShown, display }) => {
    const {user, logout} = UseAuthContext()


    return (
        <div className='smallDashboardNav' style={{ width: navShown ? "10%" : 0 }}>

            <List disablePadding>
                {/* dashboard */}

                <Link to={"/dashboard"}>
                    <ListItem className='listItem'>
                        <ListItemButton className='listButton'>
                            <BookOutlined />
                        </ListItemButton>
                    </ListItem>
                </Link>
                {/* end of dashboard */}

                {/* my jobs */}
                <Link to={"/dashboard/my-jobs"} style={{
                    display: display
                }}>
                    <ListItem className='listItem'>
                        <ListItemButton className='listButton'>
                            <CampaignOutlined />
                        </ListItemButton>
                    </ListItem>
                </Link>
                {/* end of my jobs */}

                {/* applications */}
                <Link to={"/dashboard/applications"}>
                    <ListItem className='listItem'>
                        <ListItemButton className='listButton'>
                            <FaList />
                        </ListItemButton>
                    </ListItem>
                </Link>
                {/* end of applications */}

                {/* post job */}
                <Link to={"/dashboard/post-job"} style={{
                    display: display
                }}>
                    <ListItem className='listItem'>
                        <ListItemButton className='listButton'>
                            <CreateOutlined />
                        </ListItemButton>
                    </ListItem>
                </Link>
                {/* end of post job */}

                {/* edit profile */}
                <Link to={`/dashboard/edit-profile/${user._id}`}>
                    <ListItem className='listItem'>
                        <ListItemButton className='listButton'>
                            <Person2Outlined />
                        </ListItemButton>
                    </ListItem>
                </Link>
                {/* end of profile*/}

                {/* logout */}
                <Link onClick={logout}>
                    <ListItem className='listItem'>
                        <ListItemButton className='listButton'>
                            <PowerSettingsNewOutlined />
                        </ListItemButton>
                    </ListItem>
                </Link>
                {/* end of logout */}
            </List>
        </div>
    )
}

export default SmallDashboardNav