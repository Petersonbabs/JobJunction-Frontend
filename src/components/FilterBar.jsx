import { CalendarMonthOutlined, LocationOnOutlined, SearchOutlined } from '@mui/icons-material'
import { Button } from '@mui/material';
import React, { useState } from 'react'
// import "../../style/dashboard.css"

const FilterBar = ({ searchQuery, setSearchQuery, getAllJobs, handleChange, location, status, jobType, experience }) => {


  const [query, setQuery] = useState({
    job: "",
    status: ""
  })






  return (
    <div className='FilterBar'>

      {/* search by keyword */}
      <div className="keywordSearch">
        <h4>Search by Keywords</h4>
        <div>
          <SearchOutlined />
          <input type="text"
            value={searchQuery}
            name='title'
            onChange={handleChange}
            placeholder="Search for jobs" />
        </div>
      </div>
      {/* end of search by keyword */}

      {/* search by location */}
      <div className="locationSearch">
        <h4>Location</h4>
        <div>
          <LocationOnOutlined />
          <input type="text" name="location" placeholder='Country, city...' onChange={handleChange} value={location}/>
        </div>
      </div>
      {/* end of search by location */}



      {/* search by Job Type */}
      <div >
        <h4>Job Type</h4>
        <div>
          <CalendarMonthOutlined />
          <select name="jobType" onChange={handleChange} value={jobType}>
            <option value="">Select Job Type</option>
            <option value="freelance">Freelance</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
            {/* Add Job Status options */}
          </select>
        </div>

      </div>
      {/* end of search job type */}

      {/* search by Job Status */}
      <div >
        <h4>Job Status</h4>
        <div>
          <CalendarMonthOutlined />
          <select name="status" onChange={handleChange} value={status}>
            <option value="">Select Job Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            {/* Add Job Status options */}
          </select>
        </div>

      </div>
      {/* end of search by status */}


      {/* search by experience */}
      <div className="experinceSearch">
        <h4>Years of Experience</h4>
        <div>
          <CalendarMonthOutlined />
          <select name="experience" onChange={handleChange} value={experience}>
            <option value="">Select Experience</option>
            <option value="fresh">Fresh</option>
            <option value="1 year">1 year</option>
            <option value="2 year">2 years</option>
            <option value="3 years">3 years</option>
            <option value="4 years">4 years</option>
            <option value="5 years">5 years</option>
            {/* Add experience options */}
          </select>
        </div>
      </div>
      {/* end of search by experince */}

      <Button variant='contained' onClick={getAllJobs}>Search</Button>

    </div>
  )
}

export default FilterBar