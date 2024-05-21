import { csrfFetch } from "./csrf";

//Action Type
// const DELETE_MENUDISH_BY_ID = "reviews/DELETE_MENUDISH_BY_ID";


// // Action Creator
// const deleteMenuDishById = (menudishId) => {
//     return {
//         type: DELETE_MENUDISH_BY_ID,
//         payload: menudishId
//     }
// };




//-------------------------------------------------------------------------------------------------
//Delete a menudish by id

// export const deleteReviewByIdThunk = (reviewId) => async (dispatch) => {
//     console.log("......inside delete review thunk........")
//     console.log(".....reviewId...", reviewId, typeof reviewId);
//     try {   
//         const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//         });
//        console.log(".....response....", response)
//         if (response.ok) {
//             const data = await response.json();
//             console.log("....data before dispatch...",data)
//             console.log("..initial state..",initialState)
//             dispatch(deleteReviewById(reviewId));
//             //dispatch(getReviewsForRestaurantThunk(restaurantId));
//         } else {
//             throw response;
//         }
//     } catch (e) {
//         const errors = e.json();
//         return errors;
//     }
// };



// // State Object
const initialState = {
    menudishes_arr: [],
    byId: {}
};

// // Reviews Reducer
const menudishesReducer = (state = initialState, action) => {
    let newState = { ...state };

//     switch (action.type) {

//         case DELETE_REVIEW_BY_ID: {
//             console.log('.......inside delete Reducer........');
//             console.log('......newState before delete Review......', newState);
//             console.log("....action.payload...", action.payload);
//             const newById = {...newState.byId};
//                 delete newById[action.payload];
//                 newState.byId = newById
                
//                 const newReviews = newState.reviews_arr.filter((review) => {
//                     return review.id !== action.payload;
//                 })
                
//                 newState.reviews_arr = newReviews;
//             return newState;
//         }

       

//     default:
//       return newState;
//   }
};

export default menudishesReducer;