import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useNavigate } from "react-router-dom";

// function ProfileButton() {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const user = useSelector((store) => store.session.user);
//   const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
//     setShowMenu(!showMenu);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (ulRef.current && !ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const closeMenu = () => setShowMenu(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(thunkLogout());
//     closeMenu();
//   };

//   return (
//     <>
//       <button onClick={toggleMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       {showMenu && (
//         <ul className={"profile-dropdown"} ref={ulRef}>
//           {user ? (
//             <>
//               <li>{user.username}</li>
//               <li>{user.email}</li>
//               <li>
//                 <button onClick={logout}>Log Out</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <OpenModalMenuItem
//                 itemText="Log In"
//                 onItemClick={closeMenu}
//                 modalComponent={<LoginFormModal />}
//               />
//               <OpenModalMenuItem
//                 itemText="Sign Up"
//                 onItemClick={closeMenu}
//                 modalComponent={<SignupFormModal />}
//               />
//             </>
//           )}
//         </ul>
//       )}
//     </>
//   );
// }
function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        navigate("/restaurants"); 
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/restaurants"); 
  };

  return (
    <>
      <button style={{ color: "rgb(141, 4, 4)"}}onClick={toggleMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <i className="fas fa-user" />
      </button>

      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              {/* <li>
                <NavLink to="/">Home</NavLink>
              </li> */}

              {/* <div style={{display: "flex",alignContent:"center", justifyContent:"center",flexDirection: "column",paddingBottom: "5px", paddingLeft: "5px", paddingRight: "5px", border: "solid 2px", borderTop: "solid 2px"}}>
                  <div style={{position:"relative", zIndex: "1"}}>{user.username}</div>
                  <div style={{position:"relative", zIndex: "1"}}>{user.email}</div>
              </div> */}
              <br></br><br></br><br></br>
              <div  
                    className="logout-button">
                {/* <button style={{ position: "absolute", zIndex: "1", borderRadius: "0.5rem", width: "70px", boxShadow: "2px 2px" }}  */}
                <button style={{position: "relative", marginLeft:"2rem",width: "5rem", height: "2rem", zIndex:"1", backgroundColor:"rgb(141,4,4)", color:"white", marginRight: "0px", paddingTop:"0px", marginTop:"0px"}} 
                        onClick={logout}>Log Out
                </button>
               
              </div>
            </>
          ) : (
            <div style = {{marginRight: "3rem", display:"flex", alignContent:"center", justifyContent:"center", paddingTop:"0.05rem"}}>
              <div>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>
              <div>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
