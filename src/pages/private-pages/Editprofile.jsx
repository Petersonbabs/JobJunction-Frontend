import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UseAuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { UseEmployeeContext } from '../../contexts/EmployeeContext';
import { UseCompanyContext } from '../../contexts/CompanyContext';
import { useCategoryContext } from '../../contexts/CategoryContext';
import IsLoading from '../../components/IsLoading';
import { CloseSharp } from '@mui/icons-material';
import Default from "../../assets/default-user.jpg";

const Editprofile = () => {
  const { id } = useParams();
  const { user, updateUser, isLoading } = UseAuthContext();
  const [formData, setFormData] = useState({});
  const { getSingleEmployee } = UseEmployeeContext();
  const { getSingleCompany } = UseCompanyContext();
  const { getCategories, categories } = useCategoryContext();

  useEffect(() => {
    handleUser();
    getCategories();
  }, [user]);

  const handleUser = () => {
    if (user.role === "employee") {
      getSingleEmployee(id);
    } else if(user.role === "company") {
      getSingleCompany(id);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        featuredImg: null,
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFormData({
      ...formData,
      featuredImg: image,
    });
  };

  const handleRemoveImage = () => {
    const editImage = document.querySelector(".editImage")
    editImage.style.display = "none"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "featuredImg") {
        if (value) {
          formDataToSubmit.append(key, value);
        }
      } else {
        formDataToSubmit.append(key, value);
      }
    });

    
    updateUser(user.role, formDataToSubmit, id);
  };

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className='edit-profile formPage'>
      <h2>Profile</h2>
      <section>
        {user && (
          <div>
            <div>
              <h6>Profile pic.</h6>
              <div>
                <div className='editImage'>
                  <CloseSharp fontWeight={100} className='removeImage' onClick={handleRemoveImage} />
                  <img src={user.featuredImg || Default} alt="" className='editProfileImg' />
                </div>
                <input type="file" name='featuredImg' onChange={handleImageChange} accept='image/*' className='editProfileImgInput' />
              </div>
            </div>
            
            <div className="firstname">
              <label htmlFor="firstName">First name</label>
              <input type="text" value={formData.firstName || ''} name='firstName' placeholder={user.firstName} onChange={handleInput} />
              
            </div>

            <div className="lastname">
              <label htmlFor="lastName">Last name</label>
              <input type="text" value={formData.lastName || ''} name='lastName' placeholder={user.lastName} onChange={handleInput} />
            </div>


            {/* company name */}
            {
              user.role == "company" && (
                <>
                  <div className="companyName">
                    <label htmlFor="companyName">Company name</label>
                    <input type="text" value={formData.companyName} name='companyName' placeholder={user.companyName} onChange={handleInput} />
                  </div>

                  {/* description */}
                  <div>
                    <label htmlFor="description">About company</label>
                    <textarea name="description" id="description" cols="30" rows="5" draggable="false" maxLength={300} value={formData.description} onChange={handleInput}></textarea>
                  </div>
                  {/* end of description */}

                </>
              )
            }
            {/* end of companyName */}


            {/* email */}
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="text" value={formData.email} name='email' placeholder={user.email} onChange={handleInput} />
            </div>
            {/* end of email */}

            {/* phone */}
            <div className="phone">

              <label htmlFor="phone">Phone</label>
              <input id='phone' type="number" value={formData.phoneNumber} name='phoneNumber' placeholder={user.phoneNumber || "Phone number"} onChange={handleInput} />
            </div>
            {/* end of phone */}

            {/* location */}
            <div className="location">
              <label htmlFor="location">Location</label>
              <input type="text" value={formData.location} name='location' placeholder={user.location || "location"} onChange={handleInput} />
            </div>
            {/* end of website */}

            {/* website */}
            <div className="website">
              <label htmlFor="website">Website</label>
              <input type="text" value={formData.website} name='website' placeholder={user.website || "Website"} onChange={handleInput} />
            </div>
            {/* end of website */}


            {
              user.role == "company" && (

                <>

                  {/* foundedDate */}
                  <div className="foundedDate">
                    <label htmlFor="foundedDate">Founded date</label>
                    <input type="date" value={formData.foundedDate} name='foundedDate' placeholder={user.foundedDate || ""} onChange={handleInput} />
                  </div>
                  {/* end of foundedDate */}

                  {/* Company Size */}
                  <div className="companySize">
                    <label htmlFor="companySize">Company size</label>
                    <select name="companySize" id="companySize" value={formData.companySize} onChange={handleInput} >
                      <option value="0 - 50">0 - 50</option>
                      <option value="50 - 100">50 - 100</option>
                      <option value="100 - 1000">100 - 1000</option>
                      <option value="1000+">1000+ </option>
                    </select>
                  </div>
                  {/* end of Company Size */}

                  <div>
                    <label htmlFor="industry">Industry</label>
                    <input type="text" placeholder={user.industry || "industry"} value={formData.industry} name='industry' onChange={handleInput} />
                  </div>
                </>

              )
            }

            {
              user.role == "employee" && (
                <>
                  {/*  ABOUT */}
                  <div>
                    <label htmlFor="about">About me</label>
                    <textarea name="about" id="about" value={formData.about} rows={10} onChange={handleInput} >

                    </textarea>
                  </div>
                  {/* END OF  ABOUT */}

                  {/*  GENDER */}
                  <div>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" value={formData.gender} onChange={handleInput}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  {/* END OF  GENDER */}

                  {/*  AGE */}
                  <div>
                    <label htmlFor="age">Age</label>
                    <select name="age" id="age" value={formData.age} onChange={handleInput}>
                      <option value="">Select age</option>
                      <option value="20 - 25">20 - 25</option>
                      <option value="25 - 30">25 - 30</option>
                      <option value="30 - 35">30 - 35</option>
                      <option value="35 - 40">35 - 40</option>
                    </select>
                  </div>
                  {/* END OF  AGE */}

                  {/* QUALIFICATION */}
                  <div>
                    <label htmlFor="qualification">Qualification</label>
                    <select name="qualification" id="qualification" value={formData.qualification} onChange={handleInput}>

                      <option value="">Select qualification</option>
                      <option value="certificate">Certificate</option>
                      <option value="associate degree">Associate Degree</option>
                      <option value="bachelor degree">Bachelor Degree</option>
                      <option value="master's degree">Master's Degree</option>
                      <option value="doctorate degree">Doctorate Degree</option>
                    </select>
                  </div>
                  {/* END OF QUALIFICATION */}

                  {/* PROFESSION */}
                  <div>
                    <label htmlFor="profession">Profession</label>
                    <select name="profession" id="profession" value={formData.profession} onChange={handleInput}>
                      <option value="">Select profession</option>
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
                  {/* END OF PROFESSION */}

                  {/* EXPERIENCE */}
                  <div>
                    <label htmlFor="experience">Years of Experience</label>
                    <select name="experience" id="experience" value={formData.experience} onChange={handleInput}>
                      <option value="">Select experience</option>
                      <option value="Fresh">Fresh</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years">3 years</option>
                      <option value="4 years">4 years</option>
                      <option value="5 years">5 years+</option>

                    </select>
                  </div>
                  {/* END OF EXPERIENCE */}


                </>
              )
            }

            <button type='submit' onClick={handleSubmit}>Update profile</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Editprofile;
