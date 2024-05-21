import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMenudishToRestaurantThunk } from "../../redux/restaurants";
import { useModal } from '../../context/Modal';
import "./NewMenuDishModal.css";

const NewMenuDishModal = ({ restaurantId, setCreateDishMode }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const [dishCategory, setdishCategory] = useState("");
    const [dishName, setdishName] = useState("");
    const [dishIngredients, setdishIngredients] = useState("");
    const [dishPrice, setdishPrice] = useState("");
    const [dishCalories, setdishCalories] = useState("");
    const [dishAllergies, setdishAllergies] = useState("");
    const [spiceLevel, setspiceLevel] = useState("");
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const currRestaurant = useSelector((state) => state.restaurants.byId[restaurantId]);
    console.log('......currRestaurant......', currRestaurant);

    const [errors, setErrors] = useState([]);
    // const [errors, setErrors] = useState({});
    let foundError = false;
    let errorVal1, errorDisp;

    const errorVal = (substr) => {
        errorDisp = " ";
        for (let str of errors) {
            { console.log("str, errors", str, errors) }
            if (str.indexOf(substr) != -1) {
                errorDisp = str
                { console.log("errorDisp", errorDisp) }
            }
        }
        return errorDisp
    }

    const validate = () => {
        foundError = false;
        // setErrors({});
        const currErrors = [];
        console.log('.......inside validate........')
        if (!dishName.trim()) {
            console.log(".....here1....")
            foundError = true;
            // setErrors((errors) => ({ ...errors, dishName: "Dish Name is required" }));
            currErrors.push("Dish Name is required")
            console.log("...currErrors...", currErrors);
            setErrors(currErrors);
            console.log('........dishName.....', dishName, foundError);
        }

        if (!dishCategory.trim()) {
            foundError = true;
            currErrors.push("Dish Category is required")
            //     setErrors((errors) => ({ ...errors, dishIngredients: "Dish Ingredients are required" }));
            setErrors(currErrors);
            console.log('........dishCategory.....', dishCategory, foundError);
        }

        if (!dishIngredients.trim()) {
            foundError = true;
            currErrors.push("Dish Ingredients are required")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishIngredients: "Dish Ingredients are required" }));
            console.log('........dishIngredients.....', dishIngredients, foundError);
        }

        if (!dishPrice.trim()) {
            foundError = true;
            currErrors.push("Dish Price is required")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishPrice: "Dish Price is required" }));
            console.log('........dishPrice.....', dishPrice, foundError);
        }

        if (dishPrice && dishPrice < 1) {
            foundError = true;
            currErrors.push("Dish Price is not valid")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishPrice: "Dish Price is required" }));
            console.log('........dishPrice.....', dishPrice, foundError);
        }

        if (!dishCalories.trim()) {
            foundError = true;
            currErrors.push("Dish Calories are required")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishCalories: "Dish Calories are required" }));
            console.log('........dishCalories.....', dishCalories, foundError);
        }

        if (dishCalories && dishCalories < 1) {
            foundError = true;
            currErrors.push("Dish Calories are not valid")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishCalories: "Dish Calories are required" }));
            console.log('........dishCalories.....', dishCalories, foundError);
        }

        if (!dishAllergies && !dishAllergies.trim()) {
            foundError = true;
            currErrors.push("Dish Allergies are required")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishAllergies: "Dish Allergies are required" }));
            console.log('........dishAllergies.....', dishAllergies, foundError);
        }
    }

    const handleSubmit = async (e) => {
        console.log('..........inside handle submit..........');
        e.preventDefault();
        console.log('.........moving on to validate function..........');
        validate();
        console.log('..........errors after validate..........', errors)
        console.log("......foundError.....", foundError)

        try {
            if (!foundError) {
                const newDish = await dispatch(addMenudishToRestaurantThunk(restaurantId, {
                    restaurantId,
                    dishCategory,
                    dishName,
                    dishIngredients,
                    dishPrice,
                    dishCalories,
                    dishAllergies,
                    spiceLevel
                }))
                    .then(() => {
                        setCreateDishMode(false),
                            closeModal();
                    })
                    .catch(async (res) => {
                        const data = await res.json();
                        // if (data.errors) {
                        //     setErrors((errors) => ({ ...errors, ...data.errors }));
                        // }
                        if (currErrors) {
                            setErrors(currErrors);
                        }
                        console.log(".....errors.......", errors)
                    });
            }
        } catch (error) {
            console.log("......error.....", error)
            const data = await error.json();
            console.log(".....data......", data)
            // if (data.errors) {
            //     setErrors((errors) => ({ ...errors, ...data.errors }));
            // }
            if (currErrors) {
                setErrors(currErrors);
            }
        }
    };

    return (
        <div className="menudish-modal">
            <h3 style={{ marginLeft: "6rem", alignItems: "center", justifyContent: "center" }}>Details of the new dish!</h3>
            {/* <p className="error">{errors}</p> */}
            {console.log("...errors....", errors)}
            <div style={{ paddingBottom: "0.59rem", paddingLeft: "0px" }}>
                <label style={{ padding: "0px", margin: "0px" }} htmlFor="dishName">
                    {/* Dish Name <span className="error">{errors.dishName}</span> */}
                    {/* Dish Name <span className="error">{errors[0]}</span> */}
                    Dish Name <span className="error">
                        {/* {errorVal = () => {
                            { console.log("inside function") }
                            for (let str of errors) {
                                { console.log("str, errors", str, errors) }
                                if (str.indexOf("Dish Name") != -1) {
                                    errorDisp = str
                                    { console.log("errorDisp", errorDisp) }
                                }
                            }
                            return errorDisp
                        }} */}
                        {errorVal("Dish Name")}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    value={dishName}
                    onChange={(e) => setdishName(e.target.value)}
                    placeholder="Name"
                    id="dishName"
                />
            </div>
            <div style={{ paddingBottom: "0.59rem" }}>
                <label htmlFor="dishCategory">
                    {/* Dish Category <span className="error">{errors.dishCategory}</span> */}
                    {/* Dish Category <span className="error">{errors[1]}</span> */}
                    Dish Category <span className="error">{errorVal("Dish Category")}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    value={dishCategory}
                    onChange={(e) => setdishCategory(e.target.value)}
                    placeholder="Category"
                    id="dishCategory"
                />
            </div>
            <div style={{ paddingBottom: "0.59rem" }}>
                <label htmlFor="dishIngredients">
                    {/* Dish Ingredients <span className="error">{errors.dishIngredients}</span> */}
                    {/* Dish Ingredients <span className="error">{errors[2]}</span> */}
                    Dish Ingredients <span className="error">{errorVal("Dish Ingredients")}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    value={dishIngredients}
                    onChange={(e) => setdishIngredients(e.target.value)}
                    placeholder="Ingredients"
                    id="dishIngredients"
                />
            </div>
            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="dishPrice">
                        {/* Dish Price <span className="error">{errors.dishPrice}</span> */}
                        {/* Dish Price <span className="error">{errors[3]} {errors[4]}</span> */}
                        Dish Price <span className="error">{errorVal("Dish Price")}</span>

                    </label>
                    <input
                        type="number"
                        value={dishPrice}
                        onChange={(e) => setdishPrice(e.target.value)}
                        placeholder="Price"
                        id="dishPrice"
                    />
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "50%", paddingLeft: "0.25rem" }}>
                    <label htmlFor="dishCalories">
                        {/* Calories <span className="error">{errors.dishCalories}</span> */}
                        {/* Calories <span className="error">{errors[5]} {errors[6]}</span> */}
                        Calories <span className="error">{errorVal("Dish Calories")}</span>

                    </label>
                    <input style={{ width: "100%" }}
                        type="number"
                        value={dishCalories}
                        onChange={(e) => setdishCalories(e.target.value)}
                        placeholder="Calories"
                        id="dishCalories"
                    />
                </div>
            </div>

            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="dishAllergies">
                        {/* Dish Allergies <span className="error">{errors.dishAllergies}</span> */}
                        {/* Dish Allergies <span className="error">{errors[7]}</span> */}
                        Dish Allergies <span className="error">{errorVal("Dish Allergies")}</span>
                    </label>
                    <select style={{ backgroundColor: '#eeeeee', width: "100%" }} name="dishAllergies" onChange={(e) => setdishAllergies(e.target.value)} value={dishAllergies}>
                        <option value="" disabled>Select Dish Allergies</option>
                        <option value="Nuts">Nuts</option>
                        <option value="Soy">Soy</option>
                        <option value="Fish">Fish</option>
                        <option value="Milk">Milk</option>
                        <option value="Eggs">Eggs</option>
                        <option value="Sesame">Sesame</option>
                        <option value="None">None</option>
                    </select>
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "50%", paddingLeft: "0.50rem" }}>
                    <label htmlFor="spiceLevel">
                        Spice Level <span className="error">{errors.spiceLevel}</span>
                    </label>
                    <select style={{ backgroundColor: '#eeeeee', width: "104%" }} name="spiceLevel" onChange={(e) => setspiceLevel(e.target.value)} value={spiceLevel}>
                        <option value="" disabled>Select Spice Level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>

            <button
                className="submit-menudish-btn"
                onClick={handleSubmit}
            >
                Submit new Dish
            </button>
        </div>
    );
};

export default NewMenuDishModal;