import { createContext, useContext, useState } from "react";
import { UseAuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const applicationContext = createContext()
export const useApplicationContext = () => {
    return useContext(applicationContext)
}

// variables
const apiUrl = import.meta.env.VITE_apiUrl;

const ApplicationProvider = ({ children }) => {

    const [applications, setApplications] = useState()
    const [applicationsResponse, setApplicationsResponse] = useState()
    const { token, setSuccessMessage, setErrorMessage } = UseAuthContext()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()



    // CREATE APPLICATION
    const apply = async (jobId, formData) => {

        setIsLoading(true)
        try {
            if (token) {
                const response = await axios.post(`${apiUrl}/apply/${jobId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                })

                const data = await response.data
                

                navigate("/dashboard")
                setSuccessMessage(data.message)
                
                
            }
        } catch (error) {
            console.log(error)
            setErrorMessage(error.data.message)
        } finally {
            setIsLoading(false)
        }

    }

    // GET COMPANY APPLICATIONS
    const getMyApplications = async (role, jobId) => {

        setIsLoading(true)

        try {
            if (token) {
                const response = await axios.get(`${apiUrl}/${role}/applications?jobId=${jobId || ""}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                setApplications(response.data.applications)
                setApplicationsResponse(response.data)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }


    // UPDATE APLICATION
    const updateApplication = async (applicationId, status) => {
        setIsLoading(true)

        try {
            if (token) {
                const response = await axios.patch(`${apiUrl}/applications/${applicationId}`, { applicationStatus: status }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })


                getMyApplications(user.role)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }

    // DELETER APLICATION
    const deleteApplication = async (applicationId) => {
        setIsLoading(true)

        try {
            if (token) {
                await axios.delete(`${apiUrl}/applications/${applicationId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                getMyApplications(user.role)

            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }



    const value = {
        getMyApplications,
        applications,
        setApplications,
        isLoading,
        updateApplication,
        deleteApplication,
        apply,
        applicationsResponse
    }

    return <applicationContext.Provider value={value}>{children}</applicationContext.Provider>

}

export default ApplicationProvider