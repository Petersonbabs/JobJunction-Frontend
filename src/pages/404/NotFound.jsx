import React from 'react'
import notFound from "../../assets/page-found-concept-illustration_114360-1869.jpg"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={
      {
        textAlign: "center",
        margin: "3rem 0"
      }
    }>
      <h1>This page does not exist </h1>
      <img src={notFound} alt="" width={"300px"} style={{ margin: "auto", display: "block" }} />
      <Link to={"/"}>
        <button style={{ width: "50%", padding: "1rem 2rem", fontSize: "1.4rem" }} className='btn'>Return to hompage</button>
      </Link>
    </div>
  )
}

export default NotFound