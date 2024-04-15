import React from 'react'
import { UseJobContext } from '../contexts/JobContext'
import Default from "../assets/default-user.jpg"
import { LocationOnOutlined, MonetizationOn, PaymentOutlined, Work, WorkOutlineOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const JobCard = ({ featureImg, title, category, location, salary, status,link }) => {




    return (
        <div className='jobCard'>
            <div className=" left">
                <img src={featureImg || Default} />
            </div>

            <div className="right">
                <Link to={link}>
                    <h3>{title || "No title"}</h3>
                </Link>
                <div className='details'>
                    <span>
                        <WorkOutlineOutlined className='icon' />
                        <span>{category || "No category"}</span>
                    </span>
                    <span>
                        <LocationOnOutlined className='icon' />
                        <span>{location || "No location"}</span>
                    </span>
                    <span>
                        <PaymentOutlined className='icon' />
                        <span>{salary || "No salary"}</span>
                    </span>
                </div>
            </div>

            <span className={status} id='status'>{status || "open"}</span>
        </div>
    )
}

export default JobCard