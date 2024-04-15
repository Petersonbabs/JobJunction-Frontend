import { useEffect, useState } from "react"
import FilterBar from "../../components/FilterBar"
import { UseJobContext } from "../../contexts/JobContext"
import IsLoading from "../../components/IsLoading"
import JobCard from "../../components/JobCard"
import { Menu } from "@mui/material"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"

import { useSearchParams } from "react-router-dom"
import { Search } from "@mui/icons-material"


const apiUrl = import.meta.env.VITE_apiUrl;

const headerStyle = {
  background: "var(--light-blue)",
  display: "flex",
  justifyContent: "center",
  padding: "1.5rem 0",
  marginBottom: "3rem"
}






const Jobs = () => {
  
  const { jobsResponse, jobs, setJobs, getAllJobs, isLoading, setIsLoading } = UseJobContext()
  const [isFilter, setIsFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(jobsResponse && jobsResponse.pages);
  

  const [searchParams, setSearchParams] = useSearchParams()
  const titleVal = searchParams.get("title")
  const locationVal = searchParams.get("location")
  const jobTypeVal = searchParams.get("jobType")
  const statusVal = searchParams.get("status")
  const experienceVal = searchParams.get("experience")
 
  
  
  


  const [searchQuery, setSearchQuery] = useState({
    title: titleVal || "",
    location: locationVal || "",
    jobType: jobTypeVal || "",
    status: statusVal || "",
    experience: experienceVal || ""
  });

  


  useEffect(() => {
    handleGetJobs()
  }, [currentPage])

  const handleGetJobs = ()=>{
    getAllJobs(searchQuery.title, searchQuery.location, searchQuery.jobType, searchQuery.status, searchQuery.experience, currentPage)
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setSearchQuery({
      ...searchQuery,
      [name]: value
    });
    setSearchParams(searchQuery)

  };

  


  useEffect(() => {
    if (jobsResponse) {
      setNumOfPages(jobsResponse.pages)
    }
  }, [jobsResponse])
  
  const showFilterBar = () => {
    const aside = document.querySelector(".aside")
    aside.classList.toggle("showFilter")
    setIsFilter(!isFilter)

    const searchInput = document.querySelector(".search")
    
  }





  if (isLoading == true) {
    return <IsLoading />
  }


  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, numOfPages));
  };

  




  return (
    <div className="jobs">
      {/* HEADER */}
      <header style={headerStyle}>
        <h2>Job List</h2>
      </header>
      {/* END OF HEADER */}

      {/* search */}

      <div className="search" style={{display: isFilter ? "none" : "flex"}}>
        
        <input
          type="text"
          value={searchQuery.title}
          name="title"
          onChange={handleChange}
          placeholder="Search for jobs"
        />
        <button onClick={handleGetJobs}><Search /></button>
      </div>
      {/* search */}

      {/* MAIN */}
      <section>
        <aside className="aside ">
          <FilterBar searchQuery={searchQuery.title} location={searchQuery.location}  setSearchQuery={setSearchQuery} getAllJobs={handleGetJobs} handleChange={handleChange} />
        </aside>

        <main>

          <p className="filterToggler" onClick={showFilterBar}><Menu />{isFilter ? "Hide filter" : "Show filter"}</p>

          <div className="featured-jobs" style={{ alignContent: "center" }}>


            {

              jobs ?

                jobs.map((job, index) => {
                  const { title, company, salary, location, jobType, status } = job
                  return (

                    <JobCard title={title} link={`/job/${job._id}`} status={status} category={jobType} location={location} salary={salary} key={job._Id} />
                  )
                })
                :
                <IsLoading />
            }


          </div>

          <div className="pagination">
            <span onClick={handlePrevPage} disabled={currentPage === 1} style={{ display: currentPage === 1 ? "none" : "inline-flex" }} className="icon">
              <GrLinkPrevious />
            </span>
            <span className="text">
              <span className="currentPage">{currentPage}</span> of {numOfPages}</span>
            <span onClick={handleNextPage} style={{ display: currentPage === numOfPages ? "none" : "inline-flex" }} className="icon">
              <GrLinkNext />
            </span>
          </div>
        </main>

      </section>
      {/* END OF MAIN */}
    </div>
  )
}

export default Jobs