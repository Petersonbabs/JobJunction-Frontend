import React from 'react'
import loading from "../assets/Fading fountain.gif"




const IsLoading = () => {
    return (
        <div className="loading-container" >
            <div className="cssload-thecube">
                <div className="cssload-cube cssload-c1"></div>
                <div className="cssload-cube cssload-c2"></div>
                <div className="cssload-cube cssload-c4"></div>
                <div className="cssload-cube cssload-c3"></div>
            </div>
            <h3>Loading...</h3>
        </div>
    )
}

export default IsLoading