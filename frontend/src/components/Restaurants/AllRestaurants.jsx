import { getAllRestaurantsThunk } from "../../redux/restaurants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllRestaurants.css";
import { NavLink, useNavigate } from "react-router-dom";


const AllRestaurants = () => {

    const currentUser = useSelector((state) => state.session.user);
    const restaurants = useSelector((state) => state.restaurants.restaurants_arr);
    console.log("######", restaurants);
    console.log("typeof ", typeof restaurants);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const getRestaurants = async () => {
            dispatch(getAllRestaurantsThunk());
        };
        getRestaurants();
    }, [dispatch]);


    if (!restaurants) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            <div className="restaurants-grid" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
                {restaurants.map((restaurant) => (
                    <>
                        <div className="photos-div">
                            <div className="title">
                                <p>{restaurant.name}</p>
                                <i style={{ paddingLeft: "2rem", paddingTop: "1.5rem", color: "rgb(141, 4, 4)" }} className="fa-solid fa-star"></i>
                                <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.5rem", color: "rgb(141, 4, 4)" }}>{restaurant.avgRating > 0 ? restaurant.avgRating.toFixed(1) : "New"}</span>
                                <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.10rem", color: "olive" , fontFamily: "cursive" }}>{restaurant.avgRating > 4 ? "Trending Currently!!!" : ""}</span>

                            </div>
                            <div className="photos">
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
                                    <div style={{ paddingTop: "0.75rem" }}><a style={{ cursor: "pointer", fontSize: "1.15rem", textDecoration: "none", color: "rgb(30, 30, 158)" }} href={restaurant.menuUrl}>Checkout our Menu here</a></div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ fontSize: "1.15rem", color: "rgb(94, 5, 5)", paddingTop: "0.75rem" }}>Hours of Operation:</div>
                                        <span style={{ paddingTop: "0.85rem", fontSize: "1.15rem", paddingLeft: "0.5rem" }}>{restaurant.hoursOfOperation}</span>
                                        <span>
                                            {restaurant.dayClosed ?
                                                <div style={{ paddingTop: "0.87rem", fontSize: "1.15rem" }}>, {restaurant.dayClosed} closed</div>
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
    );
};

export default AllRestaurants;