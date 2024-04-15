import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SignUPIMage from "../../assets/goal-setting-concept-with-laptop_23-2149046780.jpg"



const schema = yup.object().shape({
  firstName: yup.string().required("Full Name is required."),
  lastName: yup.string().required("Full Name is required."),
  email: yup.string().email('Invalid Email').required('Email is required'),
  role: yup.string().required('Role is required'),
  profession: yup.string().when('role', {
    is: 'employee',
    then: yup.string().required('Profession is required'),
    otherwise: yup.string(),
  }),
  companyName: yup.string().when('role', {
    is: 'company',
    then: yup.string().required('Company Name is required'),
    otherwise: yup.string(),
  }),
  description: yup.string().when('role', {
    is: 'company',
    then: yup.string().required('Company Description is required'),
    otherwise: yup.string(),
  }),
  password: yup.string().required('Password is required').matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
  ),


})



const SignUpForm = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    profession: '',
    role: "",
    companyName: "",
    description: ""
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [profession, setProfession] = useState('');
  const [showProfession, setShowProfession] = useState();
  const [showCompanyName, setShowCompanyName] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowProfession(role.value === 'employee');
    setShowCompanyName(role.value === "company")
  };

  const { registerUser, errorMessage, successMessage } = UseAuthContext()

  React.useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);
  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);



  return (

    <div className=" form ">
      <h2>Create a free Job Junction account</h2>

      {/* <ToastContainer /> */}
      <div className='signUpForm'>
        <div className="signUpLeft">
          {/* <img src={SignUPIMage} alt="" width={"50%"}/> */}
        </div>
        <div className="signUpRight">



          <div>
            <label>First Name</label>
            <input type="text" value={formData.firstName} onChange={handleInputChange} name='firstName' placeholder='firstname' required />
            {errors.firstName && <p color='red'>{errors.firstName.message}</p>}
          </div>

          <div>
            <label>Last Name</label>
            <input type="text" value={formData.lastName} onChange={handleInputChange} name='lastName' placeholder='lastname' required />
            {errors.lastName && <p color='red'>{errors.lastName.message}</p>}
          </div>


          <div>
            <label>Email</label>
            <input type="email" value={formData.email} onChange={handleInputChange} required name='email' placeholder='email' />
          </div>

          <div>
            <label>Role</label>
            <select type="text" value={formData.role} name='role' id='role' onChange={handleInputChange}>
              <option value="">Select Role</option>
              <option value="employee">Job Seeker</option>
              <option value="company">Company</option>
            </select>
            {showProfession && (
              <div>
                <label>Profession</label>
                <select value={profession} onChange={(e) => setProfession(e.target.value)}>
                  <option value="">Select Profession</option>
                  <option value="">Select Profession</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="Web Designer">Web Designer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="UX/UI Designer">UX/UI Designer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Marketing Specialist">Marketing Specialist</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Engineer">Engineer</option>
                </select>
              </div>

            )}


            {
              showCompanyName && (
                <>
                  <div>
                    <label>Company Name</label>
                    <input type="text" value={formData.companyName} onChange={handleInputChange} name='companyName' placeholder='Your Company Name' required />
                  </div>

                  <div>
                    <label>Company Description</label>

                    <textarea id="" cols="30" rows="10" value={formData.description} onChange={handleInputChange} name='description' placeholder='Describe Your Company' required></textarea>
                  </div>
                </>
              )
            }

            <div>
              <label>Password</label>
              <input type="password" value={formData.password} onChange={handleInputChange} placeholder='password' name='password' required />
              <p>Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number</p>
            </div>

          </div>

          <button type="submit" onClick={() => { registerUser(formData) }} className='btn' style={{ padding: ".5rem 1rem" }}>Sign Up</button>

          {/* <p>{error}</p> */}
        </div>
      </div>
    </div>


  );
};

export default SignUpForm;
