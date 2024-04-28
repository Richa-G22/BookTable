import { getCurrUserOwnedRestaurantsThunk } from "../../redux/restaurants";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./GetCurrUserRestaurants.css";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteRestaurantModal from "./DeleteRestaurantModal";


const GetCurrUserRestaurants = () => {

    const user = useSelector((state) => state.session.user);
    // const currentRestaurants = useSelector((state) => state.restaurants.restaurants_arr);
    const currentRestaurants = useSelector((state) => state.restaurants.restaurants_arr);
    console.log("......currRestaurants.....", currentRestaurants);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoaded, setisLoaded] = useState(false);
    let rating, sum = 0, value, avg;

    useEffect(() => {
        const getCurrentUserRestaurants = async () => {
            await dispatch(getCurrUserOwnedRestaurantsThunk());
            setisLoaded(true);
        }
        getCurrentUserRestaurants()
    }, [dispatch]);

    if (!user) {
        return (<h2>Please log in to view your Restaurants !!</h2>)
    }

    return (
    
     <>
     {isLoaded ?
        <div style={{ marginBottom: "5em" }} >
            {user ?
                <div>
                    <div style={{ position: "relative", marginRight: "0%", paddingLeft: "45em", paddingRight: "0px" }} className='menu'>
                        <button style={{ backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "5px 5px 5px black", height: "3em", cursor: "pointer", position: "relative", marginRight: "0%", marginTop: "2%", marginLeft: "75%" }}>
                            <NavLink style={{ textDecoration: "none", color: 'white' }}
                                to="/restaurants/new"><i className="fa-sharp fa-solid fa-plus"></i>&nbsp;New Restaurant
                            </NavLink>
                        </button>
                    </div>

                    {currentRestaurants.length ?
                        <div className="restaurants-grid" >

                            {currentRestaurants.map((restaurant) => (
                                <>
                                    <div style={{ marginBottom: "3px" }} className="photos-div">
                                        <div style={{ paddingBottom: "0px", marginLeft: "20%", paddingTop: "1em" }} className="title">
                                            <p>{restaurant.name}</p>
                                            <i style={{ paddingLeft: "2rem", paddingTop: "1.25rem" }} className="fa-solid fa-star"></i>
                                            {restaurant.Reviews ?
                                            <>
                                            {rating = () => {
                                                sum = 0;
                                                for (let i = 0; i < restaurant.Reviews.length; i++) {
                                                    sum = sum + restaurant.Reviews[i].stars
                                                    // console.log("...sum....", sum)
                                                }
                                                avg = sum / restaurant.Reviews.length;
                                                //  console.log("......rating inside loop....", avg)

                                            }}
                                            {value = rating()}
                                            
                                            {/* <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.5rem" }}>
                                                {Number(restaurant.avgRating) > 0 ? Number(restaurant.avgRating).toFixed(1) : "New"}
                                            </span>
                                            <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.25rem", color: "green", fontFamily: "cursive" }}>
                                                {Number(restaurant.avgRating) > 4 ? "Trending Currently!!!" : ""}
                                            </span> */}
                                            <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.25rem", color: "rgb(141, 4, 4)" }}>
                                                {avg > 0 ? avg.toFixed(1) : "New"}
                                            </span>
                                            <span style={{ fontWeight: "bold", paddingLeft: "1rem", paddingTop: "1.10rem", color: "olive", fontFamily: "cursive" }}>
                                                {avg > 4 ? "Trending Currently!!!" : ""}</span>
                                                </>
                                            : ""
                                        } 

                                        </div>
                                        <div className="photos" style={{ paddingBottom: "0px", maxWidth: "70%", marginLeft: "20%" }}>
                                            <img className="photo-image"
                                                onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                                                src={restaurant.RestaurantImages[0].restaurantUrl}
                                                alt="Displaying default image"
                                            />
                                            <div className="text">
                                                <div style={{ fontSize: "1.15rem", paddingBottom: "1em" }}>{restaurant.description}</div>
                                                <div style={{ fontSize: "1.15rem", color: "rgb(94, 5, 5)" }}>Visit us today at :</div>
                                                <div>
                                                    <i className="fa-solid fa-location-dot" style={{ paddingRight: "0.5rem" }}></i>
                                                    <span style={{ paddingTop: "2px", fontSize: "1.15rem" }}>
                                                        {restaurant.address}, {restaurant.state}, {restaurant.city}, {restaurant.zipCode}
                                                    </span>
                                                </div>
                                                <div style={{ fontSize: "1.15rem", color: "rgb(94, 5, 5)", paddingTop: "0.75rem" }}>
                                                    Book Online or contact us at :
                                                </div>
                                                <div>
                                                    <i className="fa-solid fa-phone" style={{ paddingRight: "0.5rem" }}></i>
                                                    <span>{restaurant.phone}</span>
                                                </div>
                                                {/* <div style={{ paddingTop: "0.75rem" }}>
                                                    <a style={{ cursor: "pointer", fontSize: "1.15rem", textDecoration: "none", color: "rgb(30, 30, 158)" }}
                                                        href={restaurant.menuUrl}>Checkout our Menu here
                                                    </a>
                                                </div> */}
                                                <div style={{ paddingTop: "0.75rem", fontSize: "1.15rem" }}>
                                                    <span><i style={{ color: "rgb(141, 4, 4)", paddingRight: "0.5rem", fontSize: "1.15rem" }} className="fa-solid fa-bell-concierge"></i> {restaurant.restaurantType}</span>
                                                    <span><i style={{ color: "rgb(141, 4, 4)", paddingLeft: "3rem", paddingRight: "0.5rem", fontSize: "1.15rem" }} className="fa-solid fa-bowl-food"></i>  {restaurant.cuisines}</span>
                                                </div>
                                                <div style={{ display: "flex" }}>
                                                    <div style={{ fontSize: "1.10rem", color: "rgb(94, 5, 5)", paddingTop: "0.75rem" }}>
                                                        Hours of Operation:
                                                    </div>
                                                    <span style={{ paddingTop: "0.85rem", fontSize: "1.10rem", paddingLeft: "0.5rem" }}>
                                                        {restaurant.hoursOfOperation}
                                                    </span>
                                                    <span>
                                                        {restaurant.dayClosed ?
                                                            <div style={{ paddingTop: "0.87rem", fontSize: "1.10rem" }}>,&nbsp; {restaurant.dayClosed}s closed</div>
                                                            : null
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='upadte-delete' style={{ display: "flex", marginBottom: "0.25em", paddingBottom: "0px", paddingTop: "12rem" }}>
                                                <span style={{ marginLeft: "0%", margin: '0px', paddingBottom: "0px", marginTop: "3.35em" }} className="Delete">
                                                    <OpenModalButton
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
                                                        boxShadow: "5px 5px 5px black", height: "3em", width: "8em", cursor: "pointer",
                                                        position: "relative", marginRight: "30%", marginTop: "4em", marginLeft: "5%"
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

                        : <div style={{ fontStyle: "italic", fontSize: "20px", fontWeight: "bold" }}>No restaurants to show !!!</div>}
                </div >
                : <h2>Please log in to view your Restaurants !!</h2>}
        </div >
        : <span>Loading..</span>
        }
    </>                                                
    );
}

export default GetCurrUserRestaurants;