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

const DetailedRestaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { restaurantId } = useParams();
    const id = parseInt(restaurantId);
    restaurantId = parseInt(restaurantId);

    const sessionUser = useSelector((state) => state.session.user);
    console.log(".....sessionUser.....", sessionUser)
    const currRestaurant = useSelector((state) => state.restaurants.byId[restaurantId]);
    console.log('.......currentRestaurant........', currRestaurant);
    const [isLoaded, setisLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    const [createMode, setCreateMode] = useState(false);
    const showModal = () => setIsOpen(true);
    const [date, setDate] = useState(new Date());
    let reviewPresent = "no";
    let reviewExists = "";


    useEffect(() => {
        const getData = async () => {
            await dispatch(detailedRestaurantThunk(restaurantId));
            setisLoaded(true);
            setUpdateMode(true);
            setCreateMode(true);
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
    console.log('........CURRENT date.....', currentDate);
    console.log('........CURRENT time.....', currTime);
    // const validate = () => {
    //     console.log('.......inside validate........')
    //     foundError = false;
    //     setErrors({});

    //     const bookingDate = new Date(date);
    //     if (bookingDate < currentDate) {
    //         foundError = true;
    //         setErrors((errors) => ({ ...errors, date: "Booking Date can not be in the past" }));
    //         console.log('........booking date.....', bookingDate, foundError);
    //     }
    // }

    const handleSubmit = () => async (e) => {
        console.log("....inside handle submit....")
        e.preventDefault();
        // validate();
        try {
            if (!foundError) {
                console.log("...inside if...")
                const slots = await dispatch(
                    getslotsbyidDateThunk(restaurantId, bookingDate)
                ).catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) {
                        setErrors((errors) => ({ ...errors, ...data.errors }));
                    }
                    console.log(".....errors.......", errors)
                })
            }
        } catch (error) {
            console.log("......error.....", error)
            const data = await error.json();
            console.log(".....data......", data)
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


    return (

        <div className="restaurant-detail-div">
            <h2 style={{ paddingTop: "2em", fontSize: "2em", color: "rgb(141, 4, 4)" }}>
                {currRestaurant.name}
            </h2>
            <div id="container">
                <section id="images-grid">
                    {currRestaurant.RestaurantImages.map((image) => (
                        <img className="image"
                            //onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                            // src={image.restaurantUrl}
                            src={image.restaurantUrl}
                            alt="Displaying default image"
                        />
                    ))}
                </section>
            </div>
            <div style={{ fontSize: "1.20em" }}>{currRestaurant.description}</div>

            <div style={{ paddingBottom: "2.5em", width: "30%", float: "left" }}>
                <h3 style={{ fontWeight: "bold", marginBottom: "1em", paddingTop: "0.5em" }}>Experiences</h3>
                {/* <h2>{currRestaurant.Reviews.count}</h2> */}
                {/* <span>{parseFloat(currRestaurant.numReviews) ? (
                    <> */}
                {/* {currRestaurant.numReviews > 0 ? " . " : "  "} */}
                {/* {currRestaurant.numReviews}{currRestaurant.numReviews > 1 ? " reviews" : " review"} */}
                {/* </>
                ) : (" ")}</span> */}
                {!currRestaurant.Reviews.length && sessionUser ?
                    <div>
                        {sessionUser.id !== currRestaurant.ownerId ?
                            <div>
                                <h4 style={{ paddingLeft: "1rem" }}>Be the first person to leave a review!!</h4>
                            </div>

                            :
                            <div>
                                <h4 style={{ paddingLeft: "1rem" }}>No reviews yet!!</h4>
                            </div>
                        }
                    </div>
                    : ""
                }

                {currRestaurant.Reviews.length ?
                    <div>{currRestaurant.Reviews.map((review) => (
                        <div>
                            {console.log("...review...", review)}
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
                                            //    <i className="fa-solid fa-trash"></i> 
                                            buttonText="Delete"
                                            modalComponent={
                                                <DeleteReviewModal restaurantId={currRestaurant.id}
                                                    reviewId={review.id}
                                                    setUpdateMode={setUpdateMode} />
                                            }
                                        />
                                    </span> &nbsp;
                                    <span className="Edit">
                                        {/* <button style={{
                                            backgroundColor: "rgb(141, 4, 4)", color: "white",
                                            boxShadow: "5px 5px 5px black", height: "1.75em", width: "7em", cursor: "pointer",
                                            position: "relative", marginRight: "30%", marginTop: "0.05em", marginLeft: "5%"
                                        }}
                                            onClick={() => navigate(`/restaurants/update/${restaurant.id}`)}>
                                            <i className="fa-sharp fa-solid fa-pen"></i> &nbsp;Edit
                                        </button> &nbsp; */}
                                        <OpenReviewModalButton
                                            //    <i className="fa-solid fa-trash"></i> 
                                            buttonText="Edit"
                                            modalComponent={
                                                <EditReviewModal review={review} />
                                            }
                                        />
                                    </span>
                                </div>
                                : ""
                            }
                            {/* <div style={{ paddingBottom: "2em" }}>
                            <img style={{ height: "12em", width: "12em", borderRadius: "0.75em" }} src={review.ReviewImages[0].reviewUrl} />
                        </div> */}
                        </div>
                    ))}
                    </div>
                    : " "
                }

                {/* Check if review already present for the current logged in user */}
                {/* <div>
                    {(() => {
                        for (let i = 0; i < currRestaurant.Reviews.length; i++) {
                            console.log("currentRestaurant.Reviews[i].userId, sessionUser.id", currRestaurant.Reviews[i].userId, sessionUser.id, typeof currRestaurant.Reviews[i].userId, typeof sessionUser.id )
                            if (currRestaurant.Reviews[i].userId == sessionUser.id) {
                                reviewPresent = "yes"
                            }
                        }
                        return reviewPresent;
                    })}
                </div> */}
                {console.log(".....review present....", reviewPresent)}
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


            <div style={{ paddingBottom: "2.5em", width: "67%", float: "right" }}>
                <div style={{ width: "50%", float: "left" }}>
                    <h3 style={{ fontWeight: "bold", marginBottom: "10px", paddingTop: "1em" }}>
                        Booking Details
                    </h3>

                    {/* <div>
                        <form>
                            <label style={{ fontSize: "1.15rem" }}>
                                Select date to view available slots:
                                <input style={{ marginLeft: "0.75rem", width: "7rem" }} type="date" name="bookingDate" min="2024-04-16" max="2024-05-30" />
                            </label>
                        </form>
                    </div> */}

                    <div>
                        <label style={{ fontSize: "1.15rem", marginRight: "0.75rem" }}>
                            Select date to view available slots:
                        </label>
                        <DatePicker selected={date} onChange={(date) => setDate(date)} minDate={currentDate} />

                        <span style={{ color: "rgb(232, 229, 229)" }}>{bookingDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`}</span>
                        <div style={{ paddingTop: "1em" }}>
                            <button
                                className="slots-button"
                                onClick={() => dispatch(getslotsbyidDateThunk(restaurantId, bookingDate))}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    {currRestaurant.OpenSlots ?
                        <div style={{ paddingTop: "1em" }}>
                            <div style={{ fontWeight: "bold", display: "flex", paddingBottom: "1em" }}>
                                <div style={{ paddingRight: "1em" }}>Time</div>
                                <div style={{ paddingRight: "1em" }}>Duration</div>
                                <div>Capacity</div>
                            </div>
                            {currRestaurant.OpenSlots.map((slot) => (
                                <>
                                {/* {currentDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`} */}
                                {console.log("....bookingDate..", bookingDate)}
                                {console.log("....date..", date)}
                                {console.log("....currentDate..", currentDate)}
                                {console.log("....currTime..", currTime)}
                                 {/* {bookingDate == currentDate && slot.slotStartTime > currTime ? */}
                                    <div style={{ display: "flex", paddingBottom: "1.50em" }}>
                                        {console.log("....startTime..", slot.slotStartTime)}
                                       
                                        <div style={{ paddingRight: "1em" }}>{slot.slotStartTime} pm</div>                   
                                        <div style={{ paddingRight: "3.5em" }}>{slot.slotDuration} min</div>
                                        <div style={{ paddingRight: "1.5em" }}>{slot.tableCapacity}</div>

                                        <button style={{ backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "3px 3px 3px black", height: "1.5em", width: "5em", cursor: "pointer" }}
                                            onClick={() => dispatch(addNewBookingThunk(currRestaurant.id, slot.slotId, bookingDate)).then(() => alert("Slot Reserved"))} >
                                            Reserve
                                        </button>
                                    </div>
                                      {/* : ""
                                    } */}
                                </>
                            ))}
                        </div>
                        : ""}
                    {/* </form> */}
                    {/* {console.log("......booking date....", date)} */}
                    {/* {dateMDY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`} */}
                    {/* {dateMDY = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`} */}
                    {/* {console.log(".....datemdy....", testDate)} */}
                    {sessionUser ?
                        <>
                            <div style={{ display: "flex", paddingTop: "48em", paddingBottom: "2.5em" }}>
                                {/* <button style={{
                                    backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "5px 5px 5px black", height: "3em",
                                    width: "8em", cursor: "pointer",
                                    position: "relative", marginRight: "5%", marginTop: "0.09%", marginLeft: "20%", marginBottom: "1.90em"
                                }}>
                                    <NavLink style={{ textDecoration: "none", color: 'white' }}
                                        to="/restaurants/new">Your Bookings
                                    </NavLink>
                                </button> */}
                                <button style={{
                                    backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "5px 5px 5px black",
                                    height: "3em", width: "8em", cursor: "pointer", marginLeft: "40%"
                                }}>
                                    <NavLink style={{
                                        textDecoration: "none", color: "white", paddingRight: "2em", paddingLeft: "1.5em",
                                        paddingTop: "1.5em", paddingBottom: "1.5em"
                                    }}
                                        className="Manage" to="/restaurants/current">
                                        Manage
                                    </NavLink>
                                </button>
                            </div>
                        </>
                        : ""
                    }
                </div>

                <div style={{ width: "50%", float: "right" }}>
                    <h3 style={{ fontWeight: "bold", marginBottom: "10px", paddingTop: "1em" }}>
                        Additional Information
                    </h3>

                    <div>
                        <i className="fa-solid fa-location-dot" style={{ paddingRight: "0.5rem" }}></i>
                        <span style={{ paddingTop: "2px", fontSize: "1.15rem", paddingBottom: "4rem" }}>
                            {currRestaurant.address}, {currRestaurant.state}, {currRestaurant.city}, {currRestaurant.zipCode}
                        </span>

                        {/* {currRestaurant.locationMapUrl ?
                            <iframe src={currRestaurant.locationMapUrl}
                                style={{ width: "400", height: "300", style: "border:0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}>
                            </iframe>
                            : ""
                        } */}

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
                                <i className="fa-solid fa-book-open" style={{ paddingRight: "0.5rem" }}></i>
                                <span style={{ fontWeight: "bold" }}>Menu :</span>
                                {currRestaurant.menuUrl ?
                                    <div style={{ paddingLeft: "1.58rem" }}><a style={{ textDecoration: "none", color: "rgb(30, 30, 158)", cursor: "pointer" }}
                                        href={currRestaurant.menuUrl} target="_blank" rel="noopener noreferrer">Menu</a></div>
                                    : <div style={{ paddingLeft: "1.58rem" }}>&#9785; Currently unavailable!</div>
                                }
                            </div>

                            <div style={{ paddingBottom: "3rem" }}>
                                <i className="fa-solid fa-door-closed" style={{ paddingRight: "0.5rem" }}></i>
                                <span style={{ fontWeight: "bold" }}>Holidays :</span>
                                <div style={{ paddingLeft: "1.58rem", paddingBottom: "3rem" }}>
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
    )
}

export default DetailedRestaurant;