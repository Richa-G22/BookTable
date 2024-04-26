import { csrfFetch } from "./csrf";
//Action Type
const GET_RESTAURANT_REVIEWS = "reviews/GET_RESTAURANT_REVIEWS";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Action Creator
const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
};

const getReviewsForRestaurant = (id) => {
    return {
        type: GET_RESTAURANT_REVIEWS,
        payload: { id } 
    }
};

//-------------------------------------------------------------------------------------------------
// Get Reviews of a restaurant by id

export const getReviewsForRestaurantThunk = (id) => async (dispatch) => {
    
    try {
        const response = await fetch(`/api/restaurants/${id}/reviews`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(getReviewsForRestaurant(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};
// export const getReviewsForRestaurantThunk = (id) => async (dispatch) => {
    
//     try {
//         const response = await fetch(`/api/reviews/${id}/`, {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//         });
        
//         if (response.ok) {
//             const data = await response.json();
//             dispatch(getReviewsForRestaurant(data));
//             return data;
//         } else {
//             throw response;
//         }
//     } catch (e) {
//         const errors = e.json();
//         return errors;
//     }
// };
//-------------------------------------------------------------------------------------------------


// export const deleteReviewThunk = (reviewId) => async (dispatch) => {
//   console.log('.....inside delete thunk....');
//   console.log('.....reviewId.....', reviewId);
//   const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: "DELETE",
//   });
//   dispatch(deleteReview(reviewId));
//   return response;
// };

// State Object
const initialState = {
    reviews_arr: [],
    byId: {}
};

// Reviews Reducer
const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
    case GET_RESTAURANT_REVIEWS: {
        console.log("inside review reducer", action.payload)
        const newArr = [...newState.reviews_arr];
            newState.reviews_arr = action.payload;

            // for (let i = 0; i < action.payload.length; i++) {
            //     let restaurant = action.payload[i]
            //     newState.byId[restaurant.id] = restaurant
            // }
            return newState;
        }
    // case DELETE_REVIEW: {
    //     console.log('.......inside delete Reducer........');
    //     console.log('......newState before delete Review......', newState);
    //     delete newState[action.payload.reviewId];
    //     console.log('......newState after delete Review......', newState);
    //     return newState;
    // }

    default:
      return newState;
  }
};

export default reviewsReducer;