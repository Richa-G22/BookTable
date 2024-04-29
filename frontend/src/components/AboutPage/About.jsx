import React from "react";
// import pic1 from "./images/pic1.png";
// import pic2 from "./images/pic2.png";
import './About.css';

function About() {


    return (
        <body className="about-body">
        <div className="about">
            <div style={{ width: "600px", zIndex: "100" }} className="content">
                <h1 style={{ paddingLeft: "1em", paddingTop: "0.5em", color: "rgb(141, 4,4)" }} className="multicolor-text">Welcome to BookTable!!!</h1>
                <p>BookTable was developed solely for educational purpose at App Academy, keeping in mind the famous table reservation website <span style={{fontWeight:"bold"}}> "OpenTable". </span></p>
                <p>The website aims at providing the user with a similar experience of viewing, selecting a restaurant of choice and reserving a table there. The website is still work in progress. The data provided on the website is not accurate and the resevations done via this website have no credibility. </p>
                
                <h2 style={{paddingTop:"25px"}}>Features</h2>
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
                    <li>Feature in progress.</li><br></br>
                </ul>
                <h3 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Menu Dishes</h3>
                <ul style={{ paddingTop: "3px", marginTop: "3px" }}>
                    <li>Feature in progress.</li><br></br>
                </ul>

                {/* <h2 style={{ paddingBottom: "0px", marginBottom: "0px" }}>Meet the Team:</h2><br></br> */}
                {/* <div className="team">
                    <div>
                        <img style={{ width: "5em", height: "6em", borderRadius: "0.5rem", paddingBottom: "0px" }} src={pic1} alt="preview" /><br></br>
                        <p style={{ marginTop: "0px" }}>Komal Aher</p>
                    </div><br></br>
                    <div>
                        <img style={{ width: "5em", height: "6em", borderRadius: "0.5rem", paddingLeft: "1.5rem" }} src={pic2} alt="preview" /><br></br>
                        <p style={{ marginTop: "0px", paddingLeft: "1.5rem" }}>Richa Garg</p>

                    </div> */}
                {/* </div> */}
            </div>
        </div>
    </body>
    )
}

export default About;