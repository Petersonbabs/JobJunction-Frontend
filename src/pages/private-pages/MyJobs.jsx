import { Close, Create, Edit, Search } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { UseAuthContext } from '../../contexts/AuthContext'
import { UseJobContext } from '../../contexts/JobContext'
import { UseCompanyContext } from '../../contexts/CompanyContext'
import moment from 'moment'
import { FaEdit, } from "react-icons/fa"
import { Link } from 'react-router-dom'
import empty from "../../assets/empty-page.jpg"
import { Button } from '@mui/material'
import Tooltip from "../../components/Tooltip"
import IsLoading from "../../components/IsLoading"


const MyJobs = () => {


  const { user } = UseAuthContext()
  const { deleteJob, isLoading } = UseJobContext()
  const { getCompanyJobs, companyJobs } = UseCompanyContext()



  useEffect(() => {
    getCompanyJobs(user._id)
  }, [user._id])

  if (!companyJobs || companyJobs.length == 0) {
    return <div style={{ textAlign: "center" }}>

      <img src={empty} alt="" width={"400px"} style={{ margin: "0 auto 2rem ", display: "block" }} />
      <h3>You have not posted any jobs yet.</h3>
      <Button variant='contained' ><Link to={"/dashboard/post-job"} style={{ color: "#fff" }}><Create /> Post job</Link></Button>
    </div>
  }

  if(isLoading) {
    return <IsLoading />
  }



  return (
    <div className='my-jobs'>
      <h2>Manage Jobs</h2>

      {/* jobs section */}
      <section>
        {/* search & filter */}
        <div className="search ">
          <div className="search-input">
            <Search />
            <input type="text" placeholder='search' />
          </div>
        </div>
        {/* end of search & filter */}

        {/* jobs table */}

        <div className="jobs-table">

          {
            companyJobs
              ?
              <table style={{ marginTop: "2rem" }}>
                <thead>
                  <tr>
                    <th>Job Name</th>
                    <th>Appls</th>
                    <th>Status</th>
                    <th>Date posted</th>
                    <th>Actions</th>
                  </tr>
                </thead>


                <tbody>
                  {
                    companyJobs.map((job, index) => {
                      const { title, createdAt } = job

                      return (

                        <tr key={job._id} >
                          <td style={{ fontWeight: "500" }}>{title}</td>
                          <td >10</td>
                          <td>Open</td>
                          <td>{moment(createdAt).format("d-mm-yyyy")}</td>

                          <td className='action-btns'>

                            <Link to={`/dashboard/edit-job/${job._id}`}>
                              <Tooltip text={"Edit job"}>
                                <span><FaEdit /></span>
                              </Tooltip>
                            </Link>

                            <Tooltip text={"Remove"}>
                              <span onClick={() => {
                                deleteJob(job._id)
                                getCompanyJobs(user._id)
                              }}><Close /></span>
                            </Tooltip>

                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
              :
              <div className="spinner-border text-primary big-spinner" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
          }
        </div>
        {/* end of jobs table */}
      </section>
      {/* end of jobs section */}
    </div>
  )
}

export default MyJobs