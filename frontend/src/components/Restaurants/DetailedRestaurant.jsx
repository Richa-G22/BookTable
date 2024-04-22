import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { detailedRestaurantThunk, getslotsbyidDateThunk } from "../../redux/restaurants";
import { useEffect, useState } from "react";
import "./DetailedRestaurant.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DetailedRestaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { restaurantId } = useParams();
    const id = parseInt(restaurantId);
    restaurantId = parseInt(restaurantId);
   
    const sessionUser = useSelector((state) => state.session.user);
    const currRestaurant = useSelector((state) => state.restaurants.byId[restaurantId]);
    console.log('.......currentRestaurant........', currRestaurant);
    const [isLoaded, setisLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const showModal = () => setIsOpen(true)
    // const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const getData = async () => {
            await dispatch(detailedRestaurantThunk(restaurantId));
            setisLoaded(true);
        };
        // if (!currRestaurant) {
        getData();
        // }
    }, [dispatch, restaurantId]);


    if (!currRestaurant) {
        return <h1>Loading...</h1>
    }

    if ((!currRestaurant.Reviews) && (sessionUser.id !== currRestaurant.ownerId)) {
        return <h1>Be the first to review!</h1>
    }

    const currentDate = new Date();
    let bookingDate = new Date();
    console.log('........CURRENT date.....', currentDate);
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

                        {/* <div className="reviewImage"> {review.ReviewImages.map((reviewImage) => (
                                <>
                                    <img src={reviewImage.reviewUrl} />
                                </>
                            ))}
                        </div> */}

                        <div style={{ paddingBottom: "2em" }}>
                            <img style={{ height: "12em", width: "12em", borderRadius: "0.75em" }} src={review.ReviewImages[0].reviewUrl} />
                        </div>
                    </div>
                ))}
                </div>
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
                    {/* <DatePicker
                        dateFormat="dd/MM/yyyy"
                        value={Cdate}
                        onChange={(date) => {
                        const d = new Date(date).toLocaleDateString('fr-FR');
                        console.log(d);
                        setDate(d);
                        }}
                    /> */}
                    {/* <form onSubmit={handleSubmit}> */}
                        <div>
                            <label style={{ fontSize: "1.15rem", marginRight: "0.75rem" }}>
                                Select date to view available slots:
                            </label>
                            <DatePicker selected={date} onChange={(date) => setDate(date)} />
                            {/* { bookingDate = new Date(date)} */}
                            <div style={{ paddingTop: "1em" }}>
                                <button
                                    className="slots-button"
                                    onClick={() => dispatch(getslotsbyidDateThunk(restaurantId, date))}    
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    {/* </form> */}
                    {console.log("......booking date....", date)}
                    {sessionUser ?
                        <div style={{ paddingTop: "48em", paddingBottom: "2.5em" }}>
                            <button style={{ backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "5px 5px 5px black", height: "3em", width: "8em", cursor: "pointer" }}>
                                <NavLink style={{ textDecoration: "none", color: "white", paddingRight: "2em", paddingLeft: "1.5em", paddingTop: "1.5em", paddingBottom: "1.5em" }}
                                    className="Manage" to="/restaurants/current">
                                    Manage
                                </NavLink>
                            </button>
                        </div>
                        : ""}
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
                                    <div style={{ paddingLeft: "1.58rem" }}><a style={{ textDecoration: "none", color: "rgb(30, 30, 158)", cursor: "pointer" }} href={currRestaurant.menuUrl}>Menu</a></div>
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