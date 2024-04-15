import { Button } from '@mui/material'
import React from 'react'

const style = {
    background: "var(--lighter-blue)",
    margin: "1rem",
    // padding: "1rem",
    borderRadius: "5px",
}

const formStyle = {
    display: "flex",
    flexDirection: ""
}

const ContactForm = () => {
  return (
    <div style={style} className='form'> 
        <div>
            <input type="text" placeholder='subject' style={{background: "#fff"}}/>
            <input type="email" placeholder='E-mail'  style={{background: "#fff"}}/>
            <input type="number" placeholder='Phone'  style={{background: "#fff"}}/>
            <textarea cols="30" rows="10" placeholder='Message'  style={{background: "#fff"}}></textarea>
            <Button variant='contained' sx={{width: "100%"}}>Send message</Button>
        </div>
    </div>
  )
}

export default ContactForm