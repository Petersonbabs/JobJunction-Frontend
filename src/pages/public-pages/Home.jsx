import React, { useEffect, useState } from 'react'
import menInSuit from "./../../assets/man-in-suit.png"
import Slider from '../../components/Slider'
import { UseJobContext } from "../../contexts/JobContext"

// import { Grid, Typography } from '@mui/material'
import Grid from '../../components/Grid'
import Card from '../../components/Card'
import Netflix from "../../assets/netflix.jpg"
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import { UseMessageContext } from '../../contexts/MessageContext'
import IsLoading from '../../components/IsLoading'
import HomeCategories from "../../components/HomeCategories"
import { useCategoryContext } from '../../contexts/CategoryContext'
import JobCard from '../../components/JobCard'




const Home = () => {
  const { getAllJobs, jobs } = UseJobContext()
  

  const [query, setQuery] = useState({
    search: "",
    location: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setQuery({
      ...query,
      [name]: value
    });
    
  };



  useEffect(() => {
    getAllJobs()
  }, [])

  const heroStyle = {
    padding: "5rem 0 1rem",
    background: "#F3F6FB",
    // display: "none"
  }

  const heroConStyle = {
    width: "90vw",
    margin: "auto",
    // display: "flex",
    height: "100%",
    gap: "2rem",
    alignItems: "center",
  }

  const heroRightStyle = {
    width: "50%",
    height: "100%"
  }

  const cardStyle = {
    border: "1px solid #eee",
    padding: "1rem",
    borderRadius: "6px",
    boxShadow: "0 2px 5px #00000025",
    // display: "flex",
    alignItems: 'start',
    gap: "1rem"
  }




  return (
    <div className='home'>

      {/* HERO SECTION */}
      <div className="hero" style={heroStyle}>
        <div className="hero-con" style={heroConStyle}>
          {/* hero left */}
          <div className="hero-left">
            <h3>There Are <span>93,178</span> Postings Here For you!</h3>
            <p>Find jobs, Employment & Career Opportunities</p>
            <div className="hero-search">

              <div className="hero-title-search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder='job title, keywords...' name='search' value={query.search} onChange={handleChange} />
              </div>


              <div className="hero-location-search">
                <i className="fa-solid fa-location-dot"></i>
                <select name="location" id="location" value={query.location} onChange={handleChange}>
                  <option value="">City or postcode</option>
                  <option value="florida">Florida</option>
                  <option value="london">London</option>
                  <option value="Los angeles">Los Angeles</option>
                  <option value="miami">Miami</option>
                  <option value="nevada">Nevada</option>
                  <option value="new york">New York</option>
                  <option value="paris">Paris</option>
                  <option value="washington">Washington</option>
                </select>

              </div>


              <button className='btn' style={{ padding: "0" }}>
                <Link to={`/jobs?title=${query.search}&location=${query.location}`} style={{ color: "#fff", width: "100%", padding: "1rem", display: "block" }}>Find jobs</Link>
              </button>

            </div>
            <p>Popular Searches : Designer, Developer, Web, IOS, PHP, Senior Engineer</p>
          </div>
          {/* end of hero left */}

          {/* hero right */}
          <div className="hero-right" style={heroRightStyle}>
            <img src={menInSuit} alt="Man in suit" />
          </div>
          {/* end of hero right */}
        </div>
      </div>
      {/* END OF HERO SECTION */}

      {/* HOW IT WORKS */}
      <Slider />
      {/* END OF HOW IT WORKS */}


      {/* CATEGORIES */}
      <div className="categories">

        <div className="text">
          <h3>Popular Job Categories</h3>
          <span>2024 jobs live 5 new jobs added today.</span>
        </div>
        <HomeCategories />

      </div>
      {/* END OF CATEGORIES */}


      {/* FEATURED JOBS */}
      <div className="featured-jobs" style={{ alignContent: "center" }}>

        <div className='text'>
          <h3>Featured Jobs</h3>
          <span>Know your worth and find the job that qualify your life.</span>
        </div>

        <div className="jobList">
          {
            jobs ?

              jobs.map((job, index) => {
                const { title, company, salary, location, jobType, status } = job
                return (

                  <div key={job._id}>
                    <JobCard title={title} link={`/job/${job._id}`} status={status} category={jobType} location={location} salary={salary} />
                  </div>
                )
              })
              :
              <IsLoading />
          }

        </div>


        <Link to={"/jobs"} style={{ display: "block", margin: "2rem auto", width: "fit-content" }}>
          <Button variant="contained" >More Jobs</Button>
        </Link>
      </div>

      {/* FEATURED JOBS */}


      {/* RECRUITING */}
      <div className="recruiting">
        <div className="con">
          <div className="content">
            <h3>Recruiting</h3>
            <p>
              Advertise your jobs to millions of monthly users and search 15.8 million CVs in our database.
            </p>
            <Link to={"/dashboard/post-job"}>
              <Button variant='contained'>Start Recruiting Now</Button>
            </Link>
          </div>
        </div>
      </div>
      {/* END OF RECRUITING */}


    </div>
  )
}

export default Home