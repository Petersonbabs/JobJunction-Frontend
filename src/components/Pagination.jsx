import React, { useState, useEffect } from 'react';

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        fetchData();
    }, [currentPage]); // Fetch data whenever currentPage changes

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4060/api/v1/companies?page=${currentPage}`);
            const data = await response.json();
            setCompanies(data.companies);
            setNumOfPages(data.pages);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, numOfPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (


        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>{currentPage} of {numOfPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === numOfPages}>Next</button>
        </div>
    );
};

export default Pagination;
