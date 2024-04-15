import React, { useEffect, useState } from 'react'
import { Add, CheckOutlined, ClearOutlined, DeleteForeverOutlined, ReplayOutlined, ThumbDownAltOutlined, Timeline, VerticalAlignBottom, Visibility } from '@mui/icons-material'
import { FaTimes } from "react-icons/fa"
import { UseAuthContext } from '../../contexts/AuthContext'
import { useApplicationContext } from '../../contexts/ApplicationContext';
import { UseCompanyContext } from '../../contexts/CompanyContext';
import IsLoading from '../../components/IsLoading';
import moment from 'moment';
import Tooltip from '../../components/Tooltip';

import microScope from "../../assets/microscope.png"
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';


const applicationsHeader = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "var(--lighter-blue)",
  padding: "1rem",
  gap: "1rem",
  borderRadius: "5px",
  marginBottom: "1rem"
}

const applicationsStatusFilter = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  borderBottom: "1px solid #1967D2"
}

const selectJob = {
  display: "flex",
  alignItems: "center",
  flex: "1",
  width: "100%"
}




const Applications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { user, token, successMessage, errorMessage, warningMessage } = UseAuthContext()
  const { applications, isLoading, getMyApplications, updateApplication, deleteApplication, applicationsResponse } = useApplicationContext()
  const [numOfPages, setNumOfPages] = useState(applicationsResponse && applicationsResponse.pages);
  const { companyJobs, getCompanyJobs } = UseCompanyContext()
  
  const [query, setQuery] = useState({
    job: "",
    status: ""
  })
  
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }
  
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, numOfPages));
  };
  // success notifications
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
    }
  }, [successMessage])

  // warning notifications
  useEffect(() => {
    if (warningMessage) {
      toast.success(warningMessage)
    }
  }, [warningMessage])

  // error notification
  useEffect(() => {
    if (errorMessage) {
      toast.success(errorMessage)
    }
  }, [errorMessage])



  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuery({
      ...query,
      [name]: value
    });
  };


  useEffect(() => {
    if (user.role == "company") {

      getCompanyJobs(user._id)
      getMyApplications("company", query.job)

    } else if (user.role == "employee") {
      getMyApplications("employee")
      console.log(applications)
    }
  }, [token, user, query])

  if (isLoading == true) {
    return <IsLoading />
  }





  return (
    <div className='applicationsPage'>


      {/* <ToastContainer /> */}

      {/* COMPANY APPLICATIONS */}
      {
        user && companyJobs && user.role == "company" && (

          <div className='company-applications'>
            <h3>All Applications</h3>
            {/* Applications section */}

            <section className='applicationSection'>
              {/* applications header */}
              <div style={applicationsHeader} className='applicationsHeader'>

                {/* select job */}
                <div style={selectJob}>

                  <select name="job" value={query.job} onChange={handleChange}>

                    <option value="">Select a job</option>
                    {
                      companyJobs.map((job, index) => {
                        return (
                          <option value={job._id} key={job._id}>{job.title}</option>
                        )
                      })
                    }
                  </select>
                </div>
                {/* end of select job */}

                {/* application status */}
                <div className="application-status-filter" style={applicationsStatusFilter}>
                  <div>
                    <label htmlFor="all">All</label>
                    <input type="radio" style={{ visibility: "hidden" }} name='' value={query.status} id='all' />
                  </div>
                  <div>
                    <label htmlFor="approved">Approved</label>
                    <input type="radio" style={{ visibility: "hidden" }} name='' value={query.status} id='approved' />
                  </div>
                  <div>
                    <label htmlFor="pending">Pending</label>
                    <input type="radio" style={{ visibility: "hidden" }} name='' value={query.status} id='pending' />
                  </div>
                </div>
                {/* end of applications status */}

              </div>
              {/* end of applications header */}


              {/* aplications list */}
              <div className='applications-list'>


                {

                  applications.length != 0 ?

                    applications.map((application, index) => {

                      const { candidate, applicationStatus, createdAt, resume } = application

                      {/* application */ }
                      return (


                        <div className='application' key={application._id}>
                          <div className='details'>
                            <div>
                              <h4><Link to={`/employee/${candidate._id}`}>{candidate.firstName} {candidate.lastName}</Link></h4>
                              <span className='status'>
                                <span className={applicationStatus}>{applicationStatus}</span>
                              </span>
                            </div>
                            <p>Applied Date: {moment(createdAt).format("d-mm-yyyy")}</p>

                          </div>

                          {/* actions buttons */}
                          <div className="actions-btns">

                            {/* First */}
                            <Tooltip text={"Create a meeting"} display={applicationStatus == "pending" ? "block" : "none"}>

                              <span onClick={() => {
                                updateApplication(application._id, "interviewing")
                                getMyApplications("company", query.job)
                              }}>
                                <Add style={{ fontWeight: "100", fontSize: "1rem" }} />
                              </span>
                            </Tooltip>
                            {/* end of first action btn */}


                            {/* second btn (approve, undoaprove, delete) */}
                            <Tooltip text={applicationStatus == 'pending'
                              ? "Approve"
                              : applicationStatus == "rejected"
                                ? "Delete"
                                : applicationStatus == "interviewing"
                                  ? "Approve"
                                  : "undo approve"}>

                              <span onClick={() => {

                                applicationStatus != "rejected"
                                  &&
                                  updateApplication(application._id, applicationStatus == "interviewing"
                                    ? "approved"
                                    : applicationStatus == "pending"
                                      ? "approved"
                                      : "pending")
                                getMyApplications(user.role, query.job)

                                applicationStatus == "rejected" && deleteApplication(application._id)

                                getMyApplications(user.role, query.job)


                              }

                              }>{

                                  applicationStatus == 'pending'
                                    ? <CheckOutlined style={{ fontWeight: "100", fontSize: "1rem" }} />

                                    : applicationStatus == 'interviewing'
                                      ? <CheckOutlined style={{ fontWeight: "100", fontSize: "1rem" }} />

                                      : applicationStatus == 'approved'
                                        ? <ReplayOutlined style={{ fontWeight: "100", fontSize: "1rem" }} />

                                        : <DeleteForeverOutlined style={{ fontWeight: "100", fontSize: "1rem" }} />
                                }  </span>
                            </Tooltip>
                            {/* end of second btn */}


                            {/* third btn reject application */}
                            <Tooltip text={"Reject application"} display={applicationStatus == 'rejected'
                              ? "none"
                              : applicationStatus == "approved"
                                ? "none"
                                : "block"}>
                              <span onClick={() => {
                                updateApplication(application._id, "rejected")

                                getMyApplications(user.role, query.job)
                              }}>{applicationStatus !== 'approved' ? <ThumbDownAltOutlined style={{ fontWeight: "100", fontSize: "1rem" }} /> : ""}  </span>
                            </Tooltip>

                            <Tooltip text={"Download cv"}>
                              <a href={resume} download target='_blank' >
                                <span>
                                  <VerticalAlignBottom style={{ fontWeight: "100", fontSize: "1rem" }} />
                                </span>
                              </a>
                            </Tooltip>

                            <Tooltip text={"View job"}>
                              <Link to={`/job/${application.job._id}`}>
                                <span>
                                  <Visibility style={{ fontWeight: "100", fontSize: "1rem" }} />
                                </span>
                              </Link>

                            </Tooltip>

                          </div>
                        </div>



                      )
                      {/* end of application */ }
                    })

                    :

                    <>
                      <div style={{ textAlign: "center", padding: "3rem 0" }}>
                        <img src={microScope} alt="" width={"30%"} />
                        <h3>No candidate has applied for this job.</h3>
                      </div>
                    </>
                }
              </div>
              {/* end of aplications list */}
            </section>
            {/* End of Applications section */}
          </div>
        )

      }
      {/* END OF COMPANY APPLICATIONS */}


      {/* EMPLOYEE APPLICATIONS */}
      {
        user && user.role == "employee" && (

          <div>
            <h3>Applied Jobs</h3>

            {/* applied jobs section */}
            <section className="applied-jobs">

              {/* aplications table */}
              <table>
                <thead>
                  <tr style={{
                    padding: "0 2rem "
                  }}>
                    <td>Job Title</td>
                    <td>Date Applied</td>
                    <td>Status</td>
                    <td>Actions</td>
                  </tr>
                </thead>

                <tbody>
                  {
                    applications && applications.length != 0 ?
                      applications.map((application, index) => {
                        const { job, _id, applicationStatus, createdAt } = application

                        return (
                          <tr className='application employee-application'>
                            <td className='title'>{job.title}</td>
                            <td className='date'>{moment(createdAt).format("d-mm-yyyy")}</td>
                            <td className='status'>
                              <span className={applicationStatus} >{applicationStatus}</span>
                            </td>
                            <td className='actions-btns'>

                              <Tooltip text={"Remove"}>
                                <span

                                  onClick={() => {
                                    deleteApplication(_id)
                                    getMyApplications(user.role)
                                  }}
                                >
                                  <ClearOutlined style={{ fontWeight: "100", fontSize: "1rem" }} />
                                </span>
                              </Tooltip>

                              <Tooltip text={"View job"}>
                                <Link to={`/job/${application.job._id}`}>
                                  <span>
                                    <Visibility style={{ fontWeight: "100", fontSize: "1rem" }} />
                                  </span>
                                </Link>

                              </Tooltip>
                            </td>
                          </tr>
                        )

                      })


                      :

                      <p style={{ textAlign: "center", padding: "3rem 0" }}>
                        <img src={microScope} alt="" width={"30%"} />
                        <h3>You've not applied for any job.</h3>
                        <Link to={"/jobs"} style={{ color: "#fff" }}>
                          <Button variant='contained'>
                            Find jobs
                          </Button>
                        </Link>

                      </p>
                  }
                </tbody>
              </table>
              {/* end of aplications table */}

              <div className="pagination" style={{display: "none"}}>
                
                <span onClick={handlePrevPage} style={{ display: currentPage === 1 ? "none" : "inline-flex" }} className="icon">
                  <GrLinkPrevious />
                </span>
                <span className="text">
                  <span className="currentPage">{currentPage}</span> of {numOfPages}</span>
                <span onClick={handleNextPage} style={{ display: currentPage === numOfPages ? "none" : "inline-flex" }} className="icon">
                  <GrLinkNext />
                </span>
              </div>

            </section>
            {/* end of applied jobs section */}
          </div>
        )
      }

      {/* END OF EMPLOYEE APPLICATIONS */}

    </div>
  )
}

export default Applications