import React, { useEffect, useState } from 'react';
import { useCategoryContext } from '../contexts/CategoryContext';
import { UseJobContext } from '../contexts/JobContext';
import axios from 'axios';
// import './JobCategories.css'; // Import your CSS file for styling

const JobCategories = () => {

    const { categories, getCategories } = useCategoryContext()
    const { getAllJobs } = UseJobContext()
    const { categoryJobs, getCategoryJobs } = useCategoryContext()
    const [countedCategories, setCountedCategories] = useState()

    useEffect(() => {
        getCategories()
    }, [])


    useEffect(() => {
        const fetchCategoriesWithJobCounts = async () => {
            if (categories) {

                try {
                    
                    const categoryIds = categories.map(category => category._id);
                    

                    const categoriesWithCounts = await Promise.all(categoryIds.map(async categoryId => {
                        const response = await axios.get(`http://localhost:4060/api/v1/category/${categoryId}/jobs`);
                        
                        const jobs = await response.data;
                        console.log(jobs)
                        return { categoryId, jobCount: jobs.length };
                    }));

                    setCountedCategories(categoriesWithCounts);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchCategoriesWithJobCounts();
    }, []);


    const icons = [
        { icon: 'fa-laptop' },
        { icon: 'fa-money-bill-wave', },
        { icon: 'fa-hospital' },
        { icon: 'fa-graduation-cap' },
        { icon: 'fa-shopping-cart' },
        { icon: 'fa-bullhorn' },
        { icon: 'fa-tools' },
        { icon: 'fa-paint-brush' },
    ];




    return (
        <div className="job-categories">
            {
                categories && (

                    categories.map((category, index) => {
                        const { jobs } = category

                        return (
                            <div  className="category" key={category._id} >
                                <div className="category-icon">
                                    <i className={`fas ${icons[index].icon}`}></i>
                                </div>
                                <div className="category-info">
                                    <h3>{category.title}</h3>
                                    <span>{category.jobCount} (2 Jobs)</span>
                                </div>
                            </div>
                        )
                    })
                )

            }
        </div>
    );
};

export default JobCategories;
