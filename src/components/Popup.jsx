import { useEffect, useState } from "react";
import "../style/components.css"

const Popup = ({ message, status }) => {

    const [isVisible, setIsVisible] = useState(true);
    
    

    useEffect(()=>{

      setIsVisible(true)

        const showTimeOver = setTimeout(()=>{
            setIsVisible(false)
        }, [5000])

        // return ()=> clearTimeout(showTimeOver)

    }, [message, status])

    if(!message) {
      // return null
    }
    

    return (
      <div className={`message ${status} ${isVisible ? "" : "hide"}`} >
        <div className="popup-inner">
          <div className="popup-content">
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  };

export default Popup