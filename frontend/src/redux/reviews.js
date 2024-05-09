import { csrfFetch } from "./csrf";

//Action Type
const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS"
const GET_CURRENT_USER_REVIEWS = "reviews/GET_CURRENT_USER_REVIEWS";
const GET_RESTAURANT_REVIEWS = "reviews/GET_RESTAURANT_REVIEWS";
const DELETE_REVIEW_BY_ID = "reviews/DELETE_REVIEW_BY_ID";
const UPDATE_REVIEW = "reviews/UPDATE_REVIEW";

// Action Creator
const deleteReviewById = (reviewId) => {
    return {
        type: DELETE_REVIEW_BY_ID,
        payload: reviewId
    }
};

const getReviewsForRestaurant = (id) => {
    return {
        type: GET_RESTAURANT_REVIEWS,
        payload: { id } 
    }
};

const getCurrentUserReviews = (userId) => {
    return {
        type: GET_CURRENT_USER_REVIEWS,
        payload: { userId } 
    }
};

const getAllReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        payload: {reviews}
    }
};

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        payload: {review}
    }
};

//-------------------------------------------------------------------------------------------------
// Get all Reviews

export const getAllReviewsThunk = () => async (dispatch) => {
    
    try {
        const response = await csrfFetch("/api/reviews/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log("....response in thunk after accessing database", response)
        if (response.ok) {
            const data = await response.json();
            console.log("data before dispatch", data)
            dispatch(getAllReviews(data));
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
// Get all of the Current User's Reviews 

export const  getCurrentUserReviewsThunk = (userId) => async (dispatch) => {
    
    try {
        const response = await fetch(`/api/reviews/current`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(getCurrentUserReviews(data));
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
//Delete a review by id

export const deleteReviewByIdThunk = (reviewId) => async (dispatch) => {
    console.log("......inside delete review thunk........")
    console.log(".....reviewId...", reviewId, typeof reviewId);
    try {   
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       console.log(".....response....", response)
        if (response.ok) {
            const data = await response.json();
            console.log("....data before dispatch...",data)
            console.log("..initial state..",initialState)
            dispatch(deleteReviewById(reviewId));
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
// Update a Review

export const updateReviewThunk = (review) => async(dispatch) => {
 
    try {
         console.log('...................reached edit thunk............')
        //  console.log('$$$$$$$$$$$$$$$$$  reVIEW......' review)
         const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        };
        const response = await csrfFetch(`/api/reviews/${review.id}`, options);
        console.log('&&&&&&&&&&&&&&response', response)
        if (response.ok) {
                const data = await response.json();
                console.log('&&&&&&&&&&&&&&data', data)
                dispatch(updateReview(data));
                // console.log("going to fetech all reviews again");
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
        case GET_ALL_REVIEWS: {
            console.log("...action.payload...", action.payload);
            newState.reviews_arr = action.payload;

            for (let i = 0; i < action.payload.length; i++) {
                let review = action.payload[i]
                newState.byId[review.id] = review
            }
            return newState;
        }

        case GET_CURRENT_USER_REVIEWS: {
            const newById = {};
            const newArr = [...action.payload.userId.Reviews];
            newState.reviews_arr = newArr;

            for (let review of action.payload.userId.Reviews) {
                newById[review.id] = review
            }
            newState.byId = newById
            return newState;
        }

        case DELETE_REVIEW_BY_ID: {
            console.log('.......inside delete Reducer........');
            console.log('......newState before delete Review......', newState);
            console.log("....action.payload...", action.payload);
            const newById = {...newState.byId};
                delete newById[action.payload];
                newState.byId = newById
                
                const newReviews = newState.reviews_arr.filter((review) => {
                    return review.id !== action.payload;
                })
                
                newState.reviews_arr = newReviews;
            return newState;
        }

        case UPDATE_REVIEW: {
            console.log(".....inside reducer....", action.payload.review);
            console.log("....action.payload...", action.payload)
            const newArr = [...newState.reviews_arr];
            const newUpdatedId = {...newState.byId};
            for(let i = 0; i < newState.reviews_arr.length; i++){
                let currReview = newArr[i];
                if(currReview.id === action.payload.review.id){
                    newArr[i] = action.payload.review;
                    break;
                }
            }
            newState.reviews_arr = newArr;
            
            newUpdatedId[action.payload.review.id] = action.payload.review;
            newState.byId = newUpdatedId
            return newState;
        }

    default:
      return newState;
  }
};

export default reviewsReducer;