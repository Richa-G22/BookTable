import { getAllRestaurantsThunk } from "../../redux/restaurants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllRestaurants.css";
import { NavLink, useNavigate } from "react-router-dom";


const AllRestaurants = () => {

    const currentUser = useSelector((state) => state.session.user);
    console.log("....current user.....", currentUser)
    const restaurants = useSelector((state) => state.restaurants.restaurants_arr);
    console.log("###restaurants in state###", restaurants);
    console.log("typeof restaurants", typeof restaurants);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setisLoaded] = useState(false);
    let rating, sum = 0, value, avg;


    useEffect(() => {

        const getRestaurants = async () => {
            dispatch(getAllRestaurantsThunk());
            setisLoaded(true);
        };
        getRestaurants();
    }, [dispatch]);


    if (!restaurants) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
     {isLoaded ?
        <div>
            {currentUser ?
                <button style={{
                    backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "5px 5px 5px black", height: "3em",
                    width: "8em", cursor: "pointer",
                    position: "relative", marginRight: "0%", marginTop: "1.9%", marginLeft: "93%"
                }}>
                    <NavLink style={{ textDecoration: "none", color: 'white' }}
                        to="/restaurants/current">Manage
                    </NavLink>
                </button>
                : ""
            }

            <div className="restaurants-grid" style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
                {restaurants.map((restaurant) => (
                    <>
                        <div className="photos-div">
                            <div style={{ maxWidth: "60%", marginLeft: "20%" }} className="title">
                                <p>{restaurant.name}</p>
                                <i style={{ paddingLeft: "2rem", paddingTop: "1.25rem", color: "rgb(141, 4, 4)" }} className="fa-solid fa-star"></i>
                            
                                {rating = () => {
                                    //sum = 0;
                                    //for (let i = 0;  i < restaurant.Reviews.length; i++) {
                                    //    sum = sum + restaurant.Reviews[i].stars
                                    //}
                                    //avg = sum / restaurant.Reviews.length;  

                                    sum = 0; avg = 0;
                                    let reviews = restaurant.Reviews;
                                    for (let i = 0;  reviews && i < restaurant.Reviews.length; i++) {
                                        sum = sum + restaurant.Reviews[i].stars
                                    }
                                    if ( reviews && reviews.length ) {
                                        avg = sum / reviews.length;  
                                    }
                                }}
                                {value = rating()}
                              
                                {/* <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.5rem", color: "rgb(141, 4, 4)" }}>{Number(restaurant.avgRating) > 0 ? Number(restaurant.avgRating).toFixed(1) : "New"}</span> */}
                                <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.25rem", color: "rgb(141, 4, 4)" }}>{avg > 0 ? avg.toFixed(1) : "New"}</span>
                                {/* <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.10rem", color: "olive" , fontFamily: "cursive" }}>{Number(restaurant.avgRating) > 4 ? "Trending Currently!!!" : ""}</span> */}
                                <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.10rem", color: "olive", fontFamily: "cursive" }}>{avg > 4 ? "Trending Currently!!!" : ""}</span>

                            </div>
                            <div style={{ maxWidth: "65%", marginLeft: "20%", paddingLeft: "2%" }} className="photos">
                                <img className="photo-image"
                                    onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                                    src={restaurant.RestaurantImages[0].restaurantUrl}
                                    //src={restaurant.previewImage}
                                    alt="Displaying default image"
                                />
                                <div className="text">
                                    <div style={{ fontSize: "1.15rem", paddingBottom: "1em" }}>{restaurant.description}</div>
                                    <div style={{ fontSize: "1.15rem", color: "rgb(94, 5, 5)" }}>Visit us today at :</div>
                                    <div>
                                        <i className="fa-solid fa-location-dot" style={{ paddingRight: "0.5rem" }}></i>
                                        <span style={{ paddingTop: "2px", fontSize: "1.15rem" }}>{restaurant.address}, {restaurant.state}, {restaurant.city}, {restaurant.zipCode}</span>
                                    </div>
                                    <div style={{ fontSize: "1.15rem", color: "rgb(94, 5, 5)", paddingTop: "0.75rem" }}>Book Online or contact us at :</div>
                                    <div>
                                        <i className="fa-solid fa-phone" style={{ paddingRight: "0.5rem" }}></i>
                                        <span>{restaurant.phone}</span>
                                    </div>
                                    {/* <div style={{ paddingTop: "0.75rem" }}><a style={{ cursor: "pointer", fontSize: "1.15rem", textDecoration: "none", color: "rgb(30, 30, 158)" }} 
                                          href={restaurant.menuUrl}>Checkout our Menu here</a>
                                    </div> */}
                                    <div style={{ paddingTop: "0.75rem", fontSize: "1.15rem" }}>
                                        <span><i style={{ color: "rgb(141, 4, 4)", paddingRight: "0.5rem", fontSize: "1.15rem" }} className="fa-solid fa-bell-concierge"></i> {restaurant.restaurantType}</span>
                                        <span><i style={{ color: "rgb(141, 4, 4)", paddingLeft: "3rem", paddingRight: "0.5rem", fontSize: "1.15rem" }} className="fa-solid fa-bowl-food"></i>  {restaurant.cuisines}</span>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ fontSize: "1.15rem", color: "rgb(94, 5, 5)", paddingTop: "0.75rem" }}>Hours of Operation:</div>
                                        <span style={{ paddingTop: "0.75rem", fontSize: "1.15rem", paddingLeft: "0.5rem" }}>{restaurant.hoursOfOperation}</span>
                                        <span>
                                            {restaurant.dayClosed ?
                                                <div style={{ paddingTop: "0.77rem", fontSize: "1.15rem" }}>,&nbsp; {restaurant.dayClosed}s closed</div>
                                                : null
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>


                            <div style={{ marginBottom: "30px" }}></div>
                        </div>

                    </>
                ))}
            </div>
        </div>
         : <span>Loading..</span>
        }
    </>       
    );
};

export default AllRestaurants;