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

const addMenudishToRestaurant = (id, menudish) => {
    return {
        type: ADD_MENUDISH_TO_RESTAURANT,
        payload: { id, menudish } 
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

const updateRestaurantReview = (id, review) => {
    return {
        type: UPDATE_RESTAURANT_REVIEW,
        payload: { id, review }
    }
};

const updateRestaurantMenudish = (id, menudish) => {
    return {
        type: UPDATE_RESTAURANT_MENUDISH,
        payload: { id, menudish }
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

//----------------------------------------------------------------------------------------
// Add Booking to a Restaurant

export const addNewBookingThunk = (restaurantId, slotId, bookingDate) => async (dispatch) => {

    try {
        console.log(".....inside add New Booking thunk......")
        console.log("...restaurantId, slotId, booking....", restaurantId, slotId, bookingDate)
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/${slotId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({bookingDate}),
          });
        console.log(".............response in thunk....", response)
        if (response.ok) {
                     const data = await response.json();
                     console.log(".........data.....", data)
                     dispatch(addNewBooking(data));
                     dispatch(getslotsbyidDateThunk(restaurantId, bookingDate));
                     console.log("SUCCESSFULL RETURN FROM DISPATCH")
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        console.log('eeeeeeeeeeeee', e)
        const errors = await e.json();
        console.log(",,,,,,,,,,,,,,,,errors......", errors)
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
        const errors = e.json();
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
        console.log(".....response inside thunk", response)
        if(response.ok) {
            const data = await response.json();
            console.log("......data.......", data)
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
    console.log("......inside delete thunk........")
    try {   
        const response = await csrfFetch(`/api/restaurants/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       console.log(".....response....", response)
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
    console.log("......inside delete review thunk........")
    console.log(".....restaurantId, reviewId...", restaurantId, typeof restaurantId,reviewId, typeof reviewId);
    try {   
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/reviews/${reviewId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       console.log(".....response....", response)
        if (response.ok) {
            const data = await response.json();
            console.log("....data before dispatch...",data)
            console.log("..initial state..",initialState)
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


//------------------------------------------------------------------------------------
// Update a Restaurant

export const updateRestaurantThunk = (id, restaurant) => async(dispatch) => {
 
    try {
         //console.log('...................reached edit thunk............')
         //console.log('$$$$$$$$$$$$$$$$$ . id, restaurant......',id, restaurant)
         const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(restaurant)
        };
        const response = await csrfFetch(`/api/restaurants/update/${id}`, options);
        console.log('&&&&&&&&&&&&&&response', response)
        if (response.ok) {
            console.log('&&&&&&&&&&&&&&response', response)
                const data = await response.json();
                console.log('&&&&&&&&&&&&&&data', data)
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
// Add Image to a Restaurant

export const addImageToRestaurantThunk = (restaurantId, image) => async (dispatch) => {

    try {
        
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image),
          });
        console.log(".............response in thunk....", response)
        if (response.ok) {
                     const data = await response.json();
                     console.log(".........data.....", data)
                     dispatch(addImageToRestaurant(restaurantId, image));
                     console.log("SUCCESSFULL RETURN FROM DISPATCH")
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        console.log('eeeeeeeeeeeee', e)
        const errors = await e.json();
        console.log(",,,,,,,,,,,,,,,,errors......", errors)
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
        console.log(".............response in thunk....", response)
        if (response.ok) {
                     const data = await response.json();
                     console.log(".........data.....", data)
                     dispatch(addReviewToRestaurant(restaurantId,data.Reviews));
                     //dispatch(getReviewsForRestaurantThunk(restaurantId));
                     console.log("SUCCESSFULL RETURN FROM DISPATCH")
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        console.log('eeeeeeeeeeeee', e)
        const errors = await e.json();
        console.log(",,,,,,,,,,,,,,,,errors......", errors)
        return errors;
    }
};
//----------------------------------------------------------------------------------------
// Update Restaurant Image 

export const updateRestaurantImageThunk = (restaurantId, id, image) => async (dispatch) => {

    try {
        console.log("......inside thunk.....");
        const response = await csrfFetch(`/api/restaurants/${restaurantId}/images/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image),
          });
        console.log(".............response in thunk....", response)
        if (response.ok) {
                     const data = await response.json();
                     console.log(".........data.....", data)
                     dispatch(updateRestaurantImage(restaurantId, id));
                     console.log("SUCCESSFULL RETURN FROM DISPATCH")
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        console.log('eeeeeeeeeeeee', e)
        const errors = await e.json();
        console.log(",,,,,,,,,,,,,,,,errors......", errors)
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
        console.log(".............response in thunk....", response)
        if (response.ok) {
                     const data = await response.json();
                     console.log(".........data.....", data)
                     dispatch(addHoildayToRestaurant(restaurantId, holiday));
                     console.log("SUCCESSFULL RETURN FROM DISPATCH")
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        console.log('eeeeeeeeeeeee', e)
        const errors = await e.json();
        console.log(",,,,,,,,,,,,,,,,errors......", errors)
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
        console.log(".............response in thunk....", response)
        if (response.ok) {
                     const data = await response.json();
                     console.log(".........data.....", data)
                     dispatch(addMenudishToRestaurant(restaurantId, menudish));
                     console.log("SUCCESSFULL RETURN FROM DISPATCH")
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        console.log('eeeeeeeeeeeee', e)
        const errors = await e.json();
        console.log(",,,,,,,,,,,,,,,,errors......", errors)
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
        console.log("....inside get images thunk,,,,") 
        const response = await csrfFetch(`/api/restaurants/${id}/images`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log("....response!!!!!!!!!!!!!!!!.....", response)
        if (response.ok) {
            const data = await response.json();
            console.log("......data.......", data)
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
        console.log("......inside get slots by id date thunk......")
        console.log("...id, date.......",id, date)
        const response = await csrfFetch(`/api/restaurants/${id}/slots/${date}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log(".......response.......", response);
        if (response.ok) {
            const data = await response.json();
            console.log("................data before dispatch....", data)
            dispatch(getSlotsByIdDate(data));
            console.log(".....data.....", data)
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
            console.log("inside new restaurant reducer........", action.payload)
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
        //-----------------------------------------------------------------------------------------------------------------
        
        case ADD_IMAGE_TO_RESTAURANT: {
            console.log(".......inside...add image thunk....")
            const newById = {};
            const RestaurantImages = [action.payload.RestaurantImages]
            console.log("....RestaurantImages...", RestaurantImages)
            
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
            console.log(".......inside...add review thunk....")
            const newById = {};
            const reviews = action.payload.reviews;
            console.log("....Reviews...", reviews)
            
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

            case ADD_BOOKING_TO_RESTAURANT: {
            console.log(".......inside...add booking reducer ....")
            const newById = {};
            const RestaurantBookings = [action.payload.Bookings]
            console.log("....RestaurantBookings...", RestaurantBookings)
            
            let newArr = [...newState.restaurants_arr];
            for(let i = 0; i < newState.restaurants_arr.length; i++){
                let currRestaurant = newArr[i];
                console.log("currRestaurant", currRestaurant);
                console.log("RestaurantBookings[0].restaurantId", RestaurantBookings[0].restaurantId);
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
            console.log("....Holidays...", Holidays)
            
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
            console.log("....inside get restaurant images reducer...", action.payload)
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
            console.log("....inside get restaurant reviews reducer...", action.payload)
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
            console.log("INSIDE DELTE REVIEW REDUCER");
            console.log("... prev state ... ", state)
            console.log(".......action.payload.....", action.payload)

            let newArr = [...newState.restaurants_arr]; 
            let currRestaurant = {}
            let newReviews = [];
            //for(let i = 0; i < newState.restaurants_arr.length; i++){
            //    currRestaurant = newArr[i];
            //    console.log("....currRestaurant....", currRestaurant);
            //    if (currRestaurant.id == action.payload.restaurantId){
            //        newReviews = currRestaurant.Reviews.filter((review) => {
            //            console.log("...review.id", review.id)
            //            review.id != action.payload.reviewId
            //           console.log("....newReviews...", newReviews);
            //        })
            //    }
            //    currRestaurant.Reviews = newReviews
            //    console.log("....currRestaurant.Reviews...", currRestaurant.Reviews);
            //} 

            for(let i = 0; i < newState.restaurants_arr.length; i++){
                if (newArr[i].id == action.payload.restaurantId){
                    newReviews = newArr[i].Reviews.filter((review) => {
                        console.log("...review.id", review.id)
                        console.log("...action.payload.reviewId",action.payload.reviewId)
                        return review.id != action.payload.reviewId;
                    })
                  console.log("....newReviews...", newReviews);
                  newArr[i].Reviews = newReviews
                  currRestaurant = newArr[i]
                  console.log("....currRestaurant.Reviews...", currRestaurant.Reviews);
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
        
        case GET_RESTAURANT_OPEN_SLOTS: {   
            const newById = {};
            console.log("......inside...open slots reducer.....")
            console.log("....action.payload...", action.payload.data.OpenSlots)
            
            let newArr = [...newState.restaurants_arr];
            if (action.payload.data.OpenSlots.length) {
                for(let i = 0; i < newState.restaurants_arr.length; i++){
                    let currRestaurant = newArr[i];
                    if(currRestaurant.id === action.payload.data.OpenSlots[0].restaurantId){
                        if (!newArr[i].OpenSlots) {
                            newArr[i] = {...newArr[i],  OpenSlots: action.payload.data.OpenSlots }
                        } 
                        console.log("....newArr.....")
                    }
                }
                newState.byId[action.payload.data.OpenSlots[0].restaurantId] = {...newState.byId[action.payload.data.OpenSlots[0].restaurantId], OpenSlots: action.payload.data.OpenSlots }  
            }      
            newState.restaurants_arr = newArr; 
            return newState;
        }
        
        //---------------------------------------------------------------------------------------------------------
        
        case UPDATE_RESTAURANT: {
            console.log(".....inside reducer....", action.payload);
            console.log("....action.payload...", action.payload)
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
        
        case UPDATE_RESTAURANT_IMAGE: {
            const newById = {};
            console.log(".....payload....", action.payload)
            const image = [action.payload.image]
            console.log("....RestaurantImages...", image)
            
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