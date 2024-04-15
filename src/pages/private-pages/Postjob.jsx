import React, { useEffect, useState } from 'react';
import { UseJobContext } from '../../contexts/JobContext';
import { useCategoryContext } from '../../contexts/CategoryContext';


const Postjob = () => {

  const { postJob } = UseJobContext()
  const { getCategories, categories } = useCategoryContext()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    jobType: '',
    gender: '',
    salary: '',
    experience: '',
    careerLevel: '',
    applicationDeadline: '',
    location: ''
  });

  useEffect(() => {
    getCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

  // const handleImageChange = (e) => {
  //   const image = e.target.files[0];
  //   setFormData({
  //     ...formData,
  //     featuredImage: image
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    postJob(formData)
  };

  return (
    <div className="post-job formPage">
      <section>
        <form onSubmit={handleSubmit}>

          <div>
            <label>Job Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>


          <div>
            <label htmlFor="category">Category</label>
            <select name="category" id="category" value={formData.category} onChange={handleChange}>
              <option value="">Select category</option>
              {
                categories && (
                  categories.map((category, index) => {
                    return (
                      <option value={category.title}>{category.title}</option>

                    )
                  })
                )
              }
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
            <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
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
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>
          
          <div>
            <button type="submit" className='postJobBtn btn'><div className="spinner-border d-none postJobSpinner" role="status"></div>Post Job</button>
          </div>

          <div>
            <p className='postJobMessage'></p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Postjob;
