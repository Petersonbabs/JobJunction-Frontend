import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UseEmployeeContext } from '../../contexts/EmployeeContext'
import IsLoading from '../../components/IsLoading'
import Default from "../../assets/default-user.jpg"
import { EmailOutlined, HourglassBottom, LocationOnOutlined, Person, Phone, SchoolOutlined, Work, WorkOffOutlined, WorkOutline, WorkOutlined } from '@mui/icons-material'
import ContactForm from '../../components/ContactForm'
import { Button } from '@mui/material'

const SingleEmployee = () => {

  const { getSingleEmployee, singleEmployee, isLoading } = UseEmployeeContext()
  const { id } = useParams()



  useEffect(() => {
    getSingleEmployee(id)
  }, [])

  // console.log(singleEmployee)




  if (isLoading) {
    return <IsLoading />
  }


  if (singleEmployee) {
    return (
      <>
        <div className='single-employee'>

          <div className="employeeHeader">

            <div className="employeeHeaderCon">
              {/* // employee details */}
              <div className="employeeDetails">

                <div className="left">
                  <img src={singleEmployee.featureImg || Default} alt="" width={"100%"} />
                </div>

                <div className="right">
                  <h3>{singleEmployee.fullName}</h3>
                  <div>
                    <span className='profession'>
                      <WorkOutline fontSize='sm' />
                      <span>{singleEmployee.profession || "No profession"}</span>
                    </span>
                    <span>
                      <LocationOnOutlined fontSize='sm' />
                      <span>{singleEmployee.location || "No location"}</span>
                    </span>
                    <span>
                      <EmailOutlined fontSize='sm' />
                      <span>{singleEmployee.email || "No email"}</span>
                    </span>
                    <span>
                      <HourglassBottom fontSize='sm' />
                      <span>{singleEmployee.age || "No age"}</span>
                    </span>
                  </div>
                </div>

              </div>
              {/* // end of employee details */}



              {/* // employee Actions  */}
              <div className="employeeActions">
                <Button variant='contained' sx={{ marginRight: "10px" }}>Download CV</Button>
                <Button variant='contained'>Invite</Button>
              </div>
              {/* // end of employee Actions */}
            </div>


          </div>
          {/* // end of header */}

          {/* // EMPLOYEE BODY  */}
          <div className="employeeBody">

            <div className="employeeBodyCon">
              {/* // employee MAIN */}
              <main className='employeeMain'>
                {/* // about employee */}
                <div className="aboutEmployee">
                  <h3>About {singleEmployee.fullName}</h3>
                  <p>{singleEmployee.about || "No details"}</p>
                </div>
                {/* // end of about employee */}

                {/* //  employee location  */}
                <div class="map-location">
                  <h3>Location</h3>
                   <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0075207296827!2dYOUR_LONGITUDE!3dYOUR_LATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zYOUR_LATITUDE!5e0!3m2!1sen!2sus!4v1604756721339!5m2!1sen!2sus" 
                  width={"100%"}
                  height={"450"}
                  
                  > 
                  </iframe>
                </div>
                {/* // end of employee location */}


                {/* // employee workExperience  */}
                <div className="workExperience">
                  <h3>Years of Experience in {singleEmployee.profession}</h3>
                  {singleEmployee.experience}
                </div>
                {/* // end of employee workExperience */}

              </main>
              {/* // end of employee MAIN */}


              {/* // employee aside  */}
              <aside>
                {/* // employee details */}
                <div className="details">

                  <li>
                    <Person className='icon' />
                    <div>
                      <p>Gender</p>
                      <span>{singleEmployee.gender}</span>
                    </div>
                  </li>

                  <li>
                    <HourglassBottom className='icon' />
                    <div>
                      <p>Age</p>
                      <span>{singleEmployee.age}</span>
                    </div>
                  </li>

                  <li>
                    <SchoolOutlined className='icon' />
                    <div>
                      <p>Qualification</p>
                      <span>{singleEmployee.qualification}</span>
                    </div>
                  </li>

                  <li>
                    <EmailOutlined className='icon' />
                    <div>
                      <p>Email</p>
                      <span>{singleEmployee.email}</span>
                    </div>
                  </li>

                  <li>
                    <Phone className='icon' />
                    <div>
                      <p>Age</p>
                      <span>{singleEmployee.phoneNumber}</span>
                    </div>
                  </li>

                </div>
                {/* // end of employee details */}

                {/* // contact employee  */}
                <div className='contact'>
                  <h3>Contact Employer</h3>

                  <ContactForm />
                </div>
                {/* // end of contact employee */}
              </aside>
              {/* // end of employee aside */}
            </div>

          </div>
          {/* // END OF EMPLOYEE BODY */}


        </div >
      </>
    )

  }

}

export default SingleEmployee