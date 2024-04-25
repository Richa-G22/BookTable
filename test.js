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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createNewPhotoThunk } from '../../redux/photos';
import "./CreateNewPhoto.css";

const CreateNewPhoto = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState("");
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [photoId, setphotoId] = useState("");
    const [errors, setErrors] = useState({});
    const [showUpload, setShowUpload] = useState(true);
    const [previewUrl, setPreviewUrl] = useState("");

    let foundError = false;
    // AWS 
    const updateImage = async (e) => {
        console.log("Inside updateImage AWS")
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        setUrl(file);
        setShowUpload(false);
        return file
    };






    const validate = () => {
        foundError = false;
        setErrors({});
        console.log('.......inside validate........')

        if (!title.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, title: "Title is required" }));
        }

        // if (url) {
        //     try {
        //         new URL(url);
        //         return true;
        //     } catch (errors) {
        //         foundError = true;
        //         setErrors((errors) => ({ ...errors, url: "Please enter a valid URL " }));

        //     }
        // }

        // if (!url) {
        //     foundError = true;
        //     setErrors((errors) => ({ ...errors, url: "Photo URL is required" })); 
        // }
        if (!url) {
            foundError = true;
            setErrors((errors) => ({ ...errors, url: "Photo is required" })); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate();

        try {
            if (!foundError) {
                const newPhoto = await dispatch(
                    createNewPhotoThunk({ title, description, label, url, user })

                ).catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) {
                        setErrors((errors) => ({ ...errors, ...data.errors }));
                    }
                })
                navigate('/photos/current')
            }
        } catch (error) {
            const data = await error.json();
            if (data.errors) {
                setErrors((errors) => ({ ...errors, ...data.errors }));
            }
        }
    }

    return (
        <form className="create-photo-form" onSubmit={handleSubmit}>
            <h2>Create a new Photo</h2>
            <p className="h4">Fields marked as * are mandatory.</p>
            <div className="input-row">
                <label htmlFor="title">
                    Title *  &nbsp;<span className="error">{errors.title}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    id="title"
                ></input>
            </div>

            <div className="input-row">
                <label htmlFor="label">
                    Label <span className="error">{errors.label}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="label"
                    id="label"
                ></input>
            </div>

            <div className="input-row">
                <label htmlFor="description">
                    Description <span className="error">{errors.description}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    id="description"
                />
            </div>

            <div className="input-row">
                {console.log("Inside input row of photo")}
                {console.log("showUpload", showUpload)}
                {showUpload && (
                    <>
                        <label htmlFor="file-upload">
                            Select from device *   &nbsp;<span className="error">{errors.url}</span>
                        </label>
                        <input
                            className="input-wide"
                            type="file"
                            value={url}
                            onChange={updateImage}
                            placeholder="Photo"
                            id="file-upload"
                            accept=".pdf, .png, .jpg, .jpeg, .gif"
                            name="imageURL"
                        />
                    </>)}
                {!showUpload && (
                    <img
                        src={previewUrl}
                        className="preview-image"
                        alt="preview"
                    />
                )}
            </div>

            <div className="submit-button-div">
                <button className="submit-button" type="submit">
                    Create Photo
                </button>
            </div>
        </form>
    );
};

export default CreateNewPhoto;

<div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Select a phone type...
            </option>
            {/* <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Mobile">Mobile</option> */}
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}

  // call this to get the "XSRF-TOKEN" cookie, should only be used in development
  
    export function restoreCSRF() {
            return csrfFetch('/api/csrf/restore');
    }

// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
}





module.exports = router;


import { addPhotoToAlbumThunk } from '../../redux/albums';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './AddPhotoToAlbumModal.css';

function AddPhotoToAlbumModal({albumId, all_photos_in_state, all_photos_in_state_obj, setUpdateMode, photos_already_present}) {
    console.log("Add photos to modal1", albumId);
    console.log("Add photos to modal2", all_photos_in_state, typeof(all_photos_in_state));
    console.log("Photos already present", photos_already_present, typeof photos_already_present);
    const [photo, setPhoto] = useState("Select a Photo");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    let foundError = false;
    
    const handlePhotoChange = (e) => {
        setUpdateMode(true);
        setPhoto(e.target.value)
    }
    
    return (
        <div className='main-div'>
                <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Select Photo</h2>
        
                <select style={{width: '400px', height: '30px',paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'lightyellow'}} onChange={handlePhotoChange}>
                    <option style={{display: "flex", width: "30%"}} value="Select a Photo"> -- Select a Photo -- </option>
                    {all_photos_in_state.map((photo) => <option key={photo.id} value={photo.id}>{photo.title}</option> )}
                    {/* {photos_available.map((photo) => <option key={photo.id} value={photo.id}>{photo.title}</option> )} */}
                </select>

                {/* {(() => {
                    if (parseInt(photo) in photos_already_present){
                        console.log("1", foundError);
                        foundError = true;
                        console.log("2", foundError);
                    }      
                    return null;
                })()} */}

                {(() => {
                    for (let i = 0; i < photos_already_present.length; i++) {
                        if (parseInt(photo) === photos_already_present[i].id) {
                            console.log("1", foundError);
                            foundError = true;
                            console.log("2", foundError);
                        }
                    }
                      
                    return null;
                })()}
            
                {!foundError ?
                
                <div style={{display:"flex",alignContent:"center", justifyContent:"center", flexDirection:"column", alignItems:"center", justifyItems:"center"}}>
                    <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
                    Are you sure you want to add this photo? </p>
                    {console.log("no error")}
                    <button className='yes-button' onClick={() => dispatch(addPhotoToAlbumThunk(albumId,all_photos_in_state_obj[parseInt(photo)])) 
                    // <button className='yes-button' onClick={() => dispatch(addPhotoToAlbumThunk(albumId,photos_available))
                            .then(() => setUpdateMode(false), closeModal())} >Yes (Add Photo) 
                            
                    </button>    
                    <button className='no-button' onClick={() => closeModal()}>No (Do not Add)
                    </button><br></br>     
                </div>
                : 
                <div style={{display:"flex",alignContent:"center", justifyContent:"center", flexDirection:"column", alignItems:"center", justifyItems:"center"}}>
                    <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px", color:"red" }}>
                    Photo already present. </p>
                    {console.log("error")}
                    {foundError = false}
                    <button className='no-button'>Yes (Add Photo) </button>
                    <button className='no-button' onClick={() => closeModal()}>No (Do not Add)
                    </button><br></br>
                </div>}
            </div>      
    )
}

export default AddPhotoToAlbumModal;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editPhotosThunk } from '../../redux/photos';
import "./EditPhotos.css";

const EditPhotos = () => {
    // console.log('.......inside update Photo function........');
    let { id } = useParams();
    id = parseInt(id);
    console.log('.....photoId......', id, typeof(id))
    const user = useSelector((state) => state.session.user.id);
    const currentPhoto = useSelector((state) => state.photos.byId[id]);
    console.log('.......currentPhoto........', currentPhoto);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState(currentPhoto? currentPhoto.title : title);
    const [description, setDescription] = useState(currentPhoto? currentPhoto.description : description);
    const [url, setUrl] = useState(currentPhoto? currentPhoto.url : url);
    const [label, setLabel] = useState(currentPhoto? currentPhoto.label : label);
    const [errors, setErrors] = useState({});
    let foundError = false;
    const [showUpload, setShowUpload] = useState(true);
    const [previewUrl, setPreviewUrl] = useState("");

    // AWS 
    const updateImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        setUrl(file);
        setShowUpload(false);
        return file
    };
  

    if (!currentPhoto) {
        return <h2>Photo to be edited not found!!</h2>
    }

    const validate = () => {
        foundError = false;
        setErrors({});
        console.log('.......inside validate........')

        if (!title.trim()) {
          foundError = true;
          setErrors((errors) => ({ ...errors, title: "Title is required" }));     
        }

        // if (url) {
        //     try {
        //         new URL(url);
        //         return true;
        //     } catch (errors) {
        //         foundError = true;
        //         setErrors((errors) => ({ ...errors, url: "Please enter a valid URL " }));
    
        //     }
        // }
    
        // if (!url) {
        //     foundError = true;
        //     setErrors((errors) => ({ ...errors, url: "Photo URL is required" })); 
        // }
        if (!url) {
            foundError = true;
            setErrors((errors) => ({ ...errors, url: "Photo is required" })); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const photo = {
            label,
            title,
            description,
            url,    
        };

        validate();
        try {
            if (!foundError) {
                const updatedPhoto = await dispatch(
                    editPhotosThunk(currentPhoto.id, photo)
            ). catch (async (res) => {
                const data = await res.json();
                if (data.errors) {
                    setErrors((errors) => ({ ...errors, ...data.errors }));
            }
            })
        navigate('/photos/current')
        }} catch (error) {
            const data = await error.json();
            console.log('$$$$$$$$$$data', data)
                if (data.errors) {
                    setErrors((errors) => ({ ...errors, ...data.errors }));
                }
        }
    };

    return (
        <form className="update-photo-form" onSubmit={handleSubmit}>
            <h2>Update your Photo</h2>
            <p className="h4">Fields marked as * are mandatory.</p>
            <div className="input-row">
                <label htmlFor="title">
                Title *  &nbsp;<span className="error">{errors.title}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentPhoto.title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    id="title"
                ></input>
            </div>

            <div className="input-row">
                <label htmlFor="label">
                Label <span className="error">{errors.label}</span>
                </label>
                <input
                className="input-wide"
                type="text"
                defaultValue={currentPhoto.label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="label"
                id="label"
                ></input>
            </div>

            <div className="input-row">
                <label htmlFor="description">
                    Description <span className="error">{errors.description}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentPhoto.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    id="description"
                />
            </div>

            <div className="input-row">
                {showUpload && (
                <>
                <label htmlFor="file-upload">
                Select from device *    &nbsp;<span className="error">{errors.url}</span>
                </label>
                <input
                className="input-wide"
                type="file"
                // defaultValue=" "
                onChange={updateImage}
                placeholder="Photo"
                id="file-upload"
                accept=".pdf, .png, .jpg, .jpeg, .gif"
                name="imageURL"
                />
                </>)}
                {!showUpload && (
                    <img  
                      src={previewUrl}
                      className="preview-image"
                      alt="preview"
                    />
                )}
            </div>


            {/* <div className="input-row">
                <label htmlFor="url">
                Photo URL *   &nbsp;<span className="error">{errors.url}</span>
                </label>
                <input
                className="input-wide"
                type="text"
                defaultValue={currentPhoto.url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Photo"
                id="url"
                />
            </div> */}

            <div className="submit-button-div">
                <button className="submit-button" type="submit">
                    Update
                </button>
            </div>
        </form>
    )
}

export default EditPhotos;



import { csrfFetch } from './csrf';

//action types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

//action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

//login thunk action
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//restoreUser thunk action to retain the logged in session user
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//signup thunk action
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    console.log('.......inside thunk.....', data );
    dispatch(setUser(data.user));
    return response;
};

//logout thunk action
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
  };

//initialState should not have any logged in user  
const initialState = { user: null };

//session Reducer
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;


import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { resetFavThunk } from "../../redux/favorites";
import { NavLink, useNavigate } from "react-router-dom";


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
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    dispatch(resetFavThunk())
    closeMenu();
    navigate("/photos/");   //RG - to fix logging out on same screen
  };

  return (
    <>
      <button onClick={toggleMenu}>
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
              <div style={{ display: "flex", alignContent: "center", justifyContent: "center", padding: "5px", borderBottom: "solid 2px", borderRight: "solid 2px", borderLeft: "solid 2px", paddingBottom: "0px" }} className="logout-button">
                <button style={{ position: "absolute", zIndex: "1", borderRadius: "0.5rem", width: "70px", boxShadow: "2px 2px" }} onClick={logout}>Log Out</button>
               
              </div>
            </>
          ) : (
            <div style = {{paddingRight: "60px", display:"flex", alignContent:"center", justifyContent:"center", paddingTop:"5px"}}>
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


.profile-dropdown {
  position: absolute;
  
}

.hidden {
  display: none;
}

.logo-div {
  display: flex;
  align-items: center;
  padding-left: 120px;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  color:white;
  font-size: 25px;
  font-weight: bolder;

}

.nav-header {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 2px solid rgb(230, 224, 224);
  text-decoration: none;
  background-color: black;
}

.nav-footer {
  position: fixed;
  bottom: 0;
  overflow: hidden;
  z-index: 10;
  background-color: black;
  width: 100%;
  height: 40px;
  
}

.profile-menu-button{
  display: flex;
  border-radius: 15px;
  width: 65px;
  height: 30px;
  align-items: center;
  justify-content: center;
}

.create-new-album{
  color: rgb(35, 35, 124);
  font-size: 20px;
}

.bottom-menu{
  display: flex;
  border-bottom: 2px solid rgb(211, 208, 208);
  /* height: 40px; */
  height: 2.5em;
  align-items:center;
  padding-bottom: 2px;
  box-sizing: border-box;
}

.menu{
  display: flex;
  color: white;
}

.logout-button {
  border: 1px solid black;
  border-radius: 50px;
  font-size: 14px;
  margin: 5px 0;
  background-color: rgb(102, 100, 100);
  cursor: pointer;
  color: white;
  padding: 7px;
}

.nav-image {
  border-top: black 2px;
  display: flex;
  height: 300px;
  width: 100%
}

.nav-background-image {
  background-image: url("https://photofocus.com/photography/five-tips-to-photograph-cityscape-panoramas/attachment/killing-softly/");
  border-top: black 2px;
  display: flex;
  height: 300px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.footer-text {
  color: rgb(223, 220, 220);
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 12px;
  font-family: serif;
}

.container {
  display: flex;
  align-items: last baseline;
  justify-content: center;
  padding-bottom: 20px;
  padding-left: 45%;
}

.nav-links {
  text-decoration: none;
  padding-top: 2px;
  color: black;
}

import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the button that opens the modal
  onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return (
    <button style={{borderRadius: "7px", width: "70px", height: "30px"}} onClick={onClick}>{itemText}</button>
  );
}

export default OpenModalMenuItem;


import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          console.log('.......data.......', data);
          if (data && data.errors) {
            setErrors({...data.errors });
            console.log('......data.errors....', data.errors);
            console.log('.....email....', email);
            console.log('.....username....', username);
          //  setErrors(data.errors);
          }
        });
    }
    return setErrors({...errors,
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <div>
          <h1 className="sign-up">Sign Up</h1>
      </div>
    
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      {errors.lastName && <p className="error">{errors.lastName}</p>}
      {errors.email && <p className="error">{errors.email}</p>}
      {errors.username && <p className="error">{errors.username}</p>}
      {errors.password && <p className="error">{errors.password}</p>}
      {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

      <div className='input-fields-div'>
      <form onSubmit={handleSubmit}>
        <div>
          <input className='input'
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          /> 
        </div>
        <br></br>

        <div>
          <input className='input'
            type="text"
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          /> 
        </div>
        <br></br>
        
        <div>
          <input className='input'
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> 
        </div>
        <br></br>

        <div>
          <input className='input'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /> 
        </div>   
        <br></br> 
        
        <div>
          <input className='input'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> 
        </div>
        <br></br>

        <div>   
          <input className='input'
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          /> 
        </div> 
        <br></br> 
        
        <button className="sign-up-button" type="submit" disabled={
          email.length === 0 || username.length < 4 ||
          firstName.length === 0 || lastName.length === 0 ||
          password.length < 6 || confirmPassword.length === 0
        }>Sign Up</button> 
       
      </form>
      </div>
    </>
  );
}

export default SignupFormModal;


// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
     // .withMessage('Please provide a valid email or username.'),
     .withMessage('Email or username is required'), 
    check('password')
      .exists({ checkFalsy: true })
     // .withMessage('Please provide a password.'),
     .withMessage('Password is required'),
    handleValidationErrors
  ];

router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
  
      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error("Invalid credentials");
        err.status = 401;
        //res.message = "Invalid credentials"; 
        //err.title = 'Login failed';
        //res.title = "Invalid credentials";
        //err.errors = { credential: 'The provided credentials were invalid.' };
        //return res.json();
        return res.json({ message: "Invalid credentials" }, err.status);
        //return (err);
      }
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  router.get(
    '/',
    (req, res) => {
      const { user } = req;
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );
  
module.exports = router;

import { csrfFetch } from './csrf';

//action types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

//action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

//login thunk action
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//restoreUser thunk action to retain the logged in session user
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//signup thunk action
export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    console.log('.......inside thunk.....', data );
    dispatch(setUser(data.user));
    return response;
};

//logout thunk action
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
  };

//initialState should not have any logged in user  
const initialState = { user: null };

//session Reducer
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;


import { deletePhotoFromAlbumThunk } from '../../redux/albums';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeletePhotoModal.css';

function DeletePhotoModal({albumId, photoId, setDeleteMode}) {
  console.log('......albumId inside deleteModal..albumId..',albumId, typeof(albumId));
  console.log('......photoId inside deleteModal..photoId...',photoId, typeof(photoId));
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    await dispatch(deletePhotoFromAlbumThunk(albumId,photoId))
    // setDeleteMode(false),
    closeModal()
  }

  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to remove this photo? </p>
            <button className='yes-button' onClick={handleDelete} >Yes (Delete Photo)
                    
            </button>
            <button className='no-button' onClick={() => closeModal()}>No (Keep Photo)
            {/* <button className='no-button' onClick={() => setDeleteMode(false) .then(() => closeModal())}>No (Keep Photo) */}
            
            
            </button><br></br>           
        </div>   
  )
}

export default DeletePhotoModal;



import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}

  // call this to get the "XSRF-TOKEN" cookie, should only be used in development
  
    export function restoreCSRF() {
            return csrfFetch('/api/csrf/restore');
    }


    const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('firstName')
      .not()
      .isEmpty()
      .withMessage('First Name is required'),
    check('lastName')
      .not()
      .isEmpty()
      .withMessage('Last Name is required'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('email')
      .not()
      .isEmpty()
     // .withMessage('Email or username is required'),
     .withMessage('Invalid email'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username is required'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password is required.'),
    handleValidationErrors
  ];

router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
      const { email, firstName, lastName, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);

      //Added to check if email already exists 
      const emailExists = await User.findOne({ where: { email: email } });
      if ( emailExists ) {
        const err = new Error("User already exists");
        err.status = 500;
        err.errors = { email: 'User with that email already exists' };
        return next(err);
      };

      //Added to check if username already exists
      const userExists = await User.findOne({ where: { username: username } });
      if ( userExists ) {
        const err = new Error("User already exists");
        err.status = 500;
        err.errors = { username: 'User with that username already exists' };
        return next(err);
      };
      //

      const user = await User.create({ firstName, lastName, email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;


// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const bookingsRouter = require('./bookings.js');
const reviewsRouter = require('./reviews.js');
const spotImagesRouter = require('./spot-images.js');
const reviewImagesRouter = require('./review-images.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-images', spotImagesRouter);
router.use('/review-images', reviewImagesRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;



// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(
      { data: safeUser },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );
  
    const isProduction = process.env.NODE_ENV === "production";
  
    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });
  
    return token;
  };

  const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;
  
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }
  
      try {
        const { id } = jwtPayload.data;
        req.user = await User.findByPk(id, {
          attributes: {
            include: ['email', 'createdAt', 'updatedAt']
          }
        });
      } catch (e) {
        res.clearCookie('token');
        return next();
      }
  
      if (!req.user) res.clearCookie('token');
  
      return next();
    });
  };

  const requireAuth = function (req, _res, next) {
    if (req.user) return next();
  
    /*const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);*/
    return _res.status(401).json({ message: 'Authentication required' });
  }

  module.exports = { setTokenCookie, restoreUser, requireAuth };



  import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Spots from "./components/Spots";
import AllSpots from "./components/AllSpots"; 
import DetailedSpot from "./components/DetailedSpot";
import NewSpot from "./components/NewSpot";
import UpdateSpot from "./components/UpdateSpot"

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllSpots />
      },
      {
        path: '/spots/current',
        element: <Spots />
      },
      {
        path: '/spots/:spotId',
        element: <DetailedSpot />
      },
      {
        path: '/spots/new',
        element: <NewSpot />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpot />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;



// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
  router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
}

module.exports = router;
        
        