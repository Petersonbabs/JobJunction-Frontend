import { useEffect, useState } from "react"
import FilterBar from "../../components/FilterBar"
import Grid from "../../components/Grid"
import { UseEmployeeContext } from "../../contexts/EmployeeContext"
import Card from "../../components/Card"
import { Link } from "react-router-dom"
import defaultUser from "../../assets/default-user.jpg"
import IsLoading from "../../components/IsLoading"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"
import { HourglassBottom, HourglassBottomOutlined, LocationOnOutlined, Money, WorkOutline } from "@mui/icons-material"
import "../../style/employees.css"


const headerStyle = {
  background: "var(--light-blue)",
  display: "flex",
  justifyContent: "center",
  padding: "1.5rem 0",
  marginBottom: "3rem"
}


const cardStyle = {
  border: "1px solid #eee",
  padding: "1rem",
  borderRadius: "6px",
  boxShadow: "0 2px 5px #00000025",
  display: "flex",
  alignItems: 'start',
  gap: "1rem"
}

const Employees = () => {

  const { employeesResponse, employees, getAllEmployees, isLoading } = UseEmployeeContext()
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(employeesResponse && employeesResponse.pages);


  useEffect(() => {
    getAllEmployees(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (employeesResponse) {
      setNumOfPages(employeesResponse.pages)
    }
  }, [employeesResponse])






  if (isLoading == true) {
    return <IsLoading />
  }


  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, numOfPages));
  };




  if (employeesResponse) {
    console.log(employeesResponse);
  }


  if (isLoading) {
    return <IsLoading />
  }



  return (
    <div>
      {/* HEADER */}
      <header className="employeesHeader">
        <h2>Candidates</h2>
      </header>
      {/* END OF HEADER */}


      {/* MAIN */}
      <section>

        <main>
          {/* <span>showing</span> */}
          <div className="featured-employees" style={{ alignContent: "center" }}>

            {
              employees && (
                <>
                  {
                    employees.map((employee, index) => {
                      return (
                        <div className="employee">

                          <div className="left">
                            <div className="img">
                              <img src={employee.featuredImg} alt="" />
                            </div>

                            <div className="detail">
                              <Link to={`/employee/${employee._id}`}>
                                <h3>{employee.firstName} {employee.lastName}</h3>
                              </Link>

                              <div>
                                <span>
                                  <LocationOnOutlined fontSize="sm" />
                                  {employee.location || "No location"}
                                </span>

                                <span>
                                  <WorkOutline fontSize="sm" />
                                  {employee.profession}
                                </span>

                                <span>
                                  <HourglassBottomOutlined fontSize="sm" />
                                  {employee.experience}
                                </span>
                              </div>

                            </div>

                          </div>

                          <button>View Profile</button>
                        </div>
                      )
                    })
                  }
                </>
              )
            }

          </div>

          <div className="pagination">
            <span onClick={handlePrevPage} disabled={currentPage === 1} style={{ display: currentPage === 1 ? "none" : "inline-flex" }} className="icon">
              <GrLinkPrevious />
            </span>
            <span className="text">
              <span className="currentPage">{currentPage}</span> of {numOfPages}</span>
            <span onClick={handleNextPage} style={{ display: currentPage === numOfPages ? "none" : "inline-flex" }} className="icon">
              <GrLinkNext />
            </span>
          </div>
        </main>
      </section>
      {/* END OF MAIN */}
    </div>
  )
}

export default Employees