import { Box, Container } from '@mui/material'
import React from 'react'
import Card from '../../components/Card'


const cardStyle = {
    padding: "1rem",
    borderRadius: "6px",
    display: "flex",
    alignItems: 'center',
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "1.5rem"
}

const cardMiddleStyle = {
    display: "flex",
    alignItems: 'center',
    flexDirection: "column",
}

const cardDetailStyle = {
    justifyContent: "center",
}

const headerStyle = {
    boxShadow: "none",
    border: "none",
    background: "transparent"
}

const headerConStyle = {
    background: "var(--lighter-blue)",
    padding: "2rem"
}



const SinglePage = ({ singleDoc, pageImg, defaultImg, pageTitle, pageTags, pageAction, pageDetailOne, pageDetailTwo, pageDetailThree, pageDetailFour, pageDescription, secondListTitle, secondList, actionLink, secondListItem, firstSideTitle, firstSideItemOne, firstSideItemTwo, firstSideItemThree, firstSideItemFour, secondSideTitle, secondSideItemOne, }) => {



    return (
        <div style={headerConStyle}>
            {
                singleDoc

                    ?
                    <Box className='single-page' >
                        <header style={headerStyle}>
                            {/* HEADER LEFT */}
                            <div className="single-header-left">

                                <Card featuredImg={pageImg || defaultImg} cardTitle={pageTitle} tags={pageTags} detailOne={pageDetailOne} detailTwo={pageDetailTwo} detailThree={pageDetailThree} actionBtn={pageAction} detailFour={pageDetailFour} cardStyle={cardStyle} cardMiddleStyle={cardMiddleStyle} cardDetailStyle={cardDetailStyle} actionLink={actionLink}/>


                                {/* <div style={{
                                    width: "4rem",
                                    height: "4rem",
                                }}>
                                    <img src={featuredImg || defaultImg} alt="" width={"100%"} />
                                </div> */}

                                {/* <h4>{title}</h4> */}
                            </div>
                            {/* END OF HEADER LEFT */}

                            {/*  HEADER RIGHT   */}
                            <div className="single-header-right">

                            </div>
                            {/*  END OF HEADER RIGHT   */}
                        </header>

                        {/* BODY */}
                        <section>

                            {/* MAIN */}
                            <main style={{background: "#fff", padding: "1em 2rem"}}>
                                {/* job Description */}
                                <div className="job-description">
                                    <h3>Job Description</h3>
                                    <p>{pageDescription}</p>
                                </div>

                                {/* Key Responsibilieste */}
                                <div className="job-responsibilities">
                                    <h3></h3>

                                    <ul>
                                        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolorem eius, in facere maxime, nostrum quos doloremque odit vel mollitia, quam hic ea! A corrupti, obcaecati fugit at laborum dolores?</li>
                                        <li>Doloremque nobis sapiente nesciunt ex facilis reprehenderit esse cum accusantium voluptatibus architecto distinctio dolores minima eaque ipsum repellat ea laudantium quos officiis, ipsa, natus reiciendis quasi voluptatum numquam! Odit, laudantium.</li>
                                        <li>Repellat nihil voluptate nostrum! Quod, at! Hic, officiis expedita repudiandae aperiam laboriosam temporibus sint quia accusantium maiores. Quas, voluptatum velit accusamus dolorum consectetur quisquam error impedit beatae eveniet, laborum laboriosam.</li>
                                        <li>Facilis adipisci corporis, ab eaque voluptas aliquid nesciunt quod placeat id. Qui atque odit, numquam sequi illum culpa dolor mollitia nobis perferendis, fuga quia maxime officiis tenetur explicabo voluptates dolore.</li>
                                        <li>Voluptate dolor earum suscipit reiciendis nobis amet eius eaque velit modi in nesciunt, sequi sunt maxime eligendi minima ea eos adipisci enim! Commodi, iure adipisci. Reiciendis omnis laudantium vel dolorum.</li>
                                        <li>Quae, nihil error totam eaque adipisci amet aspernatur accusantium, nisi explicabo eveniet ab nostrum modi iusto dolorum hic inventore architecto omnis alias, suscipit neque. Quos adipisci autem et dolore nemo!</li>
                                        <li>Consectetur vitae impedit esse libero cum. Adipisci reiciendis, excepturi fugit mollitia nesciunt tempora eaque voluptatem consequatur minus libero facere expedita nulla totam, et earum temporibus dolorum enim dolorem exercitationem odio.</li>
                                    </ul>
                                </div>

                                {/* Skill & Experience */}
                                {/* <div className="skills">
                                    <h3>{secondListTitle}</h3>
                                    <ul>
                                        {

                                            secondList.map((item, index)=>{
                                                <p>{item}</p>
                                            })
                                        }
                                    </ul>
                                </div> */}

                            </main>
                            {/* END OF MAIN */}

                            {/* SIDEBAR */}
                            <aside className="sidebar">

                                {/* Job Overview */}
                                <div className="first-side">
                                    <h3>{firstSideTitle}</h3>
                                </div>

                            </aside>
                            {/* END OF SIDEBAR */}

                        </section>
                        {/* END OF BODY */}

                    </Box>

                    :
                    <H1 style={{ textAlign: "center" }}>Lodaing</H1>
            }

        </div>
    )
}

export default SinglePage