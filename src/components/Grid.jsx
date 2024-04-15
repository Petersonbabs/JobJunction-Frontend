import React from 'react'

const Grid = ({ children }) => {

    const style = {
        display: "grid",
        padding: "1rem",
        gap: "1rem"
    }

    return (
        <div style={style} className='grid'>
            {children}
        </div>
    )
}

export default Grid