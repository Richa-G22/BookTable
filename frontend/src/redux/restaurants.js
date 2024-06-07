import { csrfFetch } from "./csrf";

// Action Types
const GET_ALL_RESTAURANTS = "restaurants/GET_ALL_RESTAURANTS";
const GET_DETAILED_RESTAURANT = "restaurants/GET_DETAILED_RESTAURANT";
const CREATE_NEW_RESTAURANT = "restaurants/CREATE_NEW_RESTAURANT";
const GET_CURRENT_USER_OWNED_RESTAURANTS = "restaurants/GET_CURRENT_USER_OWNED_RESTAURANTS";
const DELETE_RESTAURANT = "restaurants/DELETE_RESTAURANT";
const UPDATE_RESTAURANT = "restaurants/UPDATE_RESTAURANT";
const UPDATE_RESTAURANT_REVIEW = "restaurants/UPDATE_RESTAURANT_REVIEW";
const UPDATE_RESTAURANT_MENUDISH = "restaurants/UPDATE_RESTAURANT_MENUDISH";
const UPDATE_RESTAURANT_IMAGE = "restaurants/UPDATE_RESTAURANT_IMAGE";
const GET_RESTAURANT_REVIEWS = "restaurants/GET_RESTAURANT_REVIEWS";
const GET_RESTAURANT_HOLIDAYS = "restaurants/GET_RESTAURANT_HOLIDAYS";
const GET_RESTAURANT_MENUDISHES = "restaurants/GET_RESTAURANT_MENUDISHES";
const GET_BOOKINGS_BY_DATE = "restaurants/GET_BOOKINGS_BY_DATE";
const GET_RESTAURANT_OPEN_SLOTS = "restaurants/GET_RESTAURANT_OPEN_SLOTS";
const ADD_IMAGE_TO_RESTAURANT = "restaurants/ADD_IMAGE_TO_RESTAURANT";
const ADD_REVIEW_TO_RESTAURANT = "restaurants/ADD_REVIEW_TO_RESTAURANT";
const ADD_HOLIDAY_TO_RESTAURANT = "restaurants/ADD_HOLIDAY_TO_RESTAURANT";
const ADD_MENUDISH_TO_RESTAURANT = "restaurants/ADD_MENUDISH_TO_RESTAURANT";
const ADD_BOOKING_TO_RESTAURANT = "restaurants/ADD_BOOKING_TO_RESTAURANT";
const GET_RESTAURANT_IMAGES = "restaurants/GET_RESTAURANT_IMAGES";
const DELETE_REVIEW = "restaurants/DELETE_REVIEW";
const DELETE_MENUDISH_BY_ID = "restaurants/DELETE_MENUDISH_BY_ID";

//----------------------------------------------------------------------------------------

// Action Creators
const getAllRestaurants = (restaurants) => {
    return {
        type: GET_ALL_RESTAURANTS,
        payload: restaurants,
    };
};

const getDetailedRestaurant = (id) => {
    return {
        type: GET_DETAILED_RESTAURANT,
        payload: id,
    }
};

const getRestaurantImages = (id) => {
    return {
        type: GET_RESTAURANT_IMAGES,
        payload: id, 
    }
}

const createNewRestaurant = (restaurant) => {
    return {
        type: CREATE_NEW_RESTAURANT,
        payload: restaurant,
    }
};

const getCurrUserOwnedRestaurants = (userId) => {
    return {
        type: GET_CURRENT_USER_OWNED_RESTAURANTS,
        payload: userId,
    }
};

const deleteRestaurant = (id) => {
    return {
        type: DELETE_RESTAURANT,
        payload: id,
    }
};

const updateRestaurant = (id) => {
    return {
        type: UPDATE_RESTAURANT,
        payload: id,
    }
};

const updateRestaurantImage = (restaurantId, id, image) => {
    return {
        type: UPDATE_RESTAURANT_IMAGE,
        payload: { restaurantId, id, image }
    }
};

const addImageToRestaurant = (id, RestaurantImages) => {
    return {
        type: ADD_IMAGE_TO_RESTAURANT,
        payload: { id, RestaurantImages } 
    }
};

const addHoildayToRestaurant = (id, Holidays) => {
    return {
        type: ADD_HOLIDAY_TO_RESTAURANT,
        payload: { id, Holidays } 
    }
};

const addMenudishToRestaurant = (menudish) => {
    return {
        type: ADD_MENUDISH_TO_RESTAURANT,
        payload: { menudish } 
    }
};

const getReviewsForRestaurant = (restaurantId,reviews) => {
    return {
        type: GET_RESTAURANT_REVIEWS,
        payload:  {restaurantId,reviews}  
    }
};

const getHolidaysForRestaurant = (id) => {
    return {
        type: GET_RESTAURANT_HOLIDAYS,
        payload: { id } 
    }
};

const getMenudishesForRestaurant = (id) => {
    return {
        type: GET_RESTAURANT_MENUDISHES,
        payload: { id } 
    }
};

const updateRestaurantReview = (review) => {
    return {
        type: UPDATE_RESTAURANT_REVIEW,
        payload: {review}
    }
};

const updateRestaurantMenudish = (menudish) => {
    return {
        type: UPDATE_RESTAURANT_MENUDISH,
        payload: { menudish }
    }
};

const addReviewToRestaurant = (id, reviews) => {
    return {
        type: ADD_REVIEW_TO_RESTAURANT,
        payload: { id, reviews } 
    }
};

const getBookingsByDate = (id, date) => {
    return {
        type: GET_BOOKINGS_BY_DATE,
        payload: { id, date } 
    }
};

const getSlotsByIdDate = (data) => {
    return {
        type: GET_RESTAURANT_OPEN_SLOTS,
        payload: {data} 
    }
};

//const addNewBooking = (restaurantId, slotId, bookingDate) => {
//    return {
//        type: ADD_BOOKING_TO_RESTAURANT,
//        payload: { restaurantId, slotId, bookingDate } 
//    }
//};

const addNewBooking = (data) => {
    return {
        type: ADD_BOOKING_TO_RESTAURANT,
        payload: data
    }
};

const deleteReview = (restaurantId, reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: { 
            'restaurantId' : restaurantId,
             reviewId
        }
        
    }
};

const deleteMenuDish = (restaurantId, menudishId) => {
    return {
        type: DELETE_MENUDISH_BY_ID,
        payload: { 
            'restaurantId' : restaurantId,
             menudishId
        }
        
    }
};

//----------------------------------------------------------------------------------------
// Add Booking to a Restaurant

export const addNewBookingThunk = (restaurantId, slotId, bookingDate) => async (dispatch) => {

    try {
        
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/${slotId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({bookingDate}),
          });
       
        if (response.ok) {
                     const data = await response.json();
                     
                     dispatch(addNewBooking(data));
                     dispatch(getslotsbyidDateThunk(restaurantId, bookingDate));
                    
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = await e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Get all Restaurants

export const getAllRestaurantsThunk = () => async (dispatch) => {

    try {
        const response = await csrfFetch("/api/restaurants/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(getAllRestaurants(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = await e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Get Restaurant by id

export const detailedRestaurantThunk = (id) => async (dispatch) => {

    try {
        const response = await csrfFetch(`/api/restaurants/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(getDetailedRestaurant(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//---------------------------------------------------------------------------------------
// Create a new Restaurant

export const createNewRestaurantThunk = (restaurant) => async (dispatch) => {

    try {
        const response = await csrfFetch("/api/restaurants/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(restaurant)
        });
        
        if(response.ok) {
            const data = await response.json();
            dispatch(createNewRestaurant(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};


//----------------------------------------------------------------------------------------
// Get all Restaurants owned by current logged in user

export const getCurrUserOwnedRestaurantsThunk = () => async (dispatch) => {

    try {   
        const response = await csrfFetch("/api/restaurants/current", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();        
            dispatch(getCurrUserOwnedRestaurants(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};


//----------------------------------------------------------------------------------------
// Delete a restaurant by id

export const deleteRestaurantThunk = (id) => async (dispatch) => {
    
    try {   
        const response = await csrfFetch(`/api/restaurants/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       
        if (response.ok) {
            const data = await response.json();
            dispatch(deleteRestaurant(id));

        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Delete a review by id

export const deleteReviewThunk = (restaurantId, reviewId) => async (dispatch) => {
    
    try {   
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/reviews/${reviewId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       
        if (response.ok) {
            const data = await response.json();
            dispatch(deleteReview(restaurantId, reviewId));
            //dispatch(getReviewsForRestaurantThunk(restaurantId));
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Delete a menudish by id

export const deleteMenuDishThunk = (restaurantId, menudishId) => async (dispatch) => {
   
    try {   
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/menudishes/${menudishId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       
        if (response.ok) {
            const data = await response.json();
            
            dispatch(deleteMenuDish(restaurantId, menudishId));
            //dispatch(getReviewsForRestaurantThunk(restaurantId));
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//------------------------------------------------------------------------------------
// Update a Restaurant

export const updateRestaurantThunk = (id, restaurant) => async(dispatch) => {
 
    try {
         
         const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(restaurant)
        };
        const response = await csrfFetch(`/api/restaurants/update/${id}`, options);
        
        if (response.ok) {
        
                const data = await response.json();
                dispatch(updateRestaurant(data));
                dispatch(getRestaurantImagesThunk(id));
                return data;
        } else {
                throw response;
        }
    } catch (e) {
        const errors =  e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Update a Restaurant Review

export const updateRestaurantReviewThunk = (restaurantId, review) => async(dispatch) => {
 
    try {
         
         const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        };
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/${review.id}`, options);
        
        if (response.ok) {
                const data = await response.json();
                dispatch(updateRestaurantReview(data));
                //dispatch(getReviewsForRestaurantThunk(restaurantId));
                return data;
        } else {
                throw response;
        }
    } catch (e) {
        const errors =  e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Update a Menu Dish

export const updateRestaurantMenudishThunk = (restaurantId, menudish) => async(dispatch) => {
 
    try {
         
         const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(menudish)
        };
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/menudishes/${menudish.id}`, options);
        
        if (response.ok) {
                const data = await response.json();
                dispatch(updateRestaurantMenudish(data));   
                //dispatch(getReviewsForRestaurantThunk(restaurantId));
                return data;
        } else {
                throw response;
        }
    } catch (e) {
        const errors =  e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Add Image to a Restaurant

export const addImageToRestaurantThunk = (restaurantId, image) => async (dispatch) => {
    try {
        
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image),
          });
        
        if (response.ok) {
                     const data = await response.json();
                     dispatch(addImageToRestaurant(restaurantId, image));
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = await e.json();
        return errors;
    }
};
//----------------------------------------------------------------------------------------
// Add Review to a Restaurant

export const addReviewToRestaurantThunk = (restaurantId, review) => async (dispatch) => {

    try {
        
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
          });
        
        if (response.ok) {
                     const data = await response.json();                
                     dispatch(addReviewToRestaurant(restaurantId,data.Reviews));
                     //dispatch(getReviewsForRestaurantThunk(restaurantId));
                     
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = await e.json();
        return errors;
    }
};
//----------------------------------------------------------------------------------------
// Update Restaurant Image 

export const updateRestaurantImageThunk = (restaurantId, id, image) => async (dispatch) => {

    try {
        
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/images/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image),
          });
        
        if (response.ok) {
                     const data = await response.json();
                     dispatch(updateRestaurantImage(restaurantId, id));
                     
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = await e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Add Holiday to a Restaurant

export const addHoildayToRestaurantThunk = (restaurantId, holiday) => async (dispatch) => {

    try {
        
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/holidays`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(holiday),
          });
       
        if (response.ok) {
                     const data = await response.json();
                     dispatch(addHoildayToRestaurant(restaurantId, holiday));
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = await e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Add Menudish to a Restaurant

export const addMenudishToRestaurantThunk = (restaurantId, menudish) => async (dispatch) => {

    try {
        
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/menudishes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menudish),
          });
       
        if (response.ok) {
                     const data = await response.json();
                     dispatch(addMenudishToRestaurant(data));
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = await e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Get Reviews of a restaurant by id

export const getReviewsForRestaurantThunk = (id) => async (dispatch) => {
    
    try {
        const response = await csrfFetch(`/api/restaurants/${id}/reviews`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const reviews = await response.json();
            dispatch(getReviewsForRestaurant(id,reviews));
            return reviews;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};
//----------------------------------------------------------------------------------------
// Get Images of a restaurant by id

export const getRestaurantImagesThunk = (id) => async (dispatch) => {
    
    try {
        
        const response = await csrfFetch(`/api/restaurants/${id}/images`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(getRestaurantImages(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Get Holidays of a restaurant by id

export const getHolidaysForRestaurantThunk = (id) => async (dispatch) => {
    
    try {
        const response = await csrfFetch(`/api/restaurants/${id}/holidays`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(getHolidaysForRestaurant(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Get Menudishes of a restaurant by id

export const getMenudishesForRestaurantThunk = (id) => async (dispatch) => {
    
    try {
        const response = await csrfFetch(`/api/restaurants/${id}/menudishes`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(getMenudishesForRestaurant(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Get open slots of a restaurant by id and booking date

export const getslotsbyidDateThunk = (id, date) => async (dispatch) => {
    
    try {
        
        const response = await csrfFetch(`/api/restaurants/${id}/slots/${date}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(getSlotsByIdDate(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//-----------------------------------------------------------------------------------------------------------------------------
// Restaurants Reducer

const initialState = {
    restaurants_arr: [],
    byId: {}
};

const restaurantsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {

        //--------------------------------------------------------------------------------------------------------------------
        case GET_ALL_RESTAURANTS: {
            newState.restaurants_arr = action.payload;

            for (let i = 0; i < action.payload.length; i++) {
                let restaurant = action.payload[i]
                newState.byId[restaurant.id] = restaurant
            }
            return newState;
        }
        
        //-------------------------------------------------------------------------------------------------------------------
        
        case GET_DETAILED_RESTAURANT: {
            //newState.restaurants_arr.id = action.payload
            const newArr = [...newState.restaurants_arr];
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                if(currRestaurant.id === action.payload.id){
                    newArr[i] = action.payload;
                    break;
                }
            }
            newState.restaurants_arr = newArr;
            newState.byId[action.payload.id] = action.payload
            return newState;
        }
        //-----------------------------------------------------------------------------------------------------------------
        
        case CREATE_NEW_RESTAURANT: {
            newState.restaurants_arr = [...newState.restaurants_arr, action.payload]
            newState.byId[action.payload.id] = action.payload
            return newState;
        }
        //-----------------------------------------------------------------------------------------------------------------

        case GET_CURRENT_USER_OWNED_RESTAURANTS: {
            const newById = {};
            const newArr = [...action.payload.Restaurants];
            newState.restaurants_arr = newArr;

            for (let restaurant of action.payload.Restaurants) {
                newById[restaurant.id] = restaurant
            }
            newState.byId = newById
            return newState;
        }
       // -----------------------------------------------------------------------------------------------------------------

        // case GET_CURRENT_USER_OWNED_RESTAURANTS: {
        //     const newById = {};
        //     const newArr = [...action.payload];
        //     newState.restaurants_arr = newArr;
        //     for (let restaurant of action.payload) {
        //         newById[restaurant.id] = restaurant
        //     }
        //     newState.byId = newById
        //     return newState;
        // }
        //-----------------------------------------------------------------------------------------------------------------
        
        case ADD_IMAGE_TO_RESTAURANT: {
            const newById = {};
            const RestaurantImages = [action.payload.RestaurantImages]
            
            let newArr = [...newState.restaurants_arr];
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                if(currRestaurant.id === action.payload.id){
                    if (!newArr[i].RestaurantImages) {
                        newArr[i] = {...newArr[i],  RestaurantImages: [action.payload.RestaurantImages] }
                        break;
                    } else {
                        newArr[i].RestaurantImages.push(action.payload.RestaurantImages)
                    }
                }
            }
            newState.restaurants_arr = newArr;
            
            if (!newState.byId[action.payload.id].RestaurantImages){
                newState.byId[action.payload.id] = {...newState.byId[action.payload.id], RestaurantImages: [action.payload.RestaurantImages]}
            } else {
                newState.byId[action.payload.id].RestaurantImages.push(action.payload.RestaurantImages) 
            }
            return newState;
        }
        
        //-----------------------------------------------------------------------------------------------------------------
        
        case ADD_REVIEW_TO_RESTAURANT: {
            
            const newById = {};
            const reviews = action.payload.reviews;
            
            let newArr = [...newState.restaurants_arr];
            let currRestaurant = {};
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                if(newArr[i].id === action.payload.id){
                  newArr[i].Reviews = reviews;
                  currRestaurant = newArr[i];
                  break;
                }
            }
            newState.restaurants_arr = JSON.parse(JSON.stringify(newArr));
            newState.byId[currRestaurant.id] = JSON.parse(JSON.stringify(currRestaurant))
            
            //if (!newState.byId[action.payload.id].Reviews){
            //    newState.byId[action.payload.id] = {...newState.byId[action.payload.id], Reviews: [action.payload.Reviews]}
            //} else {
            //    newState.byId[action.payload.id].Reviews.push(action.payload.Reviews) 
            //}
            return newState;
        }
        
        //----------------------------------------------------------------------------------------------------------------

        case ADD_MENUDISH_TO_RESTAURANT: {
            
            const newById = {...newState.byId};
            const newMenuDish = [action.payload.menudish]
            
            
            let newArr = [...newState.restaurants_arr];
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                if(currRestaurant.id === action.payload.id){
                    if (!newArr[i].MenuDishes) {
                        newArr[i] = {...newArr[i],  MenuDishes: [action.payload.menudish] }
                        break;
                    } else {
                        newArr[i].MenuDishes.push(action.payload.menudish)
                    }
                }
            }
            newState.restaurants_arr = JSON.parse(JSON.stringify(newArr))
            
            // if (!newState.byId[action.payload.menudish.restaurantId].MenuDishes){
            //     newState.byId[action.payload.menudish.restaurantId] = {...newState.byId[action.payload.menudish.restaurantId], MenuDishes: [action.payload.menudish]}
            // } else {
            //     newState.byId[action.payload.menudish.restaurantId].MenuDishes.push(action.payload.menudish) 
            // }
            if (!newById[action.payload.menudish.restaurantId].MenuDishes){
                newById[action.payload.menudish.restaurantId] = {...newById[action.payload.menudish.restaurantId], MenuDishes: [action.payload.menudish]}
            } else {
                newById[action.payload.menudish.restaurantId].MenuDishes.push(action.payload.menudish) 
            }
            newState.byId = JSON.parse(JSON.stringify(newById)) 
            return newState;
        }
        
        //newState.restaurants_arr = JSON.parse(JSON.stringify(newArr))
        //newState.byId = JSON.parse(JSON.stringify(newUpdatedId))----------------------------------------------------------------------------------------------------------------

            case ADD_BOOKING_TO_RESTAURANT: {
            
            const newById = {};
            const RestaurantBookings = [action.payload.Bookings]
            
            
            let newArr = [...newState.restaurants_arr];
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                
                if(currRestaurant.id == RestaurantBookings[0].restaurantId){
                    if (!newArr[i].RestaurantBookings) {
                        newArr[i] = {...newArr[i],  RestaurantBookings: RestaurantBookings}
                        break;
                    } else {
                        newArr[i].RestaurantBookings.push(RestaurantBookings[0])
                    }
                }
            }
            newState.restaurants_arr = newArr;

             if (!newState.byId[RestaurantBookings[0].restaurantId].RestaurantBookings){
                 newState.byId[RestaurantBookings[0].restaurantId] = {...newState.byId[RestaurantBookings[0].restaurantId], RestaurantBookings: RestaurantBookings}
             } else {

                 newState.byId[RestaurantBookings[0].restaurantId].RestaurantBookings.push(RestaurantBookings[0]) 
             }
            return newState;
        }
        
        //----------------------------------------------------------------------------------------------------------------
        
        case ADD_HOLIDAY_TO_RESTAURANT: {
            const newById = {};
            const Holidays = [action.payload.Holidays]
            
            
            let newArr = [...newState.restaurants_arr];
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                if(currRestaurant.id === action.payload.id){
                    if (!newArr[i].Holidays) {
                        newArr[i] = {...newArr[i],  Holidays: [action.payload.Holidays] }
                        break;
                    } else {
                        newArr[i].Holidays.push(action.payload.Holidays)
                    }
                }
            }
            newState.restaurants_arr = newArr;
            
            if (!newState.byId[action.payload.id].Holidays){
                newState.byId[action.payload.id] = {...newState.byId[action.payload.id], Holidays: [action.payload.Holidays]}
            } else {
                newState.byId[action.payload.id].Holidays.push(action.payload.Holidays) 
            }
            return newState;
        }
        
        //---------------------------------------------------------------------------------------------------------
        
        case GET_RESTAURANT_IMAGES: {
            let newArr = [...newState.restaurants_arr];
            
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                if(currRestaurant.id === action.payload.RestaurantImages[0].restaurantId){
                    newArr[i] = {...newArr[i], RestaurantImages: [action.payload.RestaurantImages]}
                }
            }
            newState.restaurants_arr = newArr;
            
            newState.byId[action.payload.RestaurantImages[0].restaurantId] = {...newState.byId[action.payload.RestaurantImages[0].restaurantId], RestaurantImages: [action.payload.RestaurantImages]}  
            return newState; 
        }
        
        //---------------------------------------------------------------------------------------------------------
        
        case GET_RESTAURANT_REVIEWS: {
            let newArr = [...newState.restaurants_arr];
            
            let restaurant = {};
             for(let i = 0; i < newState.restaurants_arr.length; i++){
                 let currRestaurant = newArr[i];
                 if(currRestaurant.id == action.payload.restaurantId){
                     //newArr[i] = {...newArr[i], RestaurantImages: [action.payload.RestaurantImages]}
                     newArr[i].Reviews = action.payload.reviews.Reviews
                     restaurant = newArr[i];
                     break;
                 }
             }
             newState.restaurants_arr = newArr;
            // newState.byId[action.payload.RestaurantImages[0].restaurantId] = {...newState.byId[action.payload.RestaurantImages[0].restaurantId], RestaurantImages: [action.payload.RestaurantImages]}  
            newState.byId[action.payload.restaurantId] = restaurant;
            return newState; 
        }
        
        //---------------------------------------------------------------------------------------------------------
        
        case DELETE_RESTAURANT: {
            const newById = {...newState.byId};
            delete newById[action.payload];
            newState.byId = newById
            
            const newRestaurants = newState.restaurants_arr.filter((restaurant) => {
                return restaurant.id !== action.payload;
            })
            
            newState.restaurants_arr = newRestaurants;
            return newState;
        }
        
        //---------------------------------------------------------------------------------------------------------
        
        case DELETE_REVIEW: {
           

            let newArr = [...newState.restaurants_arr]; 
            let currRestaurant = {}
            let newReviews = [];
            

            for(let i = 0; i < newState.restaurants_arr.length; i++){
                if (newArr[i].id == action.payload.restaurantId){
                    newReviews = newArr[i].Reviews.filter((review) => {
                        
                        return review.id != action.payload.reviewId;
                    })
                 
                  newArr[i].Reviews = newReviews
                  currRestaurant = newArr[i]
                  
                  break;
                }
            } 
            
            let newById = {...newState.byId};
            // delete newById[action.payload.restaurantId].Reviews;
            // newState.byId = newById
            newById[currRestaurant.id] = currRestaurant;
            newState.restaurants_arr = JSON.parse(JSON.stringify(newArr));
            newState.byId = JSON.parse(JSON.stringify(newById))
            
            return newState;
        }
        //---------------------------------------------------------------------------------------------------------
        
        case DELETE_MENUDISH_BY_ID: {
            

            let newArr = [...newState.restaurants_arr]; 
            let currRestaurant = {}
            let newMenuDishes = [];

            for(let i = 0; i < newState.restaurants_arr.length; i++){
                if (newArr[i].id == action.payload.restaurantId){
                    newMenuDishes = newArr[i].MenuDishes.filter((menudish) => {
                     
                        return menudish.id != action.payload.menudishId;
                    })
                  
                  newArr[i].MenuDishes = newMenuDishes
                  currRestaurant = newArr[i]
                  
                  break;
                }
            } 
            
            let newById = {...newState.byId};
            // delete newById[action.payload.restaurantId].Reviews;
            // newState.byId = newById
            for ( let i = 0 ; i <  newById[action.payload.restaurantId].MenuDishes.length ; i++ ) {
                if ( action.payload.menudishId == newById[action.payload.restaurantId].MenuDishes[i].id) { 
                    newById[action.payload.restaurantId].MenuDishes.splice(i,1);
                    break;
                }
            }
            //delete newById[action.payload.restaurantId].MenuDishes[action.payload.menudishId]; 
           

            newState.restaurants_arr = JSON.parse(JSON.stringify(newArr));
            newState.byId = JSON.parse(JSON.stringify(newById))
            
            return newState;
        }
    
        //---------------------------------------------------------------------------------------------------------
        
        case GET_RESTAURANT_OPEN_SLOTS: {   
            const newById = {};
         
            
            let newArr = [...newState.restaurants_arr];
            if (action.payload.data.OpenSlots.length) {
                for(let i = 0; i < newState.restaurants_arr.length; i++){
                    let currRestaurant = newArr[i];
                    if(currRestaurant.id === action.payload.data.OpenSlots[0].restaurantId){
                        if (!newArr[i].OpenSlots) {
                            newArr[i] = {...newArr[i],  OpenSlots: action.payload.data.OpenSlots }
                        } 
                        
                    }
                }
                newState.byId[action.payload.data.OpenSlots[0].restaurantId] = {...newState.byId[action.payload.data.OpenSlots[0].restaurantId], OpenSlots: action.payload.data.OpenSlots }  
            }      
            newState.restaurants_arr = newArr; 
            return newState;
        }
        
        //---------------------------------------------------------------------------------------------------------
        
        case UPDATE_RESTAURANT: {
            
            const newArr = [...newState.restaurants_arr];
            const newUpdatedId = {...newState.byId};
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                if(currRestaurant.id === action.payload.id){
                    newArr[i] = action.payload;
                    break;
                }
            }
            newState.restaurants_arr = newArr;
            
            newUpdatedId[action.payload.id] = action.payload;
            newState.byId = newUpdatedId
            return newState;
        }
        
        //---------------------------------------------------------------------------------------------------------
        
        case UPDATE_RESTAURANT_REVIEW: {
           
            const newArr = [...newState.restaurants_arr];
            const newUpdatedId = {...newState.byId};
            let currRestaurant = {}
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                currRestaurant = newArr[i];
                if(currRestaurant.id === action.payload.restaurantId){
                    let reviewObj = currRestaurant.Reviews.find((review)=>{
                        return review.id == action.payload.id
                    });
                    reviewObj.review = action.payload.review
                    reviewObj.stars = action.payload.stars
                    newArr[i] = currRestaurant;
                    break;
                }
            }
            newUpdatedId[action.payload.restaurantId] = currRestaurant;
            newState.restaurants_arr = JSON.parse(JSON.stringify(newArr))
            newState.byId = JSON.parse(JSON.stringify(newUpdatedId))
            return newState;
        }
        
        //---------------------------------------------------------------------------------------------------------

        case UPDATE_RESTAURANT_MENUDISH: {
            
            const newArr = [...newState.restaurants_arr];
            const newUpdatedId = {...newState.byId};

            let currRestaurant = {}
            if ( newState.restaurants_arr.length ) {
                for(let i = 0; i < newState.restaurants_arr.length; i++){
                    currRestaurant = newArr[i];
                    if(currRestaurant.id === action.payload.restaurantId){
                        let menudishObj = currRestaurant.MenuDishes.find((menudish)=>{
                            return menudish.id == action.payload.id
                        });
                        menudishObj.dishName = action.payload.dishName
                        menudishObj.dishCategory = action.payload.dishCategory
                        menudishObj.dishIngredients = action.payload.dishIngredients
                        menudishObj.dishPrice = action.payload.dishPrice
                        menudishObj.dishCalories = action.payload.dishCalories
                        menudishObj.dishAllergies = action.payload.dishAllergies
                        menudishObj.spiceLevel = action.payload.spiceLevel
                        
                        newArr[i] = currRestaurant;
                        break;
                    }
                }
                newUpdatedId[action.payload.restaurantId] = currRestaurant;
            } 
                // currRestaurant = newUpdatedId[action.payload.restaurantId]
               
                let menudishObj = newUpdatedId[action.payload.menudish.restaurantId].MenuDishes.find((menudish)=>{
                    return menudish.id == action.payload.menudish.id
                });
                menudishObj.dishName = action.payload.menudish.dishName
                menudishObj.dishCategory = action.payload.menudish.dishCategory
                menudishObj.dishIngredients = action.payload.menudish.dishIngredients
                menudishObj.dishPrice = action.payload.menudish.dishPrice
                menudishObj.dishCalories = action.payload.menudish.dishCalories
                menudishObj.dishAllergies = action.payload.menudish.dishAllergies
                menudishObj.spiceLevel = action.payload.menudish.spiceLevel
                
            
            newState.restaurants_arr = JSON.parse(JSON.stringify(newArr))
            newState.byId = JSON.parse(JSON.stringify(newUpdatedId))
            return newState; 
        }

        //---------------------------------------------------------------------------------------------------------
        
        case UPDATE_RESTAURANT_IMAGE: {
            const newById = {};
           
            const image = [action.payload.image]
          
            
            let newArr = [...newState.restaurants_arr];
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                if(currRestaurant.id === action.payload.id){
                    if (!newArr[i].RestaurantImages) {
                        newArr[i] = {...newArr[i],  RestaurantImages: [action.payload.RestaurantImages] }
                        break;
                    } else {
                        newArr[i].RestaurantImages.push(action.payload.RestaurantImages)
                    }
                }
            }
            newState.restaurants_arr = newArr;
           
            if (!newState.byId[action.payload.id].RestaurantImages){
                newState.byId[action.payload.id] = {...newState.byId[action.payload.id], RestaurantImages: [action.payload.RestaurantImages]}
            } else {
                newState.byId[action.payload.id].RestaurantImages.push(action.payload.RestaurantImages) 
            }
            return newState;
        }

        default:
            return newState;
    }
};

export default restaurantsReducer;