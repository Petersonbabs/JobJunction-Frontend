import { useEffect, useState } from "react"
import FilterBar from "../../components/FilterBar"
import Grid from "../../components/Grid"
import { UseCompanyContext } from "../../contexts/CompanyContext"
import Card from "../../components/Card"
import Netflix from "../../assets/netflix.jpg"
import { Link } from "react-router-dom"
import manInSuit from "../../assets/man-in-suit.png"
import IsLoading from "../../components/IsLoading"
import { ArrowBackIos, ArrowForwardIos, LocationOnOutlined, MessageOutlined } from "@mui/icons-material"
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import "../../style/companies.css"
import DefaultCompany from "../../assets/default-company.png"




const cardStyle = {
  border: "1px solid #eee",
  padding: "1rem",
  borderRadius: "6px",
  // boxShadow: "0 2px 5px #00000025",
  display: "flex",
  justifyContent: "space-between",
  alignItems: 'start',
  flexDirection: "row",
  gap: "2rem"
}



const Companies = () => {

  const { companiesResponse, companies, getAllCompanies, isLoading } = UseCompanyContext()
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(companiesResponse && companiesResponse.pages);



  useEffect(() => {
    getAllCompanies(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (companiesResponse) {
      setNumOfPages(companiesResponse.pages)
    }
  }, [companiesResponse])






  if (isLoading == true) {
    return <IsLoading />
  }


  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, numOfPages));
  };


  return (
    <div>
      {/* HEADER */}
      <header className="companiesHeader">
        <h2>Companies</h2>
      </header>
      {/* END OF HEADER */}


      {/* MAIN */}
      <section>
        <aside>
          {/* <FilterBar /> */}
        </aside>

        <main>
          {/* <span>showing</span> */}
          <div className="featured-companies" style={{ alignContent: "center" }}>
            {/* <Grid>
              {
                companies ?

                  companies.map((company, index) => {
                    const { fullName, featuredImg, location } = company
                    return (
                      <Link to={`/company/${company._id}`} className='card' key={index}>

                        <Card featuredImg={featuredImg} defaultImg={manInSuit} cardTitle={fullName} detailTwo={location || "now where"} link={`company/${company._id}`} cardStyle={cardStyle} actionBtn={"Chat"} />

                      </Link>
                    )
                  })
                  :
                  <p>Loading</p>
              }
            </Grid> */}

            {
              companies && (
                <>
                  {
                    companies.map((company, index) => {
                      return (
                        <div className="company" key={company._id}>
                          <div className="left">
                            <div className="img">
                              <img src={company.featuredImg || DefaultCompany} alt="" />
                            </div>
                            <div className="detail">
                              <Link to={`/company/${company._id}`}>
                                <h3>{company.companyName}</h3>
                              </Link>
                              <div>

                                <span>
                                  <LocationOnOutlined fontSize="sm" />
                                  {company.location || "No location"}
                                </span>

                              </div>
                            </div>
                          </div>

                        </div>
                      )
                    })
                  }
                </>
              )
            }

          </div>
        </main>
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

      </section>
      {/* END OF MAIN */}
    </div>
  )
}

export default Companies