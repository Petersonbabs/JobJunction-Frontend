import { LocationCity, LocationOn, LocationOnOutlined, LockClock, Payment, WorkOutline } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom"



const Card = ({ featuredImg, defaultImg, cardTitle, detailOne, detailTwo, detailThree, detailFour, actionBtn, tags, link, cardStyle, cardMiddleStyle, cardDetailStyle, actionLink }) => {



  const cardLeft = {
    width: "50px",
    height: "50px",
    // border: "1px solid"

  }



  return (


    <div style={cardStyle} className='card'>
      <div className="card-left" style={cardLeft}>
        <img src={featuredImg || defaultImg} width={"100%"} alt="" />
      </div>

      <div className="card-middle" style={cardMiddleStyle}>
        <div >
          {/* title */}
          <h3 style={{
            fontWeight: 500,
            textTransform: "capitalize"
          }}>{cardTitle}</h3>

          {/* details */}
          <div className="card-details" style={cardDetailStyle}>

            <h5 style={{
              display: detailOne ? "block" : "none"
            }} ><WorkOutline fontSize='sm' /> {detailOne}</h5>

            <h5 style={{
              display: detailTwo ? "block" : "none",

            }}><LocationOnOutlined fontSize='sm' /> {detailTwo}</h5>

            <h5 style={{
              display: detailThree ? "inline" : "none"
            }}  ><Payment fontSize='sm' /> {detailThree} / month</h5>

            <h5 style={{
              display: detailFour ? "inline" : "none"
            }} ><LockClock fontSize='sm' /> {detailFour} </h5>
          </div>
          <span>{tags}</span>
        </div>

        {/* action */}

        <div >
          <Link to={actionLink} style={{color: "#fff"}}>
            <button className='btn' style={{ padding: ".5rem 1rem", fontSize: "1rem", display: actionBtn ? "block" : "none" }} >{actionBtn}</button>
          </Link>
        </div>

      </div>


    </div>

  )
}

export default Card