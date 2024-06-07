import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantMenudishThunk } from "../../redux/restaurants";
import { useModal } from '../../context/Modal';
import "./EditMenuDishModal.css";

const EditMenuDishModal = ({ menudish }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const currRestaurant = useSelector((state) => state.restaurants.byId[menudish.restaurantId]);
    const currentMenuDish = currRestaurant.MenuDishes.filter((dish) => dish.id == menudish.id);
    const { closeModal } = useModal();
    const [dishCategory, setdishCategory] = useState(currentMenuDish ? currentMenuDish[0].dishCategory : dishCategory);
    const [dishName, setdishName] = useState(currentMenuDish ? currentMenuDish[0].dishName : dishName);
    const [dishIngredients, setdishIngredients] = useState(currentMenuDish ? currentMenuDish[0].dishIngredients : dishIngredients);
    const [dishPrice, setdishPrice] = useState(currentMenuDish ? currentMenuDish[0].dishPrice : dishPrice);
    const [dishCalories, setdishCalories] = useState(currentMenuDish ? currentMenuDish[0].dishCalories : dishCalories);
    const [dishAllergies, setdishAllergies] = useState(currentMenuDish ? currentMenuDish[0].dishAllergies : dishAllergies);
    const [spiceLevel, setspiceLevel] = useState(currentMenuDish ? currentMenuDish[0].spiceLevel : spiceLevel);
    

    const [errors, setErrors] = useState([]);
    let foundError = false;
    let errorVal1, errorDisp;

    const errorVal = (substr) => {
        errorDisp = " ";
        for (let str of errors) {
            
            if (str.indexOf(substr) != -1) {
                errorDisp = str    
            }
        }
        return errorDisp
    }

    const validate = () => {
        foundError = false;
        const currErrors = [];
        
        if (!dishName.trim()) {
            foundError = true;
            // setErrors((errors) => ({ ...errors, dishName: "Dish Name is required" }));
            currErrors.push("Dish Name is required")
            setErrors(currErrors);
            
        }

        if (!dishCategory.trim()) {
            foundError = true;
            currErrors.push("Dish Category is required")
            //     setErrors((errors) => ({ ...errors, dishIngredients: "Dish Ingredients are required" }));
            setErrors(currErrors);
            
        }

        if (!dishIngredients.trim()) {
            foundError = true;
            currErrors.push("Dish Ingredients are required")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishIngredients: "Dish Ingredients are required" }));
            
        }


        if (dishPrice && dishPrice < 1) {
            foundError = true;
            currErrors.push("Dish Price is not valid")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishPrice: "Dish Price is required" }));
            
        }

        if (dishCalories && dishCalories < 1) {
            foundError = true;
            currErrors.push("Dish Calories are not valid")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishCalories: "Dish Calories are required" }));
           
        }

        if (!dishAllergies && !dishAllergies.trim()) {
            foundError = true;
            currErrors.push("Dish Allergies are required")
            setErrors(currErrors);
            //     setErrors((errors) => ({ ...errors, dishAllergies: "Dish Allergies are required" }));
            
        }
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        validate();
        
        const updateMenuDish = {
                    restaurantId: currRestaurant.id,
                    id: currentMenuDish[0].id,
                    dishCategory,
                    dishName,
                    dishIngredients,
                    dishPrice,
                    dishCalories,
                    dishAllergies,
                    spiceLevel 
        }

        try {
            if (!foundError) {
                const updatedDish = await dispatch(updateRestaurantMenudishThunk(currRestaurant.id, updateMenuDish))
                    .then(() => {
                        // setCreateDishMode(false),
                            closeModal();
                    })
                    .catch(async (res) => {
                        const data = await res.json();
                        if (currErrors) {
                            setErrors(currErrors);
                        }
                        
                    });
            }
        } catch (error) {
            
            const data = await error.json();
            
            if (currErrors) {
                setErrors(currErrors);
            }
        }
    };

    return (
        <div className="menudish-modal">
            {/* <h3 style={{ marginLeft: "6rem", alignItems: "center", justifyContent: "center" }}>Edit dish {currentMenuDish[0].dishName} !</h3> */}
            <h3 style={{ display:"flex", alignItems: "center", justifyContent: "center" }}>Edit dish {currentMenuDish[0].dishName} !</h3>
            
            <div style={{ paddingBottom: "0.59rem", paddingLeft: "0px" }}>
                <label style={{ padding: "0px", margin: "0px" }} htmlFor="dishName">
                    Dish Name <span className="error">
                        {errorVal("Dish Name")}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentMenuDish[0].dishName}
                    onChange={(e) => setdishName(e.target.value)}
                    placeholder="Name"
                    id="dishName"
                />
            </div>
            <div style={{ paddingBottom: "0.59rem" }}>
                <label htmlFor="dishCategory">
                    Dish Category <span className="error">{errorVal("Dish Category")}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentMenuDish[0].dishCategory}
                    onChange={(e) => setdishCategory(e.target.value)}
                    placeholder="Category"
                    id="dishCategory"
                />
            </div>
            <div style={{ paddingBottom: "0.59rem" }}>
                <label htmlFor="dishIngredients">
                    Dish Ingredients <span className="error">{errorVal("Dish Ingredients")}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentMenuDish[0].dishIngredients}
                    onChange={(e) => setdishIngredients(e.target.value)}
                    placeholder="Ingredients"
                    id="dishIngredients"
                />
            </div>
            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="dishPrice">
                        Dish Price <span className="error">{errorVal("Dish Price")}</span>

                    </label>
                    <input
                        type="number"
                        defaultValue={currentMenuDish[0].dishPrice}
                        onChange={(e) => setdishPrice(e.target.value)}
                        placeholder="Price"
                        id="dishPrice"
                    />
                </div>

                <div>&nbsp;,&nbsp;</div>
                <div className="small-input-div" style={{ width: "50%", paddingLeft: "0.25rem" }}>
                    <label htmlFor="dishCalories">
                        Calories <span className="error">{errorVal("Dish Calories")}</span>

                    </label>
                    <input style={{ width: "100%" }}
                        type="number"
                        defaultValue={currentMenuDish[0].dishCalories}
                        onChange={(e) => setdishCalories(e.target.value)}
                        placeholder="Calories"
                        id="dishCalories"
                    />
                </div>
            </div>

            <div className="input-row-two-col">
                <div className="small-input-div" style={{ width: "50%" }}>
                    <label htmlFor="dishAllergies">
                        Dish Allergies <span className="error">{errorVal("Dish Allergies")}</span>
                    </label>
                    <select style={{ backgroundColor: '#eeeeee', width: "100%" }} name="dishAllergies" 
                        onChange={(e) => setdishAllergies(e.target.value)} 
                        defaultValue={currentMenuDish[0].dishAllergies}>
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
                    <select style={{ backgroundColor: '#eeeeee', width: "104%" }} name="spiceLevel" 
                        onChange={(e) => setspiceLevel(e.target.value)} 
                        defaultValue={currentMenuDish[0].spiceLevel}>
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
                Edit 
            </button>
        </div>
    );
};

export default EditMenuDishModal;