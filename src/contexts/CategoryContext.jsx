import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const apiUrl = import.meta.env.VITE_apiUrl;

const categoryContext = createContext()
export const useCategoryContext = () => {
    return useContext(categoryContext)
}

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([])
    const [categoryJobs, setCategoryJobss] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // GET ALL CATEGORIES
    const getCategories = async () => {
        try {
            const data = await axios.get(`${apiUrl}/categories`)
            setCategories(data.data.categories)

        } catch (error) {
            console.log(error)
        }
    }

    const getCategoryJobs = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${apiUrl}/category/${id}/jobs`)
            setCategoryJobs(response.data.jobs)

        } catch (error) {
            console.log(error)
        } finally {

            setIsLoading(true)
        }
    }


    const contextValue = {
        getCategories,
        categories,
        getCategoryJobs,
        isLoading,
        categoryJobs,
        
    }

    return <categoryContext.Provider value={contextValue}>{children}</categoryContext.Provider>

}

export default CategoryProvider
