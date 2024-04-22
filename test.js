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
        