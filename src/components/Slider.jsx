import React, { useState } from 'react'
import freeResume from "../assets/free-resume.jpg"
import jobFit from "../assets/job-fit-scoring.jpg"
import help from "../assets/help-.png"

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
    };

    const style = {
        display: "grid",
        gap: ".5rem"
    }

    const slideStyle = {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 2px #00000050"
    }


    return (
        <div className="howItWorks" >
            <div className="texts">
                <h3>How it Works</h3>
                <p>Job for anyone, anywhere</p>
            </div>
            <div className="slides" style={style}>

                <div style={slideStyle} className='slide'>
                    <img src={freeResume} alt="" />
                    <h4>Free Resume Assessments</h4>
                    <p>Employers on average spend 31 seconds scanning resumes to identify potential matches.</p>
                </div>

                <div style={slideStyle} className='slide'>
                    <img src={jobFit} alt="" />
                    <h4>Job Fit Scoring</h4>
                    <p>Our new fit meter shows you which jobs are most relevant to your skills and interests.</p>
                </div>

                <div style={slideStyle} className='slide'>
                    <img src={help} alt="" />
                    <h4>Help Every Step of the Way</h4>
                    <p>Our career advice section is full of information to help you identify the right fit.</p>
                </div>

                
            </div>

            {/* <button className="prev" onClick={prevSlide}>&#10094;</button>
            <button className="next" onClick={nextSlide}>&#10095;</button> */}
        </div>
    );

}

export default Slider