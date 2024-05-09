import { getCurrUserOwnedRestaurantsThunk } from "../../redux/restaurants";
import { getCurrentUserBookingsThunk, deleteBookingThunk } from "../../redux/bookings";
import { getCurrentUserReviewsThunk } from "../../redux/reviews";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./GetCurrUserRestaurants.css";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteRestaurantModal from "./DeleteRestaurantModal";
import OpenReviewModalButton from "../OpenModalButton/OpenReviewModalButton";
import DeleteBookingModal from "../Bookings/DeleteBookingModal";
import DeleteRevForCurrUserModal from "../Reviews/DeleteRevForCurrUserModal";
import EditReviewModal from "./EditReviewModal";
import EditReviewForCurrUserModal from "../Reviews/EditReviewForCurrUserModal"


const GetCurrUserRestaurants = () => {

    const user = useSelector((state) => state.session.user);

    const currentRestaurants = useSelector((state) => state.restaurants.restaurants_arr);
    //const currentRestaurants = useSelector((state) =>  {
    //    const restaurants_arr = state.restaurants.restaurants_arr;
    //    const userRestaurants = restaurants_arr.filter((res)=>res.ownerId = user.id)
    //    return userRestaurants
    //});
    const currentBookings = useSelector((state) => state.bookings.bookings_arr);
    const currentReviews = useSelector((state) => state.reviews.reviews_arr);
    console.log("......currRestaurants.....", currentRestaurants);
    console.log("......currBookings1.....", currentBookings);
    console.log("......currReviews1.....", currentReviews);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoaded, setisLoaded] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);
    let rating, sum = 0, value, avg;
    let currentDate = new Date();
    let convertedBookingDate = new Date();
    let convertedReviewDate = new Date();
    let reviewDate = new Date();
    let calculate, reviewStars;

    useEffect(() => {
        const getCurrentUserRestaurants = async () => {
            await dispatch(getCurrUserOwnedRestaurantsThunk());
            await dispatch(getCurrentUserBookingsThunk());
            await dispatch(getCurrentUserReviewsThunk());
            setisLoaded(true);
            setUpdateMode(true);
        }
        getCurrentUserRestaurants()

        //     const getCurrentUserRestaurants = async () => {
        //         await dispatch(filterCurrUserOwnedRestaurant(currentRestaurants,user.id));
        //         setisLoaded(true);
        //     }
        //     getCurrentUserRestaurants()

    }, [dispatch]);

    console.log("......currBookings2.....", currentBookings);
    console.log("......currReviews2.....", currentReviews);

    if (!user) {
        return (<h2>Please log in to view your Restaurants !!</h2>)
    }

    return (
        <>
            {isLoaded ?
                <div style={{ marginBottom: "5em" }} >
                    {user ?
                        <div>
                            <div className='curr-menu'>
                                <button className="curr-new-res-button">
                                    <NavLink style={{ textDecoration: "none", color: 'white' }}
                                        to="/restaurants/new"><i className="fa-sharp fa-solid fa-plus"></i>&nbsp;New Restaurant
                                    </NavLink>
                                </button>
                            </div>

                            <div style={{ paddingBottom: "2.5em", width: "32%", float: "left" }} className="restaurants">
                                <h3 style={{ fontWeight: "bold", marginBottom: "0.4em", paddingTop: "0.5em", width: "25rem" }}>Your Restaurants</h3>
                                {currentRestaurants.length ?
                                    <div className="curr-restaurants-grid" style={{ paddingBottom: "1rem" }}>

                                        {currentRestaurants.map((restaurant) => (
                                            <>
                                                <div style={{ margin: "0px", marginBottom: "2rem" }} className="curr-photos-div">
                                                    <div style={{ paddingTop: "1em" }} className="curr-title">
                                                        <div>{restaurant.name}</div>
                                                        <i style={{ paddingBottom: "0.25rem", paddingLeft: "1.5rem" }} className="fa-solid fa-star"></i>
                                                        {restaurant.Reviews ?
                                                            <>
                                                                {rating = () => {
                                                                    sum = 0;
                                                                    for (let i = 0; i < restaurant.Reviews.length; i++) {
                                                                        sum = sum + restaurant.Reviews[i].stars
                                                                    }
                                                                    avg = sum / restaurant.Reviews.length;
                                                                }}
                                                                {value = rating()}

                                                                {/* <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.5rem" }}>
                                                {Number(restaurant.avgRating) > 0 ? Number(restaurant.avgRating).toFixed(1) : "New"}
                                            </span>
                                            <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.25rem", color: "green", fontFamily: "cursive" }}>
                                                {Number(restaurant.avgRating) > 4 ? "Trending Currently!!!" : ""}
                                            </span> */}
                                                                <span style={{ fontWeight: "bold", paddingLeft: "0.5rem", color: "rgb(141, 4, 4)" }}>
                                                                    {avg > 0 ? avg.toFixed(1) : "New"}
                                                                </span>
                                                                <span style={{ paddingLeft: "0.5rem", color: "olive", fontStyle: "italic" }}>
                                                                    {avg > 4 ? "Trending!!!" : ""}</span>
                                                            </>
                                                            : ""
                                                        }

                                                    </div>
                                                    <div className="curr-photos">
                                                        <img className="curr-photo-image"
                                                            onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                                                            src={restaurant.RestaurantImages[0].restaurantUrl}
                                                            alt="Displaying default image"
                                                        />
                                                        <div className="curr-text">
                                                            <div style={{ fontSize: "1rem", paddingBottom: "1em" }}>{restaurant.description}</div>
                                                            <div style={{ fontSize: "1rem", color: "rgb(94, 5, 5)" }}>Visit us today at :</div>
                                                            <div>
                                                                <i className="fa-solid fa-location-dot" style={{ paddingRight: "0.5rem" }}></i>
                                                                <span style={{ paddingTop: "2px", fontSize: "1rem" }}>
                                                                    {restaurant.address}, {restaurant.state}, {restaurant.city}, {restaurant.zipCode}
                                                                </span>
                                                            </div>
                                                            <div style={{ fontSize: "1rem", color: "rgb(94, 5, 5)", paddingTop: "0.75rem" }}>
                                                                Book Online or contact us at :
                                                            </div>
                                                            <div>
                                                                <i className="fa-solid fa-phone" style={{ paddingRight: "0.5rem" }}></i>
                                                                <span>{restaurant.phone}</span>
                                                            </div>

                                                            <div style={{ paddingTop: "0.75rem", fontSize: "1rem" }}>
                                                                <span><i style={{ color: "rgb(141, 4, 4)", paddingRight: "0.25rem", fontSize: "1rem" }} className="fa-solid fa-bell-concierge"></i> {restaurant.restaurantType}</span>
                                                                <span><i style={{ color: "rgb(141, 4, 4)", paddingLeft: "1rem", paddingRight: "0.25rem", fontSize: "1rem" }} className="fa-solid fa-bowl-food"></i>  {restaurant.cuisines}</span>
                                                            </div>
                                                            {/* <div style={{ display: "flex" }}> */}
                                                            <div>
                                                                <div style={{ fontSize: "1rem", color: "rgb(94, 5, 5)", paddingTop: "0.75rem" }}>
                                                                    Hours of Operation:
                                                                </div>
                                                                <span style={{ paddingTop: "0.85rem", fontSize: "1rem" }}>
                                                                    {restaurant.hoursOfOperation}
                                                                </span>
                                                                <div>
                                                                    {restaurant.dayClosed ?
                                                                        <div style={{ fontSize: "1rem" }}>{restaurant.dayClosed}s closed</div>
                                                                        : null
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='curr-upadte-delete' style={{ display: "flex", paddingBottom: "0.5rem" }}>
                                                            <span style={{ marginLeft: "0%", margin: '0px', paddingBottom: "0px", marginTop: "1.65em" }} className="Delete">
                                                                <OpenReviewModalButton
                                                                    //    <i className="fa-solid fa-trash"></i> 
                                                                    buttonText="- Delete "
                                                                    modalComponent={
                                                                        <DeleteRestaurantModal id={restaurant.id} />
                                                                    }
                                                                />
                                                            </span> &nbsp;
                                                            <span className="Edit">
                                                                <button style={{
                                                                    backgroundColor: "rgb(141, 4, 4)", color: "white",
                                                                    boxShadow: "5px 5px 5px black", height: "1.75em", width: "6em", cursor: "pointer",
                                                                    position: "relative", marginRight: "30%", marginTop: "2em", marginLeft: "5%"
                                                                }}
                                                                    onClick={() => navigate(`/restaurants/update/${restaurant.id}`)}>
                                                                    <i className="fa-sharp fa-solid fa-pen"></i> &nbsp;Edit
                                                                </button> &nbsp;
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>

                                    : <div style={{ fontSize: "1rem" }}>You do not own any restaurants yet !!!</div>}
                            </div >


                            <div style={{ paddingBottom: "2.5em", width: "68%", float: "right", fontSize: "1em" }} >
                                <div style={{ width: "45%", float: "left" }} className="bookings">
                                    <h3 style={{ paddingBottom: "0px", marginBottom: "0px", marginTop: "1.50em" }}>Your upcoming Bookings</h3>
                                    {currentBookings.length ?
                                        currentBookings.map((booking) => (
                                            <div>
                                                <span style={{ color: "rgb(232, 229, 229)" }}>{convertedBookingDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`}</span>
                                                {/* {booking ? */}
                                                <div>
                                                    {booking.bookingDate > convertedBookingDate && booking.bookingDate ?
                                                        <div>
                                                            <div style={{ marginBottom: "2rem" }}>
                                                                <div style={{ display: "flex", width: "28rem", justifyContent: "space-between" }}>
                                                                    <div>
                                                                        <div style={{ marginTop: "0em", marginBottom: "1rem" }}>
                                                                            <span style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate(`/restaurants/${booking.Restaurant.id}`)}>{booking.Restaurant.name}</span>
                                                                        </div>
                                                                        <div>
                                                                            <span style={{ fontWeight: "bold" }}>On :</span> <span>{booking.bookingDate}</span>
                                                                        </div>
                                                                        <div>
                                                                            <span style={{ fontWeight: "bold" }}>At :</span> <span>{booking.Slot.slotStartTime} pm</span>
                                                                        </div>
                                                                        <div style={{ paddingBottom: "2rem" }}>
                                                                            <span style={{ fontWeight: "bold" }}>For :</span> <span >{booking.Slot.tableCapacity} people&nbsp;&nbsp;</span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <img style={{ height: "7rem", width: "7rem", borderRadius: "1rem", marginRight: "0px", paddingRight: "0px", cursor: "pointer" }}
                                                                            onClick={() => navigate(`/restaurants/${booking.Restaurant.id}`)}
                                                                            src={booking.Restaurant.RestaurantImages[0].restaurantUrl} />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <span style={{ marginLeft: "0%" }} className="Delete">
                                                                        <OpenReviewModalButton
                                                                            buttonText=" Cancel "
                                                                            modalComponent={
                                                                                <DeleteBookingModal id={booking.id} />
                                                                            }
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : ""}
                                                </div>
                                                {/* : <div>You have no upcoming bookings !!</div>} */}
                                            </div>

                                        ))
                                        : <div style={{  fontSize: "1rem",  paddingTop:"1rem" }}>No upcoming bookings found !!!</div>
                                    }
                                    <hr style={{ height: "2px", backgroundColor: "rgb(141,4,4)", marginTop: "4em" }} />

                                    <h3 style={{ paddingBottom: "0px", marginBottom: "0px", paddingTop: "3em" }}>Your past Bookings</h3>
                                    {currentBookings.length ?
                                        currentBookings.map((booking) => (
                                            <div>
                                                <span style={{ color: "rgb(232, 229, 229)" }}>{convertedBookingDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`}</span>

                                                {booking.bookingDate < convertedBookingDate ?
                                                    <div>
                                                        <div style={{ marginBottom: "2rem" }}>
                                                            <div style={{ display: "flex", width: "28rem", justifyContent: "space-between" }}>
                                                                <div>
                                                                    <div style={{ marginTop: "0em", paddingBottom: "1rem" }}>
                                                                        <span style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate(`/restaurants/${booking.Restaurant.id}`)}>{booking.Restaurant.name}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span style={{ fontWeight: "bold", paddingRight: "0.2rem" }}>On </span> <span>{booking.bookingDate}</span> <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingRight: "0.25rem" }}>At </span> <span>{booking.Slot.slotStartTime} pm</span>
                                                                    </div>
                                                                    {/* <div>
                                                                        <span style={{ fontWeight: "bold" }}>At </span> <span>{booking.Slot.slotStartTime} pm</span>
                                                                    </div> */}
                                                                    <div style={{ paddingBottom: "2rem" }}>
                                                                        <span style={{ fontWeight: "bold", paddingRight: "0.2rem" }}>For </span> <span >{booking.Slot.tableCapacity} people&nbsp;&nbsp;</span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <img style={{ height: "7rem", width: "7rem", borderRadius: "1rem", marginRight: "0px", paddingRight: "0px", cursor: "pointer" }}
                                                                        onClick={() => navigate(`/restaurants/${booking.Restaurant.id}`)}
                                                                        src={booking.Restaurant.RestaurantImages[0].restaurantUrl} />
                                                                </div>
                                                            </div>
                                                            <div style={{ marginBottom: "1rem", alignContent: "end" }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    ""
                                                }
                                            </div>
                                        ))
                                        : <div style={{  fontSize: "1rem",  paddingTop:"1rem" }}>"No past bookings found !!!"
                                        </div>
                                    }
                                </div>
                                <div style={{ width: "40%", float: "right" }} className="reviews">
                                    <h3 style={{ fontWeight: "bold", marginBottom: "1rem", paddingTop: "0.45em" }}>
                                        Your Reviews
                                    </h3>
                                    {currentReviews.length ?
                                        currentReviews.sort((rev1, rev2) => new Date(rev2.updatedAt) - new Date(rev1.updatedAt)).
                                        map((review) => (
                                        // currentReviews.map((review) => (
                                            <div style={{ marginBottom: "1rem", borderBottom: "1px solid rgb(141,4,4)"}}>
                                                <div style={{ display: "flex", justifyContent: "space-between",marginBottom:"0px", paddingBottom:"0px" }}>
                                                    <div style={{marginBottom:"0px", paddingBottom:"0px"}}>
                                                        <div style={{ display: "flex" }}>
                                                            <div style={{ fontWeight: "bold", paddingRight: "0.45rem", paddingBottom: "0.5rem", cursor: "pointer" }} onClick={() => navigate(`/restaurants/${review.Restaurant.id}`)}>{review.Restaurant.name} </div>
                                                            {/* <div style={{ fontWeight: "bold", paddingRight: "0.45rem", paddingBottom: "0.5rem", cursor: "pointer" }} onClick={() => navigate(`/restaurants/${review.Restaurant.id}`)}> </div> */}
                                                        </div>
                                                        <div style={{ display: "flex" }}>

                                                            {calculate = () => {
                                                                reviewDate = review.updatedAt;
                                                                reviewDate = reviewDate.slice(0, 10);                                                                
                                                            }}
                                                            {convertedReviewDate = calculate()}
                                                            
                                                            <div style={{ fontWeight: "bold", paddingRight: "0.65rem" }}>Rated &nbsp;&nbsp;<span style={{ color: "rgb(141,4,4" }}>{review.stars}</span><i style={{ fontWeight: "bold", paddingRight: "0.15rem", color: "rgb(141,4,4)" }} className="fa-solid fa-star"></i><span style={{ color: "rgb(141,4,4", paddingRight: "1rem" }}></span> On </div><span>{reviewDate}</span>
                                                        </div>
                                                        <div style={{ display: "flex" }}>
                                                            <div style={{ fontWeight: "bold", paddingRight: "0.45rem" }}>Review: </div><span>{review.review}</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {review.ReviewImages && review.ReviewImages.length ?
                                                            <img src={review.ReviewImages[0].reviewUrl} style={{ width: "7rem", height: "7rem", borderRadius: "1rem",  cursor: "pointer" }} onClick={() => navigate(`/restaurants/${review.Restaurant.id}`)} />
                                                            : ""}
                                                    </div>
                                                </div>
                                                <div className='upadte-delete' style={{ display: "flex", marginBottom: "1.50em", paddingBottom: "0px", marginTop:"1rem" }}>
                                                    <span style={{ marginLeft: "0%", margin: '0px', paddingBottom: "0px",marginRight:"0.25rem" }} className="Delete">
                                                        <OpenReviewModalButton
                                                        
                                                            buttonText="Delete"
                                                            modalComponent={
                                                                <DeleteRevForCurrUserModal 
                                                                    reviewId={review.id}
                                                                    setUpdateMode={setUpdateMode} />
                                                            }
                                                        />
                                                    </span> &nbsp;
                                                    <span className="Edit">
                                                        <OpenReviewModalButton
                                                            buttonText="Edit"
                                                            modalComponent={
                                                                <EditReviewForCurrUserModal review={review} />
                                                            }
                                                        />
                                                    </span>
                                                </div>

                                            </div>
                                        ))
                                        : <div style={{fontWeight:"1rem"}}>You did not review any restaurant yet!!</div>
                                    }
                                </div>
                            </div>
                        </div>
                        : <h2>Please log in to view your Restaurants !!</h2>}
                </div >
                : <span>Loading..</span>
            }
        </>
    );
}

export default GetCurrUserRestaurants;