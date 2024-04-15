import React, { useEffect, useState } from 'react'
import { UseAuthContext } from '../../contexts/AuthContext'
import { UseJobContext } from '../../contexts/JobContext'
import { useParams } from 'react-router-dom'

const Editjob = () => {

  const { } = UseAuthContext()
  const { id } = useParams()
  const { updateJob, getSingleJob, singleJob } = UseJobContext()
  const [job, setJob] = useState()
  const [formData, setFormData] = useState({})

  useEffect(() => {
    handleGetJob()
  }, [job])

  const handleGetJob = ()=> {
    getSingleJob(id)
    setJob(singleJob)
  }
  

 

  useEffect(() => {
    if (singleJob) {
      setFormData({
        title: singleJob.title || '',
        description: singleJob.description || '',
        category: singleJob.category.title || '',
        jobType: singleJob.jobType || '',
        gender: singleJob.gender || '',
        salary: singleJob.salary || '',
        experience: singleJob.experience || '',
        careerLevel: singleJob.careerLevel || '',
        applicationDeadline: singleJob.applicationDeadline || '',
        location: singleJob.location || ''
      });
    }
  }, [singleJob]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFormData({
      ...formData,
      featuredImage: image
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(id, formData);
  };



  return (
    <div className="post-job formPage">
      <section>
        {
          singleJob ?
          
            <form onSubmit={handleSubmit}>

              <div>
                <label>Job Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder={singleJob.title} />
              </div>
              <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder={singleJob.description}/>
              </div>
              <div>
                <label>Category:</label>
                <select name="category" value={formData.category} onChange={handleChange} >
                  <option value="">Select Category</option>
                  {/* Add 10 random professional jobs options */}
                  <option value="Software Engineer">software engineer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Financial Analyst">Financial Analyst</option>
                  <option value="Human Resources Manager">Human Resources Manager</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Civil Engineer">Civil Engineer</option>
                  <option value="Medical Doctor">Medical Doctor</option>
                </select>
              </div>
              <div>
                <label>Job Type:</label>
                <select name="jobType" value={formData.jobType} onChange={handleChange}>
                  <option value="">Select Job Type</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
                  <option value="both">Both</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label>Salary:</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleChange} placeholder={singleJob.salary}/>
              </div>

              <div>
                <label>Experience:</label>
                <select name="experience" value={formData.experience} onChange={handleChange}>
                  <option value="">Select Experience</option>
                  <option value="fresh">Fresh</option>
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                  <option value="4 year">4 year</option>
                  <option value="5 year">5 year</option>
                  {/* Add experience options */}
                </select>
              </div>

              <div>
                <label>Career Level:</label>
                <select name="careerLevel" value={formData.careerLevel} onChange={handleChange}>
                  <option value="">Select Career Level</option>
                  <option value="executive">Executive</option>
                  <option value="manager">Manager</option>
                  <option value="officer">Officer</option>
                  <option value="student">Student</option>
                  <option value="others">Others</option>
                  {/* Add career level options */}
                </select>
              </div>

              <div>
                <label>Application Deadline:</label>
                <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} />
              </div>
              <div>
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder={singleJob.location}/>
              </div>
              <div>
                <button type="submit" className='updateJobBtn btn'><div className="spinner-border d-none updateJobSpinner" role="status"></div>Update Job</button>
              </div>

              <div>
                <p className='postJobMessage'></p>
              </div>
            </form>
            :

            <div className="spinner-border text-primary big-spinner" role="status"></div>
        }
      </section>
    </div>
  )
}

export default Editjob