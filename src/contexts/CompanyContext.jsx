import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { UseAuthContext } from "./AuthContext";

const companyContext = createContext()
export const UseCompanyContext = () => {
    return useContext(companyContext)
}

// variables
const apiUrl = import.meta.env.VITE_apiUrl;

const CompanyProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    const [companiesResponse, setCompaniesResponse] = useState()

    const [companies, setCompanies] = useState()
    const [singleCompany, setSingleCompany] = useState()
    const [companyJobs, setCompanyJobs] = useState()
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"));
    const [oneCompanyJob, setOneCompanyJob] = useState()




    // GET ALL COMPANIES
    const getAllCompanies = async (pageNum) => {

        setIsLoading(true)

        try {
            const response = await axios.get(`${apiUrl}/companies?pageNum=${pageNum}`)

            const data = await response.data
            
            setCompaniesResponse(data)
            setCompanies(data.companies)

        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    // GET SINGLE COMPANY
    const getSingleCompany = async (id) => {

        setIsLoading(true)

        try {
            const response = await axios.get(`${apiUrl}/company/${id}`)
            const data = await response.data
            setSingleCompany(data.company)
            console.log(data)

        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }

    }




    // GET COMPANY JOBS
    const getCompanyJobs = async (id) => {
        setIsLoading(true)
        try {

            // alert()
            const response = await axios.get(`${apiUrl}/company/${id}/jobs`)
            const data = await response.data
            setCompanyJobs(data.jobs)
            


        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    // GET ONE COMPANY JOB
    const getOneCompanyJob = async (id) => {

        try {
            const response = await axios.get(`${apiUrl}/company/${id}/jobs/?limit=1`)
            const data = await response.data
            setOneCompanyJob(data.jobs)


        } catch (error) {
            console.log(error)
        }

    }


    // POST JOB
    const postCompany = async () => {

    }

    // COMPANY APPLICATION
    const getCompanyApplications = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${apiUrl}/company/applications`, {
                headers: {
                    "Cookie": 'token'
                }
            })
            
            console.log(response)
            
            
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)

        }
        
    }



    // UPDATE COMPANY
    const updateCompany = async (companyId) => {
        const updateJobSpinner = document.querySelector(".updateJobSpinner")

        updateJobSpinner.classList.remove("d-none")
        const updateJobBtn = document.querySelector(".updateJobBtn")
        
        setIsLoading(true)
        try {
            const response = await axios.patch(`${apiUrl}/job/${jobId}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            
            console.log(response)
            updateJobBtn.disabled = true
            navigate("/my-jobs")

        } catch (error) {
            console.log(error)
        } finally {
            updateJobSpinner.classList.add("d-none")
            updateJobBtn.disabled = false
            setIsLoading(false)

        }
    }



    // DELETE JOB
    const deleteCompany = async () => {

    }




    const value = {
        companiesResponse,
        getAllCompanies,
        getSingleCompany,
        singleCompany,
        getCompanyJobs,
        companyJobs,
        postCompany,
        deleteCompany,
        updateCompany,
        companies,
        getOneCompanyJob,
        oneCompanyJob,
        getCompanyApplications,
        isLoading
    }

    return <companyContext.Provider value={value}>{children}</companyContext.Provider>

}

export default CompanyProvider