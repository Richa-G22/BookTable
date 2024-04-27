import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateRestaurantThunk, detailedRestaurantThunk, updateRestaurantImageThunk, getRestaurantImagesThunk } from "../../redux/restaurants";
import "./EditRestaurant.css";

const EditRestaurant = () => {
    let { id } = useParams();
    id = parseInt(id);
    console.log('.....restaurantId......', id, typeof (id))
    const user = useSelector((state) => state.session.user.id);
    const currentRestaurant = useSelector((state) => state.restaurants.byId[id]);
    console.log('.......currentRestaurant........', currentRestaurant);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [restaurantType, setRestaurantType] = useState(currentRestaurant ? currentRestaurant.restaurantType : restaurantType);
    const [address, setAddress] = useState(currentRestaurant ? currentRestaurant.address : address);
    const [city, setCity] = useState(currentRestaurant ? currentRestaurant.city : city);
    const [state, setState] = useState(currentRestaurant ? currentRestaurant.state : state);
    const [country, setCountry] = useState(currentRestaurant ? currentRestaurant.country : country);
    const [zipCode, setZipCode] = useState(currentRestaurant ? currentRestaurant.zipCode : zipCode);
    const [phone, setPhone] = useState(currentRestaurant ? currentRestaurant.phone : phone);
    const [name, setName] = useState(currentRestaurant ? currentRestaurant.name : name);
    const [description, setDescription] = useState(currentRestaurant ? currentRestaurant.description : description);
    const [cuisines, setCuisines] = useState(currentRestaurant ? currentRestaurant.cuisines : cuisines);
    const [locationMapUrl, setLocationMapUrl] = useState(currentRestaurant ? currentRestaurant.locationMapUrl : locationMapUrl);
    const [dayClosed, setDayClosed] = useState(currentRestaurant ? currentRestaurant.dayClosed : dayClosed);
    const [hoursOfOperation, setHoursOfOperation] = useState(currentRestaurant ? currentRestaurant.hoursOfOperation : hoursOfOperation);
    const [avgMealPrice, setAvgMealPrice] = useState(currentRestaurant ? currentRestaurant.avgMealPrice : avgMealPrice);
    const [parkingAvailability, setParkingAvailability] = useState(currentRestaurant ? currentRestaurant.parkingAvailability : parkingAvailability);
    const [paymentOption, setPaymentOption] = useState(currentRestaurant ? currentRestaurant.paymentOption : paymentOption);
    const [dressCode, setDressCode] = useState(currentRestaurant ? currentRestaurant.dressCode : dressCode);
    const [executiveChef, setExecutiveChef] = useState(currentRestaurant ? currentRestaurant.executiveChef : executiveChef);
    const [menuUrl, setMenuUrl] = useState(currentRestaurant ? currentRestaurant.menuUrl : menuUrl);
    // const [image1, setImage1] = useState(currentRestaurant.RestaurantImages[0]? currentRestaurant.RestaurantImages[0].restaurantUrl : "");
    // const [image2, setImage2] = useState(currentRestaurant.RestaurantImages[1]? currentRestaurant.RestaurantImages[1].restaurantUrl : "");
    // const [image3, setImage3] = useState(currentRestaurant.RestaurantImages[2]? currentRestaurant.RestaurantImages[2].restaurantUrl : "");
    // const [image4, setImage4] = useState(currentRestaurant.RestaurantImages[3]? currentRestaurant.RestaurantImages[3].restaurantUrl : "");
    // const [image5, setImage5] = useState(currentRestaurant.RestaurantImages[4]? currentRestaurant.RestaurantImages[4].restaurantUrl : "");
    // const [image6, setImage6] = useState(currentRestaurant.RestaurantImages[5]? currentRestaurant.RestaurantImages[5].restaurantUrl : "");
    // const [image1, setImage1] = useState(currentRestaurant? currentRestaurant.RestaurantImages[0].restaurantUrl : "");
    // const [image2, setImage2] = useState(currentRestaurant? currentRestaurant.RestaurantImages[1].restaurantUrl : "");
    // const [image3, setImage3] = useState(currentRestaurant? currentRestaurant.RestaurantImages[2].restaurantUrl : "");
    // const [image4, setImage4] = useState(currentRestaurant? currentRestaurant.RestaurantImages[3].restaurantUrl : "");
    // const [image5, setImage5] = useState(currentRestaurant? currentRestaurant.RestaurantImages[4].restaurantUrl : "");
    // const [image6, setImage6] = useState(currentRestaurant? currentRestaurant.RestaurantImages[5].restaurantUrl : "");
    const [occasion1, setOccasion1] = useState(currentRestaurant ? currentRestaurant.occasion1 : occasion1);
    const [occasion2, setOccasion2] = useState(currentRestaurant ? currentRestaurant.occasion2 : occasion2);
    const [occasion3, setOccasion3] = useState(currentRestaurant ? currentRestaurant.occasion3 : occasion3);
    const [occasion4, setOccasion4] = useState(currentRestaurant ? currentRestaurant.occasion4 : occasion4);
    const [occasion5, setOccasion5] = useState(currentRestaurant ? currentRestaurant.occasion5 : occasion5);
    const [errors, setErrors] = useState({});
    let foundError = false;

    // useEffect(() => {
    //     const getCurrentUserRestaurants = async () => {
    //         dispatch(getCurrUserOwnedRestaurantsThunk());
    //     }
    //     getCurrentUserRestaurants()
    // }, [dispatch]);

    if (!currentRestaurant) {
        return <h2>Restaurant to be edited not found!!</h2>
    }

    // console.log('..current restaurant...', currentRestaurant)
    // console.log("....images", currentRestaurant.RestaurantImages[0].restaurantUrl)
    // console.log("....images", currentRestaurant.RestaurantImages[1].restaurantUrl)
    // console.log("....images", currentRestaurant.RestaurantImages[2].restaurantUrl)


    const validate = () => {
        foundError = false;
        setErrors({});
        console.log('.......inside validate........')

        if (!restaurantType.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, restaurantType: "Restaurant Type is required" }));
            console.log('........restaurantType.....', restaurantType, foundError);
        }

        if (!address.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, address: "Address is required" }));
            console.log('........address.....', address, foundError);
        }

        if (!city.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, city: "City is required" }));
            console.log('........city.....', city, foundError);
        }

        if (!state.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, state: "State is required" }));
            console.log('........state.....', state, foundError);
        }

        if (!country.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, country: "Country is required" }));
            console.log('........country.....', country);
        }

        if (!zipCode) {
            foundError = true;
            setErrors((errors) => ({ ...errors, zipCode: "ZipCode is required" }));
            console.log('........zipCode.....', zipCode, foundError);
        }

        if (!phone.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, phone: "Phone is required" }));
            console.log('........phone.....', phone, foundError);
        }

        if (!description.trim() || description.length < 30) {
            foundError = true;
            setErrors((errors) => ({ ...errors, description: "Description needs a minimum of 30 characters" }));
            console.log('........description1.....', description, foundError);
        }

        if (!description.trim() || description.length > 1000) {
            foundError = true;
            setErrors((errors) => ({ ...errors, description: "Description can not exceed 1000 characters" }));
            console.log('........description2.....', description, foundError);
        }

        if (!name.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, name: "Name is required" }));
            console.log('........name.....', name, foundError);
        }

        if (!cuisines.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, cuisines: "Cuisines are required" }));
            console.log('........cuisines.....', cuisines, foundError);
        }

        if (!dayClosed.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, dayClosed: "Day Closed is required" }));
            console.log('........dayClosed.....', dayClosed, foundError);
        }

        if (!hoursOfOperation.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, hoursOfOperation: "Hours of Operation are required" }));
            console.log('........hoursOfOperation.....', hoursOfOperation, foundError);
        }

        if (!avgMealPrice.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, avgMealPrice: "Average Meal Price is required" }));
            console.log('........avgMealPrice.....', avgMealPrice, foundError);
        }

        if (!parkingAvailability.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, parkingAvailability: "Parking Availability is required" }));
            console.log('........parkingAvailability.....', parkingAvailability, foundError);
        }

        if (!paymentOption.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, paymentOption: "Payment Options are required" }));
            console.log('........paymentOption.....', paymentOption, foundError);
        }

        if (!dressCode.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, dressCode: "Dress Code is required" }));
            console.log('........dressCode.....', dressCode, foundError);
        }

        if (!executiveChef.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, executiveChef: "Executive Chef required" }));
            console.log('........executiveChef.....', executiveChef, foundError);
        }

        if (locationMapUrl) {
            try {
                new URL(locationMapUrl);
                return true;
            } catch (errors) {
                foundError = true;
                setErrors((errors) => ({ ...errors, locationMapUrl: "Please enter a valid Location URL" }));

            }
            console.log('........locationMapUrl.....', locationMapUrl, foundError);
        }

        if (menuUrl) {
            try {
                new URL(menuUrl);
                return true;
            } catch (errors) {
                foundError = true;
                setErrors((errors) => ({ ...errors, menuUrl: "Please enter a valid Menu URL" }));

            }
            console.log('........menuUrl.....', menuUrl, foundError);
        }

         let str = phone;
         for ( let i = 0; i < str.length ; i++ ) {
             if( str[i] != '0' &&  
             str[i] != '1' && 
             str[i] != '2' && 
             str[i] != '3' && 
             str[i] != '4' && 
             str[i] != '5' && 
             str[i] != '6' && 
             str[i] != '7' && 
             str[i] != '8' && 
             str[i] != '9' && 
             str[i] != '9' && 
             str[i] != '(' && 
             str[i] != ')' && 
             str[i] != ' ' && 
             str[i] != '-' ) { 
                foundError = true;
                setErrors((errors) => ({ ...errors, phone: "Phone number contains invalid characters" }));
                console.log('........phone.....', phone, foundError);
             }
         }
         if ( !foundError ) {
            let phone_number_real = ""
            for ( let i = 0; i < str.length ; i++ ) {
                if( str[i] == '0' ||  
                str[i] == '1' || 
                str[i] == '2' || 
                str[i] == '3' || 
                str[i] == '4' || 
                str[i] == '5' || 
                str[i] == '6' || 
                str[i] == '7' || 
                str[i] == '8' || 
                str[i] == '9'  
                ) { 
                    phone_number_real += str[i];
                }
            }
            if ( phone_number_real.length != 10 ) {
                    foundError = true;
                    setErrors((errors) => ({ ...errors, phone: "Phone number should be 10 digits long" }));
                    console.log('........phone.....', phone, foundError);
            } else {
                console.log('phone number cleaned : ', phone_number_real)
                setPhone(phone_number_real)
            }
         }
         //let regex = '/[^0-9]/g'; // only count letters and number
         //console.log("phone number ", str );
         //let match_ = str.match("/[0-9]*/");
         //console.log("regex match : " , match_); // prints 13 to the console
         //if (match_ && match_.length)  {
         //    foundError = true;
         //    setErrors((errors) => ({ ...errors, phone: "Phone number contains invalid characters" }));
         //    console.log('........phone.....', phone, foundError);
         //}
         //let regex1 = '/[0-9]*/g'; // only count letters
         //console.log("regex1 match : " , str.match(regex1)); // prints 13 to the console
         //console.log("regex1 match length: " , str.match(regex1).length); // prints 13 to the console
         //match_ = str.match(regex1);
         //if (match_ && match_.length != 10) {
         //    foundError = true;
         //    setErrors((errors) => ({ ...errors, phone: "Phone number contains exactly 10 digits" }));
         //    console.log('........phone.....', phone, foundError);
         //}

        // if (
        //     image1 && (
        //         !image1.endsWith(".png") &&
        //         !image1.endsWith(".jpg") &&
        //         !image1.endsWith(".jpeg"))
        // ) {
        //     setErrors((errors) => ({ ...errors, image1: "Image URL must end in .png, .jpg, or .jpeg" }));
        // }

        // if (
        //     image2 && (
        //         !image2.endsWith(".png") &&
        //         !image2.endsWith(".jpg") &&
        //         !image2.endsWith(".jpeg"))
        // ) {
        //     setErrors((errors) => ({ ...errors, image2: "Image URL must end in .png, .jpg, or .jpeg" }));
        // }

        // if (
        //     image3 && (
        //         !image3.endsWith(".png") &&
        //         !image3.endsWith(".jpg") &&
        //         !image3.endsWith(".jpeg"))
        // ) {
        //     setErrors((errors) => ({ ...errors, image3: "Image URL must end in .png, .jpg, or .jpeg" }));
        // }

        // if (
        //     image4 && (
        //         !image4.endsWith(".png") &&
        //         !image4.endsWith(".jpg") &&
        //         !image4.endsWith(".jpeg"))
        // ) {
        //     setErrors((errors) => ({ ...errors, image4: "Image URL must end in .png, .jpg, or .jpeg" }));
        // }

        // if (
        //     image5 && (
        //         !image5.endsWith(".png") &&
        //         !image5.endsWith(".jpg") &&
        //         !image5.endsWith(".jpeg"))
        // ) {
        //     setErrors((errors) => ({ ...errors, image4: "Image URL must end in .png, .jpg, or .jpeg" }));
        // }

        // if (
        //     image6 && (
        //         !image6.endsWith(".png") &&
        //         !image6.endsWith(".jpg") &&
        //         !image6.endsWith(".jpeg"))
        // ) {
        //     setErrors((errors) => ({ ...errors, image4: "Image URL must end in .png, .jpg, or .jpeg" }));
        // }
    };

    const handleSubmit = async (e) => {
        console.log('..........inside handle submit..........');
        e.preventDefault();
        console.log('.........moving on to validate function..........');
        validate();
        console.log('..........errors after validate..........', errors)
        console.log("......foundError.....", foundError)
        const restaurant = {
            restaurantType,
            address,
            city,
            state,
            country,
            zipCode,
            phone,
            name,
            description,
            cuisines,
            locationMapUrl,
            dayClosed,
            hoursOfOperation,
            avgMealPrice,
            parkingAvailability,
            paymentOption,
            dressCode,
            executiveChef,
            menuUrl
        }

        try {
            if (!foundError) {
                const updatedRestaurant = await dispatch(
                    updateRestaurantThunk(currentRestaurant.id, restaurant)
                ).catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) {
                        setErrors((errors) => ({ ...errors, ...data.errors }));
                    }
                })
                if ( updatedRestaurant ) {
                     const func_ =
                         getRestaurantImagesThunk(currentRestaurant.id);
                     await func_(dispatch)
                }
                // if (currentRestaurant && currentRestaurant.id && image1) {
                //     const func_ =
                //         updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[0].id, { restaurantUrl: image1 });
                //     await func_(dispatch)
                // }
                // if (currentRestaurant && currentRestaurant.id && image2) {
                //     const func_ =
                //         updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[1].id, { restaurantUrl: image2 });
                //     await func_(dispatch)
                // }
                // if (currentRestaurant && currentRestaurant.id && image3) {
                //     const func_ =
                //         updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[2].id, { restaurantUrl: image3 });
                //     await func_(dispatch)
                // }
                // if (currentRestaurant && currentRestaurant.id && image4) {
                //     const func_ =
                //         updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[3].id, { restaurantUrl: image4 });
                //     await func_(dispatch)
                // }
                // if (currentRestaurant && currentRestaurant.id && image5) {
                //     const func_ =
                //         updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[4].id, { restaurantUrl: image5 });
                //     await func_(dispatch)
                // }
                // if (currentRestaurant && currentRestaurant.id && image6) {
                //     const func_ =
                //         updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[5].id, { restaurantUrl: image6 });
                //     await func_(dispatch)
                // }
                // {

                //     if (currentRestaurant.RestaurantImages[0]) {
                //         dispatch(updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[0].id, { restaurantUrl: image1}));
                //     }

                //     if (currentRestaurant.RestaurantImages[1]) {
                //         dispatch(updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[1].id, { restaurantUrl: image2 }));
                //     }

                //     if (currentRestaurant.RestaurantImages[2]) {
                //         dispatch(updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[2].id, { restaurantUrl: image3 }));
                //     }

                //     if (currentRestaurant.RestaurantImages[3]) {
                //         dispatch(updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[3].id, { restaurantUrl: image4 }));
                //     }

                //     if (currentRestaurant.RestaurantImages[4]) {
                //         dispatch(updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[4].id, { restaurantUrl: image5 }));
                //     }

                //     if (currentRestaurant.RestaurantImages[5]) {
                //         dispatch(updateRestaurantImageThunk(currentRestaurant.id, currentRestaurant.RestaurantImages[5].id, { restaurantUrl: image6 }));
                //     }
                // }
                navigate('/restaurants/current')
            }
        } catch (error) {
            const data = await error.json();
            console.log('$$$$$$$$$$data', data)
            if (data.errors) {
                setErrors((errors) => ({ ...errors, ...data.errors }));
            }
        }
    };


    return (
        <form className="create-restaurant-form" onSubmit={handleSubmit}>
            <h2>Update Restaurant</h2>
            <div>
                {/* <h3 className="section-h3">Where&apos;s your place located?</h3> */}
            </div>

            <div style={{ paddingBottom: "0.59rem" }}>
                <label htmlFor="name">
                    Name <span className="error">{errors.name}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentRestaurant.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name of your Restaurant"
                    id="name"
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="input-row">
                <label htmlFor="country">
                    Country <span className="error">{errors.country}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentRestaurant.country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    id="country"
                ></input>
            </div>

            <div className="input-row">
                <label htmlFor="street-address">
                    Street Address <span className="error">{errors.address}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentRestaurant.address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    id="street-address"
                />
            </div>

            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="city">
                        City <span className="error">{errors.city}</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={currentRestaurant.city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        id="city"
                    />
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "53%", paddingLeft: "0.50rem" }}>
                    <label htmlFor="state">
                        State <span className="error">{errors.state}</span>
                    </label>
                    <input style={{ width: "15rem" }}
                        type="text"
                        defaultValue={currentRestaurant.state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        id="state"
                    />
                </div>
            </div>

            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="zipCode">
                        Zip Code <span className="error">{errors.zipCode}</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={currentRestaurant.zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Zip Code"
                        id="zipCode"
                    />
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "53%", paddingLeft: "0.50rem" }}>
                    <label htmlFor="phone">
                        Phone # <span className="error">{errors.phone}</span>
                    </label>
                    <input style={{ width: "15rem" }}
                        type="text"
                        defaultValue={currentRestaurant.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone #"
                        id="phone"
                    />
                </div>
            </div>

            <div style={{ paddingBottom: "0.59rem" }}>
                <label htmlFor="locationMapUrl">
                    Location Indicator Link <span className="error">{errors.locationMapUrl}</span>
                </label>
                <input
                    className="input-wide"
                    type="url"
                    defaultValue={currentRestaurant.locationMapUrl}
                    onChange={(e) => setLocationMapUrl(e.target.value)}
                    placeholder="Location Indicator Link"
                    id="locationMapUrl"
                />
                {/* {errors.name && <p className="error">{errors.name}</p>} */}
            </div>

            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="restaurantType">
                        Restaurant Type <span className="error">{errors.restaurantType}</span>
                    </label>
                    {/* <input
                        type="text"
                        value={restaurantType}
                        onChange={(e) => setRestaurantType(e.target.value)}
                        placeholder="Restaurant Type"
                        id="restaurantType"
                    /> */}
                    <select style={{ backgroundColor: '#eeeeee' }} name="restaurantType"
                        onChange={(e) => setRestaurantType(e.target.value)}
                        defaultValue={currentRestaurant.restaurantType}>
                        <option value="" disabled>Select Restaurant Type</option>
                        <option value="Dine-in">Dine-in</option>
                        <option value="Take-Out">Take-out</option>
                        <option value="Dine-in/Take-out">Dine-in/Take-out</option>
                    </select>
                    {/* </label> */}
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "53%", paddingLeft: "0.50rem" }}>
                    <label htmlFor="cuisines">
                        Cuisines <span className="error">{errors.cuisines}</span>
                    </label>
                    <input style={{ width: "15rem" }}
                        type="text"
                        defaultValue={currentRestaurant.cuisines}
                        onChange={(e) => setCuisines(e.target.value)}
                        placeholder="Cuisines"
                        id="cuisines"
                    />
                </div>
            </div>

            <div style={{ paddingBottom: "0.59rem" }}>
                <label htmlFor="hoursOfOperation">
                    Hours of Operation <span className="error">{errors.hoursOfOperation}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentRestaurant.hoursOfOperation}
                    onChange={(e) => setHoursOfOperation(e.target.value)}
                    placeholder="Hours of Operation"
                    id="hoursOfOperation"
                />
                {/* {errors.name && <p className="error">{errors.hoursOfOperation}</p>} */}
            </div>

            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="dayClosed">
                        Day Closed <span className="error">{errors.dayClosed}</span>
                    </label>
                    <select style={{ backgroundColor: '#eeeeee' }} name="dayClosed"
                        onChange={(e) => setDayClosed(e.target.value)}
                        defaultValue={currentRestaurant.dayClosed}>
                        <option value="" disabled>Select Day Closed</option>
                        <option value="Sunday">Sunday</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="All Days Open">All Days Open</option>
                    </select>
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "53%", paddingLeft: "0.50rem" }}>
                    <label htmlFor="avgMealPrice">
                        Average Meal Price <span className="error">{errors.avgMealPrice}</span>
                    </label>
                    <select style={{ backgroundColor: '#eeeeee' }} name="avgMealPrice"
                        onChange={(e) => setAvgMealPrice(e.target.value)}
                        defaultValue={currentRestaurant.avgMealPrice}>
                        <option value="" disabled>Select Average Meal Price</option>
                        <option value="$30 and under">$30 and under</option>
                        <option value="$50 and under">$50 and under</option>
                        <option value="$75 and unde">$75 and under</option>
                        <option value="$100 and under">$100 and under</option>
                        <option value="$120 and over">$120 and over</option>
                    </select>
                </div>
            </div>

            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="parkingAvailability">
                        Praking Details <span className="error">{errors.parkingAvailability}</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={currentRestaurant.parkingAvailability}
                        onChange={(e) => setParkingAvailability(e.target.value)}
                        placeholder="Parking Details"
                        id="parkingAvailability"
                    />
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "53%", paddingLeft: "0.50rem" }}>
                    <label htmlFor="paymentOption">
                        Payment Options <span className="error">{errors.paymentOption}</span>
                    </label>
                    <input style={{ width: "15rem" }}
                        type="text"
                        defaultValue={currentRestaurant.paymentOption}
                        onChange={(e) => setPaymentOption(e.target.value)}
                        placeholder="Payment Options"
                        id="paymentOption"
                    />
                </div>
            </div>

            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="dressCode">
                        Dress Code <span className="error">{errors.dressCode}</span>
                    </label>

                    <select style={{ backgroundColor: '#eeeeee' }} name="dressCode"
                        onChange={(e) => setDressCode(e.target.value)}
                        defaultValue={currentRestaurant.dressCode}>
                        <option value="" disabled>Select Dress Code</option>
                        <option value="Casuals">Casuals</option>
                        <option value="Smart Casuals">Smart Casuals</option>
                        <option value="Formals">Formals</option>
                    </select>
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "53%", paddingLeft: "0.50rem" }}>
                    <label htmlFor="executiveChef">
                        Executive Chef <span className="error">{errors.executiveChef}</span>
                    </label>
                    <input style={{ width: "15rem" }}
                        type="text"
                        defaultValue={currentRestaurant.executiveChef}
                        onChange={(e) => setExecutiveChef(e.target.value)}
                        placeholder="Executive Chef"
                        id="executiveChef"
                    />
                </div>
            </div>

            <div style={{ paddingBottom: "0.59rem" }}>
                <label htmlFor="menuUrl">
                    Menu Link <span className="error">{errors.menuUrl}</span>
                </label>
                <input
                    className="input-wide"
                    type="url"
                    defaultValue={currentRestaurant.menuUrl}
                    onChange={(e) => setMenuUrl(e.target.value)}
                    placeholder="Menu Link"
                    id="menuUrl"
                />
                {/* {errors.menuUrl && <p className="error">{errors.menuUrl}</p>} */}
            </div>


            <div style={{ paddingTop: "2rem" }} className="inner-section-div">
                <h3 className="section-h3">Describe your place to customers</h3>
                <p className="section-p">
                    Mention the best features of your Restaurant, any special amenities like
                    easily available parking, specialities, appealing ambience etc.
                </p>
            </div>
            <div>
                <textarea
                    className="input-wide"
                    rows="10"
                    defaultValue={currentRestaurant.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please write at least 30 characters"
                    id="place-description"
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </div>

            {/* <div style={{paddingTop:"2em"}} className="inner-section-div">
                <h3 className="section-h3">Liven up your Restaurant with photos of your specialities</h3>
                <p className="section-p">
                    Submit a link to at least one photo to publish your Restaurant. Please dubmit .png, .jpg or .jpeg photos only.
                </p>
            </div>

            <div>
            {currentRestaurant.RestaurantImages[0] ?
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        defaultValue={currentRestaurant.RestaurantImages[0].restaurantUrl}
                        onChange={(e) => setImage1(e.target.value)}
                        placeholder="Image URL"
                        id="image1"
                    />
                    {errors.image1 && <p className="error">{errors.image1}</p>}
                </div>
                : " "}
                {currentRestaurant.RestaurantImages[1] ?
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        defaultValue={currentRestaurant.RestaurantImages[1].restaurantUrl}
                        onChange={(e) => setImage2(e.target.value)}
                        placeholder="Image URL"
                        id="image2"
                    />
                    {errors.image2 && <p className="error">{errors.image2}</p>}
                </div>
                : " "}

                {currentRestaurant.RestaurantImages[2] ?
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        defaultValue={currentRestaurant.RestaurantImages[2].restaurantUrl}
                        onChange={(e) => setImage3(e.target.value)}
                        placeholder="Image URL"
                        id="image3"
                    />
                    {errors.image3 && <p className="error">{errors.image3}</p>}
                </div>
                : " "}

                {currentRestaurant.RestaurantImages[3] ?
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        defaultValue={currentRestaurant.RestaurantImages[3].restaurantUrl}
                        onChange={(e) => setImage4(e.target.value)}
                        placeholder="Image URL"
                        id="image4"
                    />
                    {errors.image4 && <p className="error">{errors.image4}</p>}
                </div>
                : " "}

                {currentRestaurant.RestaurantImages[4] ?
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        defaultValue={currentRestaurant.RestaurantImages[4].restaurantUrl}
                        onChange={(e) => setImage5(e.target.value)}
                        placeholder="Image URL"
                        id="image5"
                    />
                    {errors.image5 && <p className="error">{errors.image5}</p>}
                </div>
                : " "}

                {currentRestaurant.RestaurantImages[5] ?
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        defaultValue={currentRestaurant.RestaurantImages[5].restaurantUrl}
                        onChange={(e) => setImage6(e.target.value)}
                        placeholder="Image URL"
                        id="image6"
                    />
                    {errors.image6 && <p className="error">{errors.image6}</p>}
                </div>
                : " "}
            </div>

            <div style={{paddingTop:"2em"}}className="inner-section-div">
                <h3 className="section-h3">Mention the occasions on which Restaurant will be closed</h3>
            </div>

            <div>
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        defaultValue={currentRestaurant.occasion1}
                        onChange={(e) => setOccasion1(e.target.value)}
                        placeholder="Occasion"
                        id="occasion1"
                    />
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        defaultValue={currentRestaurant.occasion2}
                        onChange={(e) => setOccasion2(e.target.value)}
                        placeholder="Occasion"
                        id="occasion2"
                    />
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        defaultValue={currentRestaurant.occasion3}
                        onChange={(e) => setOccasion3(e.target.value)}
                        placeholder="Occasion"
                        id="occasion3"
                    />
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        defaultValue={currentRestaurant.occasion4}
                        onChange={(e) => setOccasion4(e.target.value)}
                        placeholder="Occasion"
                        id="occasion4"
                    />
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        defaultValue={currentRestaurant.occasion5}
                        onChange={(e) => setOccasion5(e.target.value)}
                        placeholder="Occasion"
                        id="occasion5"
                    />
                </div>
            </div> */}


            <div className="submit-button-div">
                <button style={{ backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "5px 5px 5px black", height: "3em", cursor: "pointer" }} className="submit-button" type="submit">
                    Update
                </button>
            </div>
        </form>
    );
};

export default EditRestaurant;