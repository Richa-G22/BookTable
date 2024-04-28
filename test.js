  //npx sequelize model:generate --name Restaurant --attributes 
  //restaurantType:String,ownerId:Integer,address:String,city:String,state:String,
  //country:String,zipCode:Integer,phone:String,name:string,
  //description:string,cuisines:string,locationMapUrl:String,dayClosed:String,
  //hoursOfOperation:String,avgMealPrice:String,parkingAvailability:String,
  //paymentOption:String,dressCode:String,executiveChef:String,menuUrl:String;


  //npx sequelize model:generate --name Review --attributes
  //restaurantId:integer,userId:integer,review:string,stars:integer;


  //npx sequelize model:generate --name ReviewImage --attributes
  //reviewId:Integer,reviewUrl:String;


  //npx sequelize model:generate --name RestaurantImage --attributes
  //restaurantId:integer,restaurantUrl:String; 


  //npx sequelize model:generate --name MenuDish --attributes
  //restaurantId:integer,dishCategory:String,dishName:String,dishIngredients:String,dishPrice:decimal,
  //dishCalories:integer,dishAllergies:String; 


  //npx sequelize model:generate --name Holiday --attributes
  //restaurantId:integer,occasion:String; 


  //npx sequelize model:generate --name Booking --attributes 
  //restaurantId:integer,userId:integer,slotId:integer,bookingDate:date;


  //npx sequelize model:generate --name Slot --attributes
  //restaurantId:integer,slotStartTime:time,slotDuration:integer,tableCapacity:integer,tableNum:integer;









   
  
    

  import { useState } from "react";
  import { NavLink, useNavigate } from "react-router-dom";
  import { thunkLogin } from "../../redux/session";
  import { useDispatch } from "react-redux";
  import { useModal } from "../../context/Modal";
  import "./LoginForm.css";
  
  
  function LoginFormModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
        );
  
      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
        navigate("/photos/");   //RG - to fix logging in on same screen
      }
    };
  
    const handleDemoLogin = async (e) => {
    e.preventDefault();
    setEmail('demo@aa.io');
    setPassword('password');
      //RG - to automate login of Demo User
      const serverResponse = await dispatch(
        thunkLogin({
          email: 'demo@aa.io',
          password:'password'
        })
        );
  
      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
        navigate("/photos/");   
      }
      //RG - to automate login of Demo User
  };
  
    return (
      <>
        <div className="login-div">
          <i className="fa-brands fa-flickr"></i>
  
          <h1>Log in to Clickr </h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="div-login-label">
              <input
                className="login-input"
                placeholder="Email address"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            {errors.email && <p className="error-message">{errors.email}</p>}
            <div className="div-login-label">
              <input
                className="login-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
  
            <button className="signIn-btn" type="submit">
              Sign In
            </button>
            <div className="demo-link">
              <p>
                <a href="#" className="demo-user-link" onClick={handleDemoLogin}>
                  Demo User
                </a>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
  
  export default LoginFormModal;


import { useState} from 'react';
import { thunkLogin } from "../../redux/session";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(thunkLogin({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log('......message...', data.message)
        console.log('......data.......',data)
        console.log('.....datatype of data.....', typeof(data))
        console.log('.....errors.....', errors)
        
        if (data) {
          console.log('......inside if loop....', data.message);
          //setErrors((errors) => ({ ...errors, ...data.message }));
          setErrors({'email' : "The provided credentials were invalid"});
        } 
        
      });
  };
 
  console.log('.....login.....', credential);
  console.log('.....password.....', password);
  

  return (
    <>
        <div>
            <h1 className="log-in">Log In</h1>
        </div>

          <div className="login-input-fields-div">
          {errors.email && (<p className='error'>{errors.email}</p>)}
            <form onSubmit={handleSubmit}>
              <div>
                  <input className='form-input-fields'
                    type="text"
                    placeholder='Username or Email'
                    value={credential}
                    onChange={(e) => {setErrors({}),setEmail(e.target.value)}}
                    required
                  />
              </div>
              <br></br>
                
              <div>
                  <input className='form-input-fields'
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => {setErrors({}),setPassword(e.target.value)}}
                    required
                  /> 
              </div>
              <br></br>

              <div>
                    <button className="log-in-button" type="submit" disabled=
                    {credential.length <= 3 || password.length <= 5}>Log In</button>
              </div>
              <br></br>

              <div>
                    <button
                      className="demo-user-button" type="submit"
                      onClick={(e) => {handleDemoLogin}}
                        // e.preventDefault();
                        // setCredential("Demo-lition"),
                        // setPassword("password")}}
                    >
                      Log in as Demo User
                    </button>
              </div>      
            </form>
          </div>    
    </>
  );
}

export default LoginFormModal;



import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detailedPhotoThunk } from "../../redux/photos";
import { NavLink, useNavigate } from "react-router-dom";
import "./DetailedPhoto.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteImageModal from "./DeleteImageModal";
// ka
import { get_comments_thunk } from "../../redux/comments";
import CreateNewComment from "../Comments/CreateNewComment/CreateNewComment";
import EditComment from "../Comments/EditComment/EditCommentModal";
import DeleteComment from "../Comments/DeleteComment/DeleteCommentModal";

export const Modal = ({ src, alt, title, onClose }) => {
  return (
    <div className="modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <img className="modal-content" src={src} alt={alt} />
      <div className="caption">{title}</div>
    </div>
  )
}

const DetailedPhoto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const photoId = parseInt(id);

  const sessionUser = useSelector((state) => state.session.user);
  const currentPhoto = useSelector((state) => state.photos.byId[id]);
  const [isLoaded, setisLoaded] = useState(false);
  // Ka
  const allComments = useSelector((state) => state.comments.allComments);
  // ka
  const [isOpen, setIsOpen] = useState(false)
  const showModal = () => setIsOpen(true)

  console.log("&&&&&&&&&&", currentPhoto);

  useEffect(() => {

    const getData = async () => {
      await dispatch(detailedPhotoThunk(photoId));
      setisLoaded(true);
    };
    // if (!currentPhoto) {
    getData();
    // }
  }, [dispatch, photoId]);

  // Ka
  useEffect(() => {
    dispatch(get_comments_thunk(photoId));
  }, [dispatch, photoId]);
  //  ka

  if (!currentPhoto) {
    return "Photo not found";
  }

  console.log("Detailed Photo here");
  return (
    <div>
      <div>
        {isLoaded ? (
          <div>
            <div>
              {currentPhoto ? (
                <div>
                  {/* <div className='menu'>

                            <div>
                                <OpenModalButton
                                    buttonText="Delete Photo"
                                    modalComponent={
                                        <DeleteImageModal photoId={photoId} />
                                    }
                                />
                            </div> &nbsp;

                            <button style={{
                                backgroundColor: "grey", color: "white",
                                boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"
                            }}
                                onClick={() => navigate(`/photos/update/${photoId}`)}>Edit Photo
                            </button> &nbsp;

                        </div> */}
                </div>
              ) : (
                <h2> 404 : Requested photo does not exist</h2>
              )}
            </div>
            <div className="pic-detail-info">
              {/* <div style={{ fontSize: "20px", fontWeight: "bold" }}> */}
              <div>
                {" "}
                <h2 style={{ textTransform: "uppercase", paddingBottom: "0", borderBottom: "0", marginBottom: "0px" }}>{currentPhoto.title}</h2>
              </div>
              {currentPhoto.description ? (
                <div style={{ paddingTop: "0", fontStyle: "italic", fontSize: "1.15rem" }}>
                  <h4>{currentPhoto.description}</h4>
                </div>
              ) : null}
            </div>

            <div className="pic-detail-image-div">
              <img
                className="pic-detail-preview-image"
                onClick={showModal}
                src={currentPhoto.url}
                alt="previewImage"
              />
              {isOpen && (
                <Modal
                  src={currentPhoto.url}
                  alt="previewImage"
                  title={currentPhoto.title}
                  onClose={() => setIsOpen(false)}
                />
              )}
            </div>
            {/* <div className="pic-detail-info">
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {" "}
                {currentPhoto.title}
              </div>
              {currentPhoto.description ? (
                <div style={{ fontSize: "18px" }}>
                  &nbsp;&nbsp;: &nbsp;&nbsp;{currentPhoto.description}
                </div>
              ) : null}
            </div> */}
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
      {/* // ka */}
      <div>
        <h2 style={{ paddingLeft: "1rem" }}>Comments</h2>
        <div>
          {allComments.length === 0 &&
            sessionUser &&
            sessionUser.id !== currentPhoto.userId && (
              <span className="">
                <div>
                  <h3 style={{ paddingLeft: "1rem" }}>Be the first person to comment</h3>
                </div>
              </span>
            )}

        </div>
        <div style={{ paddingLeft: "1rem", paddingBottom: "1rem" }}>
          {sessionUser &&
            currentPhoto &&
            sessionUser.id !== currentPhoto.userId && (
              <div>
                <CreateNewComment photo={currentPhoto} />
              </div>
            )}
        </div>
        <div style={{ paddingLeft: "1rem", paddingBottom: "2rem" }}>
          {allComments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "normal",
                  fontSize: "16px",
                  marginTop: "20px",
                  marginBottom: "3px",
                  fontSize: "20px",
                  paddingBottom: "0.5rem"
                }}
              >
                {comment.userName} : "{comment.comment}"

              </div>

              {sessionUser && sessionUser.id == comment.userId && (
                <span>
                  <OpenModalButton
                    buttonText={"Edit Comment"}
                    modalComponent={
                      <EditComment props={{ comment: comment, photoId: id }} />
                    }
                  />

                  <OpenModalButton
                    buttonText={"Delete Comment"}
                    modalComponent={<DeleteComment comment={comment} />}
                  />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* // ka */}
    </div>
  );
};


export default DetailedPhoto;
