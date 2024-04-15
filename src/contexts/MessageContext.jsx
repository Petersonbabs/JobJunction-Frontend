import React, { createContext, useContext, useEffect, useState } from 'react'


const messageContext = createContext()
export const UseMessageContext = () => {
    return useContext(messageContext)
}


const MessageProvider = ({ children}) => {

    // const [popUp, setPopup] = useState({message: "", status: ""})
    
    useEffect(()=>{

    }, [])

    const displayPopup = (message, status)=>{
        setPopup({message: message, status: status})
    }
    
    const value = {
        displayPopup
    }



    return <messageContext.Provider value={value}>{children}</messageContext.Provider>
    
}

export default MessageProvider