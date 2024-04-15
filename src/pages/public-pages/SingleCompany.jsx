import React, { useEffect, useState } from 'react'
import Default from "../../assets/default-user.jpg"
import { EmailOutlined, LocationOn, LocationOnOutlined, PhoneOutlined } from '@mui/icons-material'
import { Box, Button, Container } from '@mui/material'
import Card from '../../components/Card'
import ContactForm from '../../components/ContactForm'
import { UseCompanyContext } from '../../contexts/CompanyContext'
import { Link, useParams } from 'react-router-dom'





const SingleCompany = () => {

  const { getSingleCompany, singleCompany, getCompanyJobs, companyJobs, oneCompanyJob, getOneCompanyJob } = UseCompanyContext()
  const { id } = useParams()


  useEffect(() => {
    getSingleCompany(id)
    getCompanyJobs(id)
    getOneCompanyJob(id)

  }, [])


  const headerStyle = {
    boxShadow: "none",
    border: "none",
    background: "var(--lighter-blue)",

  }

  const headerConStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: "2rem",
    padding: "2rem 0",
    width: "90vw",
    alignItems: "center",
    maxWidth: "1000px",
    margin: "auto",
  }

  const headerLeft = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center"
  }

  const headerRight = {
    display: "flex",
    gap: "1rem",
    flexDirection: "column"
  }

  const bodyCon = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: "2rem",
    padding: "2rem 0",
    width: "90vw",
    alignItems: "start",
    maxWidth: "1000px",
    margin: "auto",
  }

  const cardStyle = {
    border: "1px solid #eee",
    padding: "1rem",
    borderRadius: "6px",
    boxShadow: "0 2px 5px #00000025",
    display: "flex",
    alignItems: 'start',
    gap: "1rem"
  }

  return (
    < div className='single-company'>
      {
        singleCompany ?

          <Box >
            {/* Company header */}
            < header style={headerStyle}>

              <div className="header-con" style={headerConStyle}>


                {/* header left */}
                < div className="header-left" style={headerLeft}>
                  <div style={{ width: "30%", borderRadius: '10px' }}>
                    <img src={Default} alt="" style={{ borderRadius: "inherit" }} width={"100%"} />
                  </div>

                  <div >
                    <h3 style={{ fontWeight: "500" }}>{singleCompany.companyName}</h3>
                    <div style={{ margin: ".5rem 0" }}>
                      <h5><LocationOnOutlined fontSize='sm' /> {singleCompany.location || "No where"} </h5>
                      <h5><PhoneOutlined fontSize='sm' /> {singleCompany.phone || "No number"} </h5>
                      <h5><EmailOutlined fontSize='sm' /> {singleCompany.email} </h5>
                    </div>
                    <span>Open job(s) - {companyJobs ? companyJobs.length : 0}</span>
                  </div>
                </div>

                {/* end of header left */}

                {/* header right */}
                <div className="header-right" style={headerRight}>
                  <Button variant='contained'>Private Message</Button>
                  <Button variant='contained'>Follow</Button>
                </div>
                {/* end of header right */}

              </div>

            </header >
            {/* end of company header */}

            {/* Company Body */}
            <section className="company-body">
              <div className="body-con" style={bodyCon}>
                {/* main */}
                <main>
                  <div className="about-company">
                    <h3>About Company</h3>
                    <p>{singleCompany.description || "No information about this company"}</p>
                  </div>

                  <div className="company-video" >
                    <h3>Video</h3>
                    <iframe width={"90%"} height={"315"} src="https://youtu.be/d4t3s8zF-6E" style={{ display: "flex", margin: "auto" }}></iframe>
                  </div>

                  <div>
                    <h3>Open Position</h3>
                    {
                      oneCompanyJob && oneCompanyJob.length != 0 ?

                        <Link to={`/job/${oneCompanyJob[0]._id}`}>
                          <Card


                            cardTitle={oneCompanyJob[0].title}
                            featuredImg={oneCompanyJob[0].company.featuredImg}
                            defaultImg={Default}
                            detailOne={oneCompanyJob[0].category.title}
                            detailTwo={oneCompanyJob[0].location}
                            detailThree={oneCompanyJob[0].salary}
                            cardStyle={cardStyle} />
                        </Link>
                        :
                        <h3 style={{ textAlign: "center", display: "block", margin: "1rem 0", color: "#999" }}>No open position</h3>
                    }
                  </div>

                </main>
                {/* end of main */}

                {/* sidebar */}
                <aside>
                  <div className='overview'>
                    <h3>Overview</h3>
                    <li style={{ display: singleCompany.companySize ? "flex" : "none" }}><p>Company Size: {singleCompany.companySize}</p><span>{"companySize"}</span></li>
                    <li style={{ display: singleCompany.location ? "flex" : "none" }}><p>Location: </p><span>{singleCompany.location}</span></li>
                    <li style={{ display: singleCompany.phone ? "flex" : "none" }}><p>Phone Number: </p><span>{singleCompany.phone}</span></li>
                    <li style={{ display: singleCompany.email ? "flex" : "none" }}><p>Email: </p><span>{singleCompany.email}</span></li>
                  </div>

                  {/* location */}
                  <div class="map-location">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0075207296827!2dYOUR_LONGITUDE!3dYOUR_LATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zYOUR_LATITUDE!5e0!3m2!1sen!2sus!4v1604756721339!5m2!1sen!2sus" 
                       width="100%"
                      height="450"
                      style={{border:"0"}}
                      loading="lazy">
                    </iframe> 
                  </div>
                  {/* end of location */}

                  <div className="contact-form">
                    <h3>Contact Employer</h3>

                    <ContactForm />
                  </div>

                </aside>
                {/* end of sidebar */}
              </div>
            </section>
            {/* end of Company Body */}

          </Box >
          :

          <h1>Loading</h1>

      }

    </div>
  )
}

export default SingleCompany