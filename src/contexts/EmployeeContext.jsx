import axios from "axios";
import { createContext, useContext, useState } from "react"

const employeeContext = createContext()
export const UseEmployeeContext = () => {
    return useContext(employeeContext)
}

// variables
const apiUrl = import.meta.env.VITE_apiUrl;

const EmployeeProvider = ({ children }) => {

    const [employeesResponse, setEmployeesResponse] = useState()

    const [employees, setEmployees] = useState()
    const [singleEmployee, setSingleEmployee] = useState()
    const [isLoading, setIsLoading] = useState(false)

   


    // GET ALL EMPLOYEES
    const getAllEmployees = async (pageNum) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${apiUrl}/employees?pageNum=${pageNum}`)
            
            const data = await response.data
            
            setEmployeesResponse(data)
            setEmployees(data.employees)

        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

  
    
    
    // GET SINGLE EMPLOYEE
    const getSingleEmployee = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${apiUrl}/employee/${id}`)
            const data = await response.data
            setSingleEmployee(data.employee)
            
            

        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }

    }


    // POST JOB
    const postEmployee = async () => {

    }



    // UPDATE JOB
    const updateEmployee = async () => {

    }



    // DELETE JOB
    const deleteEmployee = async () => {

    }



    const value = {
        employeesResponse,
        getAllEmployees,
        getSingleEmployee,
        singleEmployee,
        postEmployee,
        deleteEmployee,
        updateEmployee,
        employees,
        isLoading
    }

    return <employeeContext.Provider value={value}>{children}</employeeContext.Provider>

}

export default EmployeeProvider