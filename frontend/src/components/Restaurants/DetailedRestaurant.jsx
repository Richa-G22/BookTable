import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { detailedRestaurantThunk, getslotsbyidDateThunk, addNewBookingThunk } from "../../redux/restaurants";
import { useEffect, useState } from "react";
import "./DetailedRestaurant.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import OpenReviewModalButton from "../OpenModalButton/OpenReviewModalButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteReviewModal from "./DeleteReviewModal";
import CreateReviewModal from "./CreateReviewModal";
import EditReviewModal from "./EditReviewModal";
import NewMenuDishModal from "./NewMenuDishModal";
import EditMenuDishModal from "./EditMenuDishModal";
import DeleteMenuDishModal from "./DeleteMenuDishModal";
import TableReservedModal from "./TableReservedModal";

const DetailedRestaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { restaurantId } = useParams();
    const id = parseInt(restaurantId);
    restaurantId = parseInt(restaurantId);

    const sessionUser = useSelector((state) => state.session.user);
    
    const currRestaurant = useSelector((state) => state.restaurants.byId[restaurantId]);
    const [isLoaded, setisLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const [createDishMode, setCreateDishMode] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const showModal = () => setIsOpen(true);
    const [date, setDate] = useState(new Date());
    let reviewPresent = "no";
    let reviewExists = "";
    let menudishes;
    let spice = "";
    let spiceDisplay, spiceValue = "";
    let bdate;

    useEffect(() => {
        const getData = async () => {
            await dispatch(detailedRestaurantThunk(restaurantId));
            setisLoaded(true);
            setUpdateMode(true);
            setCreateMode(true);
            setCreateDishMode(true);
        };
        getData();
    }, [dispatch, restaurantId]);


    if (!currRestaurant) {
        return <h1>Loading...</h1>
    }

    if ((!currRestaurant.Reviews) && (sessionUser.id !== currRestaurant.ownerId)) {
        return <h1>Be the first to review!</h1>
    }

    let currentDate = new Date();
    let bookingDate = new Date();
    let dateMDY = new Date();
    let testDate = new Date();
    let currTime = new Date().toLocaleTimeString();

    const handleSubmit = () => async (e) => {
        
        e.preventDefault();
        // validate();
        try {
            if (!foundError) {
                
                const slots = await dispatch(
                    getslotsbyidDateThunk(restaurantId, bookingDate)
                ).catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) {
                        setErrors((errors) => ({ ...errors, ...data.errors }));
                    }
                    
                })
            }
        } catch (error) { 
            const data = await error.json();
            
            if (data.errors) {
                setErrors((errors) => ({ ...errors, ...data.errors }));
            }
        }
    };

    if (sessionUser) {
        reviewExists = currRestaurant.Reviews.some((review) => {
            return review.userId == sessionUser.id
        });
    }

    const toggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (

        <div className="restaurant-detail-div">
            <h2 style={{ paddingTop: "2em", fontSize: "2em", color: "rgb(141, 4, 4)" }}>
                {currRestaurant.name}
            </h2>
            {/* <div id="container"> */}
            <div>
                <section id="images-grid">
                    {currRestaurant.RestaurantImages.map((image) => (
                        <img className="image"
                            src={image.restaurantUrl}
                            alt="Displaying default image"
                        />
                    ))}
                </section>
            </div>
            <div style={{ fontSize: "1.20em" }}>{currRestaurant.description}</div>

            <div style={{ display: "flex", paddingRight: "0px", marginRight: "0px" }} className="partitions-container">
                <div style={{ paddingBottom: "1rem" }} className="partitions">
                    <div style={{ paddingBottom: "1rem", width: "30%", float: "left" }}>
                        <h3 style={{ fontWeight: "bold", marginBottom: "1em", paddingTop: "0.5em" }}>Experiences</h3>
                        {!currRestaurant.Reviews.length && sessionUser ?
                            <div>
                                {sessionUser.id !== currRestaurant.ownerId ?
                                    <div>
                                        <h4 style={{ paddingLeft: "1rem" }}>Be the first person to leave a review!!</h4>
                                    </div>

                                    :
                                    <div style={{ width: "150%" }}>
                                        <h4 style={{ paddingLeft: "1rem" }}>No reviews yet!!</h4>
                                    </div>
                                }
                            </div>
                            : ""
                        }

                        {currRestaurant.Reviews.length ?
                            <div>{currRestaurant.Reviews.map((review) => (
                                <div>
                                    
                                    <div className="user-info" style={{ display: "flex" }}>
                                        <img style={{ height: "3em", width: "3em", borderRadius: "2em" }}
                                            src={review.User.profileImg} />
                                        <p style={{ fontWeight: "bold", paddingRight: "2rem", paddingLeft: "1em", color: "green" }}>
                                            {review.User.firstName} {review.User.lastName}
                                        </p>
                                        <span style={{ color: "rgb(141, 4, 4)" }}>
                                            {review.stars}
                                            <i style={{ paddingLeft: "0.25rem", paddingTop: "1rem", color: "rgb(141, 4, 4)" }} className="fa-solid fa-star"></i>
                                        </span>
                                    </div>

                                    <div className="review" style={{ paddingBottom: "1.25em", fontSize: "1.10em" }}>{review.review}
                                    </div>

                                    {review.ReviewImages.length ?
                                        <div style={{ paddingBottom: "1.5em" }} className="reviewImage">
                                            {/* {review.ReviewImages.map((reviewImage) => (
                                        <>
                                            <img style={{ height: "12em", width: "12em", borderRadius: "0.75em" }} src={reviewImage.reviewUrl} />
                                        </>
                                    ))} */}
                                            <img style={{ height: "12em", width: "12em", borderRadius: "0.75em" }} src={review.ReviewImages[0].reviewUrl} />
                                        </div>
                                        : null
                                    }

                                    {sessionUser && review.userId == sessionUser.id ?
                                        <div className='upadte-delete' style={{ display: "flex", marginBottom: "0.50em", paddingBottom: "0px", paddingTop: "0.25rem" }}>
                                            <span style={{ marginLeft: "0%", margin: '0px', paddingBottom: "0px", marginTop: "0.05em" }} className="Delete">
                                                <OpenReviewModalButton
                                                    buttonText="Delete"
                                                    modalComponent={
                                                        <DeleteReviewModal restaurantId={currRestaurant.id}
                                                            reviewId={review.id}
                                                            setUpdateMode={setUpdateMode} />
                                                    }
                                                />
                                            </span> &nbsp;
                                            <span className="Edit">
                                                <OpenReviewModalButton
                                                    buttonText="Edit"
                                                    modalComponent={
                                                        <EditReviewModal review={review} />
                                                    }
                                                />
                                            </span>
                                        </div>
                                        : ""
                                    }
                                </div>
                            ))}
                            </div>
                            : " "
                        }
                        
                        {sessionUser && sessionUser.id != currRestaurant.ownerId && !reviewExists ?
                            <>
                                <div style={{ paddingTop: "1em" }}>
                                    <OpenModalButton
                                        buttonText="Post Review"
                                        modalComponent={
                                            <CreateReviewModal restaurantId={currRestaurant.id}
                                                setCreateMode={setCreateMode} />
                                        }
                                    />
                                </div>
                            </>
                            : ""
                        }
                    </div>


                    <div style={{ paddingBottom: "1rem", width: "67%", float: "right" }}>
                        <div style={{ width: "50%", float: "left" }}>
                            <h3 style={{ fontWeight: "bold", marginBottom: "1rem", paddingTop: "1em", width: "100%" }}>
                                Booking Details
                            </h3>

                            <div>
                                <span>
                                    <label style={{ fontSize: "1.15rem", marginRight: "0.75rem", paddingRight: "0.5rem" }}>
                                        Select date to view available slots: &nbsp;&nbsp;
                                        {/* </label> */}
                                        {/* </span>
                                <span> */}
                                        <DatePicker selected={date} onChange={(date) => setDate(date)} minDate={currentDate} />
                                    </label>
                                </span>
                                 
                                 {/* {bdate = () => {
                                    bookingDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
                                    return bookingDate; 
                                 }} */}

                                <span style={{ color: "rgb(232, 229, 229)" }}>{bookingDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`}</span>
                                <div style={{ paddingTop: "1em" }}>
                                    <button
                                        className="slots-button"
                                        onClick={() => dispatch(getslotsbyidDateThunk(restaurantId, bookingDate))}
                                        // onClick={() => dispatch(getslotsbyidDateThunk(restaurantId, bdate()))}
                                    >
                                        Go
                                    </button>
                                </div>
                            </div>
                            
                            {currRestaurant.OpenSlots ?
                                <div style={{ paddingTop: "1em" }}>
                                    <div style={{ fontWeight: "bold", display: "flex", paddingBottom: "1em" }}>
                                        <div style={{ paddingRight: "2.5em" }}>Time</div>
                                        <div style={{ paddingRight: "2em" }}>Duration</div>
                                        <div>Capacity</div>
                                    </div>
                                    {currRestaurant.OpenSlots.length ?
                                        <div>
                                            {currRestaurant.OpenSlots.map((slot) => (
                                                <>
                                                    {/* {currentDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`} */}
                                                    
                                                    {/* {bookingDate == currentDate && slot.slotStartTime > currTime ? */}
                                                    <div style={{ display: "flex", paddingBottom: "1.50em" }}>
                                                        

                                                        <div style={{ paddingRight: "1em" }}>{slot.slotStartTime.substr(0, 5)} pm</div>
                                                        <div style={{ paddingRight: "3.5em" }}>{slot.slotDuration} min</div>
                                                        <div style={{ paddingRight: "1.5em" }}>{slot.tableCapacity}</div>
                                                        {sessionUser ?
                                                            <button style={{ backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "3px 3px 3px black", height: "1.5em", width: "5em", cursor: "pointer" }}
                                                                onClick={() => dispatch(addNewBookingThunk(currRestaurant.id, slot.slotId, bookingDate)).then(() => alert("Slot Reserved"))} > 
                                                                
                                                            

                                                                Reserve
                                                            </button>
                                                            : <button style={{ backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "3px 3px 3px black", height: "1.5em", width: "5em", cursor: "pointer" }}
                                                                onClick={() => alert("Please login to reserve a spot.") } >
                                                                Reserve
                                                            </button>}
                                                    </div>
                                                </>
                                            ))}
                                        </div>

                                        : <div style={{ paddingTop: "1em", color: "red" }}>
                                            "No slots available currently!!"
                                        </div>
                                    }
                                </div>
                                : ""
                            }
                        </div>

                        <div style={{ width: "50%", float: "right" }}>
                            <h3 style={{ fontWeight: "bold", marginBottom: "1rem", paddingTop: "1em" }}>
                                Additional Information
                            </h3>

                            <div>
                                <i className="fa-solid fa-location-dot" style={{ paddingRight: "0.5rem" }}></i>
                                <span style={{ paddingTop: "2px", fontSize: "1.15rem", paddingBottom: "4rem" }}>
                                    {currRestaurant.address}, {currRestaurant.state}, {currRestaurant.city}, {currRestaurant.zipCode}
                                </span>

                                {currRestaurant.locationMapUrl ?
                                    <iframe src={currRestaurant.locationMapUrl}
                                        style={{ width: "400", height: "300", style: "border:0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}>
                                    </iframe>
                                    : ""
                                }

                                <div style={{ paddingTop: "1rem" }}>
                                    <i className="fa-solid fa-phone" style={{ paddingRight: "0.5rem" }}></i>
                                    <span>{currRestaurant.phone}</span>
                                </div>
                                <div style={{ fontSize: "1rem", paddingTop: "1rem" }}>
                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-solid fa-kitchen-set" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ fontWeight: "bold" }}>Cuisines :</span>
                                        <div style={{ paddingLeft: "1.58rem" }}>
                                            {currRestaurant.cuisines}
                                        </div>
                                    </div>

                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-regular fa-clock" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ fontWeight: "bold" }}>Hours Of Operation :</span>
                                        <div style={{ paddingLeft: "1.58rem" }}> {currRestaurant.hoursOfOperation}</div>
                                        <div style={{ paddingLeft: "1.58rem" }}> {currRestaurant.dayClosed} closed</div>
                                    </div>

                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-solid fa-money-bill" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ fontWeight: "bold" }}>Price :</span>
                                        <div style={{ paddingLeft: "1.58rem" }}> {currRestaurant.avgMealPrice}</div>
                                    </div>

                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-solid fa-square-parking" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ fontWeight: "bold" }}>Parking :</span>
                                        <div style={{ paddingLeft: "1.58rem" }}> {currRestaurant.parkingAvailability}</div>
                                    </div>

                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-regular fa-credit-card" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ fontWeight: "bold" }}>Payment Option :</span>
                                        <div style={{ paddingLeft: "1.58rem" }}> {currRestaurant.paymentOption}</div>
                                    </div>

                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-solid fa-shirt" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ fontWeight: "bold" }}>Dress Code :</span>
                                        <div style={{ paddingLeft: "1.58rem" }}> {currRestaurant.dressCode}</div>
                                    </div>

                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-solid fa-person" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ fontWeight: "bold" }}>Executive Chef :</span>
                                        <div style={{ paddingLeft: "1.58rem" }}> {currRestaurant.executiveChef}</div>
                                    </div>

                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-solid fa-globe" style={{ paddingRight: "0.5rem" }}></i>
                                        {/* <i className="fa-solid fa-book-open" style={{ paddingRight: "0.5rem" }}></i> */}
                                        <span style={{ fontWeight: "bold" }}>Website :</span>
                                        {currRestaurant.menuUrl ?
                                            <div style={{ paddingLeft: "1.58rem" }}><a style={{ textDecoration: "none", color: "rgb(30, 30, 158)", cursor: "pointer" }}
                                                href={currRestaurant.menuUrl} target="_blank" rel="noopener noreferrer">Link to Website</a></div>
                                            : <div style={{ paddingLeft: "1.58rem" }}>&#9785; Currently unavailable!</div>
                                        }
                                    </div>

                                    <div style={{ paddingBottom: "1rem" }}>
                                        <i className="fa-solid fa-door-closed" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ fontWeight: "bold" }}>Holidays :</span>
                                        <div style={{ paddingLeft: "1.58rem", paddingBottom: "1rem" }}>
                                            {currRestaurant.Holidays.map((holiday) => (
                                                <div>{holiday.occasion}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ paddingBottom: "3rem" }} className="menu-info">
                {/* <h3 style={{ paddingTop: "1rem" }} className="menu-text">Menu</h3> */}
                <div className="menu-det">
                    <button style={{ height: "2rem", width: "8rem", background: "rgb(141,4,4)", color: "white", marginBottom: "2rem", cursor: "pointer", marginLeft: "40rem" }} onClick={toggle}>Menu</button>
                    {isExpanded && (
                        <div >
                            {currRestaurant.MenuDishes && currRestaurant.MenuDishes.length ?
                                // <div style={{ paddingBottom: "3rem", display:"flex", flexDirection:"column", height: isExpanded ? "auto" : "0px" }} className="menu-content">
                                <div style={{ marginLeft: "14%", width: "65%", display: "flex", flexDirection: "column", border: "1px solid rgb(141,4,4)", paddingTop: "5rem", paddingRight: "5rem", paddingBottom: "3rem", height: isExpanded ? "auto" : "10rem" }} className="menu-content">
                                    {currRestaurant.MenuDishes.map((menudish) => (
                                        <>
                                            
                                            {spiceValue = ""}
                                            
                                            {spice = () => {
                                                spiceDisplay = "";
                                                if (menudish.spiceLevel == 1) {
                                                    spiceValue = "\uD83C\uDF36"
                                                }
                                                if (menudish.spiceLevel == 2) {
                                                    spiceValue = "\uD83C\uDF36 \uD83C\uDF36"
                                                }
                                                if (menudish.spiceLevel == 3) {
                                                    spiceValue = "\uD83C\uDF36 \uD83C\uDF36 \uD83C\uDF36"
                                                }

                                                return spiceValue;
                                            }
                                            }
                                          
                                            <div style={{ height: "auto", float: "left", paddingBottom: "1rem" }}>
                                                {/* <div style={{ width: "50%", float: "left", paddingBottom: "2rem" }}> */}
                                                {/* <div style={{ display: "flex"}}> */}
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <span style={{ paddingLeft: "5rem" }}>{menudish.dishName} &nbsp;&nbsp;{spice()}</span>
                                                    {/* <span style={{ paddingLeft: "6rem", paddingRight: "8rem" }}> */}
                                                    <span>
                                                        ${menudish.dishPrice}
                                                    </span>

                                                </div>
                                                <div style={{ fontSize: '0.89rem', paddingLeft: "5rem", width: "70%" }}>{menudish.dishIngredients}</div>
                                                <div style={{ fontSize: '0.89rem', paddingLeft: "5rem" }}>Calories: {menudish.dishCalories}, &nbsp;&nbsp;Allergies: {menudish.dishAllergies} </div>
                                                <div style={{ marginLeft: "25%", paddingTop: "0rem", paddingBottom: "1rem", marginRight: "30%", borderBottom: "1px solid rgb(141, 4, 4)", paddingLeft: "59%" }} className="edit-delete-buttons">
                                                    {sessionUser && sessionUser.id == currRestaurant.ownerId ?
                                                        <div style={{ display: "flex" }}>
                                                            
                                                            <span style={{ marginLeft: "0%" }} className="Delete">
                                                                <OpenReviewModalButton
                                                                    buttonText="Delete"
                                                                    modalComponent={
                                                                        <DeleteMenuDishModal restaurantId={currRestaurant.id}
                                                                            menudishId={menudish.id}
                                                                            // setUpdateMode={setUpdateMode} 
                                                                        />
                                                                    }
                                                                />
                                                            </span> &nbsp;
                                                            <span className="Edit">
                                                                
                                                                <OpenReviewModalButton
                                                                    buttonText="Edit"
                                                                    modalComponent={
                                                                        <EditMenuDishModal menudish={menudish}/>
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                        : ""}
                                                </div>


                                            </div>
                                        </>
                                    ))}
                                    {/* <p style={{ height: "0.5rem" }}></p>
                                    <p></p> */}
                                </div>
                                : <div style={{ fontWeight: "1rem", paddingTop: "1rem" }}>Please refer our website to view Menu</div>
                            }
                            {sessionUser && sessionUser.id == currRestaurant.ownerId ?
                                <div style={{ marginLeft: "42%", paddingTop: "2rem" }}>
                                    <OpenModalButton
                                        buttonText="Add new Dish"
                                        modalComponent={
                                            <NewMenuDishModal restaurantId={currRestaurant.id}
                                                setCreateDishMode={setCreateDishMode} />
                                        }
                                    />
                                </div>
                                : ""}
                            {/* </div> */}
                        </div>)}
                </div>
            </div>

            <div style={{ height: "3rem", marginBottom: "2rem", paddingBottom: "2rem" }}>    </div>


        </div>
    )
}

export default DetailedRestaurant;