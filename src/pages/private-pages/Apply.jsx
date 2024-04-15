import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApplicationContext } from '../../contexts/ApplicationContext';
import IsLoading from '../../components/IsLoading';
import { UseAuthContext } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';



const Apply = () => {

  const {id} = useParams();
  const {apply, isLoading} = useApplicationContext()
  const { user, token, successMessage, errorMessage, warningMessage } = UseAuthContext()

  const [formData, setFormData] = useState({
    resume: null,
    message: ''
  });

    // success notifications
    useEffect(()=>{
      if(successMessage){
        toast.success(successMessage)
      }
    }, [successMessage])
  
    // warning notifications
    useEffect(()=>{
      if(warningMessage){
        toast.warning(warningMessage)
      }
    }, [warningMessage])
  
    // error notification
    // useEffect(()=>{
    //   if(errorMessage){
    //     toast.error(errorMessage)
    //   }
    // }, [errorMessage])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleResumeChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    apply(id, formData)
  };

  if(isLoading){
    return <IsLoading />
  }

  return (
    <div className='applytoJob formPage'>
      {/* <ToastContainer /> */}
      <h2>Apply to This Job.</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="resume">Resume (PDF):</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf"
            onChange={handleResumeChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Apply;
