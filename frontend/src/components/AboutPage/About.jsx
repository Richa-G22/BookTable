import React from "react";
// import pic1 from "./images/pic1.png";
import pic2 from "./images/pic2.png";
import './About.css';

function About() {


    return (
        <body className="about-body">
            <div className="about">
                <div style={{ width: "600px", zIndex: "100" }} className="content">
                    <h1 style={{ paddingLeft: "1em", paddingTop: "0.5em", color: "rgb(141, 4,4)" }} className="multicolor-text">Welcome to BookTable!!!</h1>
                    <p>BookTable was developed solely for educational purpose at App Academy, keeping in mind the famous table reservation website <span style={{ fontWeight: "bold" }}> "OpenTable". </span></p>
                    <p>The website aims at providing the user with a similar experience of viewing, selecting a restaurant of choice and reserving a table there. The website is still work in progress. The data provided on the website is not accurate and the resevations done via this website have no credibility. </p>

                    <h2 style={{ paddingTop: "25px" }}>Features</h2>
                    <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Restaurants</h3>
                    <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                        <li>Any user can view all the restaurants uploaded in the website.</li>
                        <li>Any user can view the details of any restaurant listed on the website.</li>
                        <li>BookTable user can view the restaurants he/she is owner of.</li>
                        <li>Logged in BookTable user can list their own restaurant on the website.</li>
                        <li>Logged in BookTable user who owns a restaurant can edit and delete his/her own restaurant.</li>
                    </ul>
                    <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Reviews</h3>
                    <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                        <li>Any user can view the reviews of a particular restaurant.</li>
                        <li>Any logged in BookTable user can edit/delete his/her review.</li>
                        <li>Owner of a restaurant can not review his/her own restaurant.</li>
                    </ul>
                    <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Bookings</h3>
                    <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                        <li>Any user can view the available spots for a particular restaurant.</li>
                        <li>Logged in user can reserve a spot at a particular restaurant.</li>
                        <li>Logged in users can view their upcoming or past bookings in their profile page.</li>
                    </ul>
                    <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Menu Dishes</h3>
                    <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                        <li>The owner of a particular restaurant can add/ edit or delete a particular menu dish.</li>
                        <li>Any user can view the menu of a particular restaurant.</li>
                    </ul>
                    <br></br>

                    <div>
                        <h2 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Project by:</h2>
                        <br></br>
                        <div className="team">

                            <div>
                                <img style={{ width: "5em", height: "6em", borderRadius: "0.5rem" }} src={pic2} alt="preview" /><br></br>
                                <div>Richa Garg</div>
                                <br></br>
                                <div style={{display:"flex"}}>
                                    <div>
                                    <a href="https://github.com/Richa-G22/BookTable" target="_blank" rel="noopener noreferrer">Github Link</a>
                                    </div>
                                    <div>
                                     <a style={{paddingLeft: "2rem"}} href="https://www.linkedin.com/in/richa-garg-69969665/" target="_blank" rel="noopener noreferrer">linkedin profile Link</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>

                    <h2 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Technologies Used</h2>
                    <br></br>
                    <div style={{ display: "flex" }}>
                        <div>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style={{ width: "75px" }} />
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "75px" }}>React</div>
                        </div>
                        <div style={{ paddingLeft: "2rem" }}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style={{ width: "75px" }} />
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "75px" }}>Redux</div>
                        </div>
                        <div style={{ paddingLeft: "2rem" }}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style={{ width: "75px" }} />
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "75px" }}>HTML</div>
                        </div>
                        <div style={{ paddingLeft: "2rem" }}>
                            <img src="https://www.vectorlogo.zone/logos/sequelizejs/sequelizejs-icon.svg" style={{ width: "75px" }} />
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "75px" }}>Sequelize</div>
                        </div>
                        <div style={{ paddingLeft: "2rem" }}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style={{ width: "75px" }} />
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "75px" }}>CSS</div>
                        </div>
                        <div style={{ paddingLeft: "2rem" }}>
                            <img src="https://cdn.worldvectorlogo.com/logos/express-2.svg" style={{ width: "75px", background: "gray" }} />
                            <div style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "75px" }}>Express JS</div>
                        </div>
                    </div>

                </div>
            </div>
        </body>
    )
}

export default About;