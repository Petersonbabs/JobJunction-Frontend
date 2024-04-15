import React, { useEffect, useState } from 'react'
import { UseAuthContext } from '../../contexts/AuthContext'
import { BookmarkBorder, BookmarkOutlined, ChatBubbleOutline, WorkOutline } from '@mui/icons-material'
import { UseCompanyContext } from '../../contexts/CompanyContext'
import { useApplicationContext } from '../../contexts/ApplicationContext'
import IsLoading from '../../components/IsLoading'
import { FaUsers } from 'react-icons/fa'
import { MdOutlinePendingActions } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify'

const DashboardDefault = () => {

    const { user, warningMessage } = UseAuthContext()
    const { getCompanyJobs, companyJobs, isLoading } = UseCompanyContext()
    const { getMyApplications, applications } = useApplicationContext()
    toast.info(warningMessage);


    useEffect(()=>{
        if (warningMessage) {
          toast.info(warningMessage);
        }
      }, [warningMessage])
    
    let pending;
    let rejected;
    let approved;
    if(applications){
        pending = applications.filter(item => item.applicationStatus == "pending")
        rejected = applications.filter(item => item.applicationStatus == "rejected")
        approved = applications.filter(item => item.applicationStatus == "approved")
    }
    
    

    useEffect(() => {
        if (user.role == "company") {

            getCompanyJobs(user._id)
            getMyApplications("company")

        } else if (user.role == "employee") {
            getMyApplications("employee")

        }
    }, [user])

    useEffect(()=>{

    }, [])

    if(isLoading){
        return <IsLoading />
    }



    return (
        <div className='dashboardDefault'>
            <ToastContainer />
            <h3>Applications statistics</h3>
            <div>
                <div className='previewCard first'>
                    <span>
                        <WorkOutline className='icon'/>
                    </span>

                    <div className='right'>
                        {
                            companyJobs && (
                                <>
                                    <h2>{companyJobs.length}</h2>
                                    <p>Posted Jobs</p>
                                </>
                            )
                        }

                        {
                            user.role == "employee" && applications && (
                                <>
                                    <h2>{applications.length}</h2>
                                    <p>Applied jobs</p>
                                </>
                            )
                        }
                        
                    </div>
                </div>

                <div className='previewCard second'>
                    <span>
                        <FaUsers className='icon' fontSize={"1.5rem"}/>
                    </span>

                    <div className='right'>
                        
                        {
                            companyJobs && applications && (
                                <>
                                    <h2>{applications.length}</h2>
                                    <p>Applications</p>
                                </>
                            )
                        }

                        {
                            user.role == "employee" && applications && (
                                <>
                                    <h2>{rejected.length}</h2>
                                    <p>Rejected Aplpications</p>
                                </>
                            )
                        }
                        
                    </div>
                </div>

                <div className='previewCard third'>
                    <span>
                        <MdOutlinePendingActions className='icon' fontSize={"1.5rem"}/>
                    </span>

                    <div className='right'>
                        {
                            companyJobs && applications && (
                                <>
                                    <h2>{pending.length}</h2>
                                    <p>In Review</p>
                                </>
                            )
                        }

                        {
                            user.role == "employee" && applications && (
                                <>
                                    <h2>{pending.length}</h2>
                                    <p>Pending applications</p>
                                </>
                            )
                        }
                        
                    </div>
                </div>

                <div className='previewCard four'>
                    <span>
                        <BookmarkBorder className='icon'/>
                    </span>

                    <div className='right'>
                        {
                            companyJobs && applications && (
                                <>
                                    <h2>{approved.length}</h2>
                                    <p>Approved Candidates</p>
                                </>
                            )
                        }

                        {
                            user.role == "employee" && applications && (
                                <>
                                    <h2>{approved.length}</h2>
                                    <p>Approve Applications</p>
                                </>
                            )
                        }
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DashboardDefault