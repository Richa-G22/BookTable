import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import "./images/cover.jpg";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  console.log("********", sessionUser);

  return (

    <div>

      <nav className="nav-header">
        <NavLink style={{ textDecoration: "none" }} to="/restaurants">
          <div style={{position:"relative", marginRight:"5%"}}className="logo-div">
            <i className="fa-solid fa-utensils" style={{ color: "rgb(141, 4, 4)"}}></i>&nbsp;&nbsp;
            <div style={{ paddingTop: "6px",  fontSize:"1.15em" }}>BookTable</div>
          </div>
        </NavLink>
        <div  className="user">
          {sessionUser ?
            <>
              <div style={{ position:"relative", marginLeft:"50em", fontSize: "20px", color:"white", paddingTop:"4.2em", zIndex:"1"}}>
                    Hello, &nbsp;{sessionUser.firstName}
              </div>&nbsp;
              <div style={{ fontSize: "20px", justifyContent:"center", color:"white",paddingTop:"4em", zIndex:"1"}}>
                  {sessionUser.lastName}!
              </div>
              {/* <div style={{ fontSize: "20px", justifyContent:"center", fontStyle:"italic" }}>{sessionUser.email}</div> */}
            </>
            : ""
            // <div style={{ paddingLeft:"50rem", fontSize: "20px", justifyContent:"center", fontFamily: "cursive" }}>Signup & Earn Rewards !!</div>
          }
        </div>
        <div className='menu'>
          <ProfileButton style={{paddingLeft:"90rem"}}user={sessionUser} />
        </div>
      </nav>

      <div className="nav-background-image">
        <div style={{width:"100%"}}className="container">
          <div style={{ position: "relative", textAlign: "center", alignItems: "center", fontSize: "2em", color: "white", paddingLeft: "5rem", paddingTop: "6em" }}>NEW YORK CITY RESTAURANTS</div><br></br>
          <div style={{ position: "relative", textAlign: "center", alignItems: "center", fontSize: "3em", color: "white", paddingLeft: "7rem" }}>Make a free reservation now</div>
        </div>
      </div>

      <div className="nav-footer">
        {/* <NavLink style={{ paddingLeft: '68em', paddingRight: '2em', paddingTop: '5em', textDecoration: 'none', color: 'white', justifyContent: 'center', justifyItems: 'center' }} to="/restaurants/">
          About Us
        </NavLink> */}
        <NavLink style={{ paddingTop:"2px", textDecoration: 'none', justifyItems: 'center', fontSize:"15px" }} className="footer-text" to="/about/">
          About Us
        </NavLink>
        <h2 className="footer-text">BookTable : Reserve in advance and have peace of mind</h2>
      </div>

    </div>
  );
}

export default Navigation;
