import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createNewRestaurantThunk, addImageToRestaurantThunk, addHoildayToRestaurantThunk } from "../../redux/restaurants";
import "./NewRestaurant.css";

const NewRestaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const [restaurantType, setRestaurantType] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cuisines, setCuisines] = useState("");
    const [locationMapUrl, setLocationMapUrl] = useState("");
    const [dayClosed, setDayClosed] = useState("");
    const [hoursOfOperation, setHoursOfOperation] = useState("");
    const [avgMealPrice, setAvgMealPrice] = useState("");
    const [parkingAvailability, setParkingAvailability] = useState("");
    const [paymentOption, setPaymentOption] = useState("");
    const [dressCode, setDressCode] = useState("");
    const [executiveChef, setExecutiveChef] = useState("");
    const [menuUrl, setMenuUrl] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [image5, setImage5] = useState("");
    const [image6, setImage6] = useState("");
    const [occasion1, setOccasion1] = useState("");
    const [occasion2, setOccasion2] = useState("");
    const [occasion3, setOccasion3] = useState("");
    const [occasion4, setOccasion4] = useState("");
    const [occasion5, setOccasion5] = useState("");

    const [errors, setErrors] = useState({});
    let foundError = false;
    //let errors = {};

    const validate = () => {
        foundError = false;
        setErrors({});
        console.log('.......inside validate........')
        if (!name.trim()) {
            foundError = true;
            setErrors((errors) => ({ ...errors, name: "Name is required" }));
            console.log('........name.....', name, foundError);
        }

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

        if (!zipCode.trim()) {
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

        if (description.length > 255) {
            foundError = true;
            setErrors((errors) => ({ ...errors, description: "Description can not exceed 255 characters" }));
            console.log('........description2.....', description, foundError);
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

        // if (
        //     image1 && (
        //     image1.indexOf(".png") == -1 && 
        //     image1.indexOf(".jpg") == -1 && 
        //     image1.indexOf(".jpeg")== -1  )
        // ) {
        //   foundError = true;
        //   setErrors((errors) => ({ ...errors, image1: "Image URL must end in .png, .jpg, or .jpeg"}));
        // }

        if (
            image1 && (
                !image1.endsWith(".png") &&
                !image1.endsWith(".jpg") &&
                !image1.endsWith(".jpeg"))
        ) {
            setErrors((errors) => ({ ...errors, image1: "Image URL must end in .png, .jpg, or .jpeg" }));
        }

        if (
            image2 && (
                !image2.endsWith(".png") &&
                !image2.endsWith(".jpg") &&
                !image2.endsWith(".jpeg"))
        ) {
            setErrors((errors) => ({ ...errors, image2: "Image URL must end in .png, .jpg, or .jpeg" }));
        }

        if (
            image3 && (
                !image3.endsWith(".png") &&
                !image3.endsWith(".jpg") &&
                !image3.endsWith(".jpeg"))
        ) {
            setErrors((errors) => ({ ...errors, image3: "Image URL must end in .png, .jpg, or .jpeg" }));
        }

        if (
            image4 && (
                !image4.endsWith(".png") &&
                !image4.endsWith(".jpg") &&
                !image4.endsWith(".jpeg"))
        ) {
            setErrors((errors) => ({ ...errors, image4: "Image URL must end in .png, .jpg, or .jpeg" }));
        }

        if (
            image5 && (
                !image5.endsWith(".png") &&
                !image5.endsWith(".jpg") &&
                !image5.endsWith(".jpeg"))
        ) {
            setErrors((errors) => ({ ...errors, image4: "Image URL must end in .png, .jpg, or .jpeg" }));
        }

        if (
            image6 && (
                !image6.endsWith(".png") &&
                !image6.endsWith(".jpg") &&
                !image6.endsWith(".jpeg"))
        ) {
            setErrors((errors) => ({ ...errors, image4: "Image URL must end in .png, .jpg, or .jpeg" }));
        }

        if(!image1 && !image2 && !image3 && !image4 && !image5 && !image6){
            setErrors((errors) => ({ ...errors, image1: "Please add atleast 1 image." }));
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

        // let str = phone;
        // let regex = /[a-zA-Z0-9]/g; // only count letters and number
        // console.log(str.match(regex).length); // prints 13 to the console
        // let str2 = phone;
        // let regex1 = /[^a-z]/gi; // only count letters
        // console.log(str2.replace(/[^a-z]/gi, "").length); // prints 10 to the console
        // const numbers = regex - regex1;

        // if (numbers != 10) {
        //     foundError = true;
        //     setErrors((errors) => ({ ...errors, phone: "Phone number contains exactly 10 digits" }));
        //     console.log('........phone.....', phone, foundError);
        // } else {
        //     foundError = true;
        //     setErrors((errors) => ({ ...errors, phone: " " })); 
        // }

         //let str = phone;
         //let regex = /[^(,), ,0-9]/g; // only count letters and number
         //console.log("regex match : " , str.match(regex)); // prints 13 to the console
         //if ( str.match(regex).length)  {
         //    foundError = true;
         //    setErrors((errors) => ({ ...errors, phone: "Phone number contains invalid characters" }));
         //    console.log('........phone.....', phone, foundError);
         //}
         //let regex1 = /[0-9]/g; // only count letters
         //console.log("regex1 match : " , str.match(regex1)); // prints 13 to the console
         //if (str.match(regex1).length != 10) {
         //    foundError = true;
         //    setErrors((errors) => ({ ...errors, phone: "Phone number contains exactly 10 digits" }));
         //    console.log('........phone.....', phone, foundError);
         //}
    };

    const handleSubmit = async (e) => {
        console.log('..........inside handle submit..........');
        e.preventDefault();
        console.log('.........moving on to validate function..........');
        validate();
        console.log('..........errors after validate..........', errors)
        console.log("......foundError.....", foundError)

        try {
            console.log(".....inside try.......")
            if (!foundError) {
                console.log(".....inside if.......")
                const newRestaurant = await dispatch(
                    createNewRestaurantThunk({
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
                    })
                ).catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) {
                        setErrors((errors) => ({ ...errors, ...data.errors }));
                    }
                    console.log(".....errors.......", errors)
                })
                console.log(".....NEW Res.......", newRestaurant)
                if ( newRestaurant && newRestaurant.id && image1 ) {
                    const func_ = 
                            addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image1 });
                    await func_(dispatch)
                }
                if ( newRestaurant && newRestaurant.id && image2 ) {
                    const func_ = 
                            addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image2 });
                    await func_(dispatch)
                }
                if ( newRestaurant && newRestaurant.id && image3 ) {
                    const func_ = 
                            addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image3 });
                    await func_(dispatch)
                }
                if ( newRestaurant && newRestaurant.id && image4 ) {
                    const func_ = 
                            addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image4 });
                    await func_(dispatch)
                }
                if ( newRestaurant && newRestaurant.id && image5 ) {
                    const func_ = 
                            addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image5 });
                    await func_(dispatch)
                }
                if ( newRestaurant && newRestaurant.id && image6 ) {
                    const func_ = 
                            addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image6 });
                    await func_(dispatch)
                }
                if (newRestaurant && newRestaurant.id && occasion1) {
                    const func_  = addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion1 });
                    await func_(dispatch)
                }

                if (newRestaurant && newRestaurant.id && occasion2) {
                    const func_ = addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion2 });
                    await func_(dispatch)
                }

                if (newRestaurant && newRestaurant.id && occasion3) {
                    const func_ = addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion3 });
                    await func_(dispatch)
                }

                if (newRestaurant && newRestaurant.id && occasion4) {
                    const func_ = addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion4 });
                    await func_(dispatch)
                }

                if (newRestaurant && newRestaurant.id && occasion5) {
                    const func_ = addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion5 });
                    await func_(dispatch)
                }

                navigate('/restaurants/current')

                // if (newRestaurant && newRestaurant.id) {

                //     console.log("inside the image block");

                //     if (image1) {
                //         console.log("image1 ",image1);
                //         dispatch(addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image1 }));
                //         console.log("did not wait for thunk to complete");
                //     }

                //     if (image2) {
                //         dispatch(addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image2 }));
                //     }

                //     if (image3) {
                //         dispatch(addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image3 }));
                //     }

                //     if (image4) {
                //         dispatch(addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image4 }));
                //     }

                //     if (image5) {
                //         dispatch(addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image5 }));
                //     }

                //     if (image6) {
                //         dispatch(addImageToRestaurantThunk(newRestaurant.id, { restaurantUrl: image6 }));
                //     }

                //     if (occasion1) {
                //         dispatch(addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion1 }));
                //     }

                //     if (occasion2) {
                //         dispatch(addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion2 }));
                //     }

                //     if (occasion3) {
                //         dispatch(addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion3 }));
                //     }

                //     if (occasion4) {
                //         dispatch(addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion4 }));
                //     }

                //     if (occasion5) {
                //         dispatch(addHoildayToRestaurantThunk(newRestaurant.id, { occasion: occasion5 }));
                //     }
                //             //  navigate('/restaurants/current');    
                // }
                // navigate('/restaurants/current')
            }
        } catch (error) {
            console.log("......error.....", error)
            const data = await error.json();
            console.log(".....data......", data)
            if (data.errors) {
                setErrors((errors) => ({ ...errors, ...data.errors }));
            }
        }
    }

    // console.log('..........newRestaurant before entering images.........', newRestaurant);



    return (
        <form className="create-restaurant-form" onSubmit={handleSubmit}>
            <h2>Create a new Restaurant</h2>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name of your Restaurant"
                    id="name"
                />
                {/* {errors.name && <p className="error">{errors.name}</p>} */}
            </div>

            <div className="input-row">
                <label htmlFor="country">
                    Country <span className="error">{errors.country}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    value={country}
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
                    value={address}
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
                        value={city}
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
                        value={state}
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
                        value={zipCode}
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
                        value={phone}
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
                    value={locationMapUrl}
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
                    <select style={{ backgroundColor: '#eeeeee' }} name="restaurantType" onChange={(e) => setRestaurantType(e.target.value)} value={restaurantType}>
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
                        value={cuisines}
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
                    value={hoursOfOperation}
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
                    <select style={{ backgroundColor: '#eeeeee' }} name="dayClosed" onChange={(e) => setDayClosed(e.target.value)} value={dayClosed}>
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
                    <select style={{ backgroundColor: '#eeeeee' }} name="avgMealPrice" onChange={(e) => setAvgMealPrice(e.target.value)} value={avgMealPrice}>
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
                        value={parkingAvailability}
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
                        value={paymentOption}
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
                        onChange={(e) => setDressCode(e.target.value)} value={dressCode}>
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
                        value={executiveChef}
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
                    value={menuUrl}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please write at least 30 characters"
                    id="place-description"
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </div>

            <div style={{ paddingTop: "2em" }} className="inner-section-div">
                <h3 className="section-h3">Liven up your Restaurant with photos of your specialities</h3>
                <p className="section-p">
                    Submit a link to at least one photo to publish your Restaurant. Please add .png, .jpg or .jpeg photos only.
                </p>
            </div>

            <div>
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                        placeholder="Image URL"
                        id="image1"
                    />
                    {errors.image1 && <p className="error">{errors.image1}</p>}
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        placeholder="Image URL"
                        id="image2"
                    />
                    {errors.image2 && <p className="error">{errors.image2}</p>}
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                        placeholder="Image URL"
                        id="image3"
                    />
                    {errors.image3 && <p className="error">{errors.image3}</p>}
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                        placeholder="Image URL"
                        id="image4"
                    />
                    {errors.image4 && <p className="error">{errors.image4}</p>}
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        value={image5}
                        onChange={(e) => setImage5(e.target.value)}
                        placeholder="Image URL"
                        id="image5"
                    />
                    {errors.image5 && <p className="error">{errors.image5}</p>}
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="url"
                        value={image6}
                        onChange={(e) => setImage6(e.target.value)}
                        placeholder="Image URL"
                        id="image6"
                    />
                    {errors.image6 && <p className="error">{errors.image6}</p>}
                </div>
            </div>

            <div style={{ paddingTop: "2em" }} className="inner-section-div">
                <h3 className="section-h3">Mention the occasions on which Restaurant will be closed</h3>
            </div>

            <div>
                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        value={occasion1}
                        onChange={(e) => setOccasion1(e.target.value)}
                        placeholder="Occasion"
                        id="occasion1"
                    />
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        value={occasion2}
                        onChange={(e) => setOccasion2(e.target.value)}
                        placeholder="Occasion"
                        id="occasion2"
                    />
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        value={occasion3}
                        onChange={(e) => setOccasion3(e.target.value)}
                        placeholder="Occasion"
                        id="occasion3"
                    />
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        value={occasion4}
                        onChange={(e) => setOccasion4(e.target.value)}
                        placeholder="Occasion"
                        id="occasion4"
                    />
                </div>

                <div className="input-image-div">
                    <input
                        className="input-wide"
                        type="text"
                        value={occasion5}
                        onChange={(e) => setOccasion5(e.target.value)}
                        placeholder="Occasion"
                        id="occasion5"
                    />
                </div>
            </div>


            <div className="submit-button-div">
                <button style={{ backgroundColor: "rgb(141, 4, 4)", color: "white", boxShadow: "5px 5px 5px black", height: "3em", cursor: "pointer" }} className="submit-button" type="submit">
                    Create Restaurant
                </button>
            </div>
        </form>
    );
};

export default NewRestaurant;