import { csrfFetch } from "./csrf";

//Action Type
const GET_ALL_BOOKINGS = "bookings/GET_ALL_BOOKINGS"
const GET_CURRENT_USER_BOOKINGS = "bookings/GET_CURRENT_USER_BOOKINGS";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

// Action Creator
const deleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        payload: {bookingId}
    }
};

const getCurrentUserBookings = (userId) => {
    return {
        type: GET_CURRENT_USER_BOOKINGS,
        payload: { userId } 
    }
};

const getAllBookings = (bookings) => {
    return {
        type: GET_ALL_BOOKINGS,
        payload: {bookings}
    }
}

//-------------------------------------------------------------------------------------------------
// Get all Bookings  

export const getAllBookingsThunk = () => async (dispatch) => {

    try {
        const response = await csrfFetch("/api/bookings/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log("....response in thunk after accessing database", response)
        if (response.ok) {
            const data = await response.json();
            console.log("data before dispatch", data)
            dispatch(getAllBookings(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        console.log("...error in catch..", e)
        const errors = await e.json();
        return errors;
    }
};

//-------------------------------------------------------------------------------------------------
// Get all of the Current User's Bookings  

export const  getCurrentUserBookingsThunk = (userId) => async (dispatch) => {
    
    try {
        const response = await fetch(`/api/bookings/current`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(getCurrentUserBookings(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//-------------------------------------------------------------------------------------------------

// Delete a booking by id

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    console.log("......inside delete thunk........")
    try {   
        const response = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       console.log(".....response....", response)
        if (response.ok) {
            const data = await response.json();
            dispatch(deleteBooking(bookingId));

        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// State Object
const initialState = {
    bookings_arr: [],
    byId: {}
};

// Bookings Reducer
const bookingsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
    
        case GET_ALL_BOOKINGS: {
            console.log("...action.payload...", action.payload);
            newState.bookings_arr = action.payload;

            for (let i = 0; i < action.payload.length; i++) {
                let booking = action.payload[i]
                newState.byId[booking.id] = booking
            }
            return newState;
        }

        case GET_CURRENT_USER_BOOKINGS: {
            const newById = {};
            const newArr = [...action.payload.userId.Bookings];
            newState.bookings_arr = newArr;

            for (let booking of action.payload.userId.Bookings) {
                newById[booking.id] = booking
            }
            newState.byId = newById
            return newState;
        }

        case DELETE_BOOKING: {
            const newById = {...newState.byId};
            console.log("....newById....", newById)
            console.log("...action.payload...", action.payload.bookingId)
            delete newById[action.payload];
            console.log("....newById after delete....", newById)
            newState.byId = newById
            const newBookings = newState.bookings_arr.filter((booking) => {
                return booking.id !== action.payload.bookingId;
            })
            console.log("....newBookings.....", newBookings)
            
            newState.bookings_arr = newBookings;
            return newState;
        }


    default:
      return newState;
  }
};

export default bookingsReducer;