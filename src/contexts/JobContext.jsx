import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { UseAuthContext } from "./AuthContext";

const jobContext = createContext()
export const UseJobContext = () => {
    return useContext(jobContext)
}

// variables
const apiUrl = import.meta.env.VITE_apiUrl;

const JobProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [jobsResponse, setJobsResponse] = useState()
    const [postedJob, setPostedJob] = useState()
    const [jobs, setJobs] = useState()
    const [singleJob, setSingleJob] = useState()
    const { token } = UseAuthContext()
    const navigate = useNavigate()
    



    // GET ALL JOBS
    const getAllJobs = async (title, location, jobType, status, experience,pageNum) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${apiUrl}/jobs?search=${title || ""}&location=${location || ""}&jobType=${jobType || ""}&status=${status || ""}&experience=${experience || ""}&pageNum=${pageNum}`)

            const data = await response.data
            setJobsResponse(data)
            setJobs(data.jobs)
            // console.log(response)

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }



    // GET SINGLE JOB
    const getSingleJob = async (id) => {

        try {
            const response = await axios.get(`${apiUrl}/job/${id}`)
            const data = await response.data
            setSingleJob(data.job)

        } catch (error) {
            console.log(error.message)
        }

    }


    // POST JOB
    const postJob = async (jobData) => {

        const postJobMessage = document.querySelector(".postJobMessage")

        const postJobLoader = document.querySelector(".postJobSpinner")
        postJobLoader.classList.remove("d-none")
        const postJobBtn = document.querySelector(".postJobBtn")

        try {
            postJobBtn.disabled = true
            const response = await axios.post(`${apiUrl}/job/post`, jobData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            setPostedJob(response.data.job)
            navigate("/dashboard/my-jobs")



        } catch (error) {
            console.log(error)
        } finally {
            postJobBtn.disabled = false
            postJobLoader.classList.add("d-none")
            postJobMessage.innerHTML = response.data.message
        }

    }



    // UPDATE JOB
    const updateJob = async (jobId, formData) => {


        const updateJobSpinner = document.querySelector(".updateJobSpinner")

        updateJobSpinner.classList.remove("d-none")
        const updateJobBtn = document.querySelector(".updateJobBtn")
        
        
        try {
           const response = await axios.patch(`${apiUrl}/job/${jobId}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            
            updateJobBtn.disabled = true
            navigate("/dashboard/my-jobs")

        } catch (error) {
            console.log(error)
        } finally {
            updateJobSpinner.classList.add("d-none")
            updateJobBtn.disabled = false
        }

    }



    // DELETE JOB
    const deleteJob = async (jobId) => {


        try {
            await axios.delete(`${apiUrl}/job/${jobId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            

        } catch (error) {
            console.log(error)
        }


    }



    const value = {
        jobsResponse,
        getAllJobs,
        getSingleJob,
        singleJob,
        postJob,
        deleteJob,
        updateJob,
        jobs,
        isLoading,
        setIsLoading,
        setJobs
    }

    return <jobContext.Provider value={value}>{children}</jobContext.Provider>

}

export default JobProvider