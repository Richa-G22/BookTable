import "./EditReviewModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantReviewThunk } from "../../redux/restaurants";
import { useModal } from '../../context/Modal';

const EditReviewModal = ({ review }) => {
    const user = useSelector((state) => state.session.user);
    console.log("...review in props", review)
    const dispatch = useDispatch();
    const currentRestaurant = useSelector((state) => state.restaurants.byId[review.restaurantId]);
    console.log("....currentRestaurant....", currentRestaurant)
    const currentReview = currentRestaurant.Reviews.filter((rev) => rev.id == review.id);
    console.log("....currentReview....", currentReview);
    const { closeModal } = useModal();
    //const [reviewMsg, setReviewMsg] = useState(currentReview ? currentReview.review : reviewMsg);
    //const [stars, setStars] = useState(currentReview ? currentReview.stars : stars);
    const [reviewMsg, setReviewMsg] = useState('');
    const [stars, setStars] = useState(1);
    //const [error, setError] = useState({});
    //const [error, setError] = useState('');
    let foundError = false;


    if (!currentRestaurant) {
        return <h2>Restaurant not found!!</h2>
    }

    if (!currentReview) {
        return <h2>Review to be edited not found!!</h2>
    }

    const validate = () => {
        foundError = false;
        //setError({});
        console.log('.......inside validate........')

        if (!reviewMsg.trim()) {
            foundError = true;
            //setError((errors) => ({ ...errors, reviewMsg: "Review is required" }));
            console.log('........review.....', reviewMsg, foundError);
        }

        if (!stars) {
            foundError = true;
            //setError((errors) => ({ ...errors, stars: "Stars are required" }));
            console.log('........stars.....', stars, foundError);
        }
    };

    const handleSubmit = async (e) => {
        console.log('..........inside handle submit..........');
        e.preventDefault();
        console.log('.........moving on to validate function..........');
        validate();
        //console.log('..........errors after validate..........', errors)
        console.log("......foundError.....", foundError)
        review.review = reviewMsg
        review.stars = stars
        try {
            if (!foundError) {
                const updatedReview = await dispatch(
                    updateRestaurantReviewThunk(currentRestaurant.id,review)

                ).catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) {
             //           setError((errors) => ({ ...errors, ...data.errors }));
                    }
                })

            }
        } catch (error) {
            const data = await error.json();
            console.log('$$$$$$$$$$data', data)
            if (data.errors) {
              //  setError((errors) => ({ ...errors, ...data.errors }));
            }
        };
        closeModal();
    };

    return (
        <div className="review-modal">
        <h3 style={{ paddingLeft: "0.25em", alignItems: "center", justifyContent: "center" }}>Please rate our food & service!</h3>
        {/* <p className="error">{error}</p> */}
        <textarea
            style={{ width: "100%", border: "solid 2px black" }}
            defaultValue={review.review}
            onChange={(e) => {
               // setError({})
                setReviewMsg(e.target.value);
            }}
            placeholder="Updated review here..."
            rows={10}
        ></textarea>
        <div style={{ display: "flex", alignItems: "center" }}>
            <div className="starcss">
                <input
                    type="radio"
                    id="star5"
                    name="rate"
                    defaultValue={review.stars}
                    onChange={() => setStars(5)}
                />
                <label htmlFor="star5" title="text">
                    5 stars
                </label>
                <input
                    type="radio"
                    id="star4"
                    name="rate"
                    defaultvalue={review.stars}
                    onChange={() => setStars(4)}
                />
                <label htmlFor="star4" title="text">
                    4 stars
                </label>
                <input
                    type="radio"
                    id="star3"
                    name="rate"
                    defaultvalue={review.stars}
                    onChange={() => setStars(3)}
                />
                <label htmlFor="star3" title="text">
                    3 stars
                </label>
                <input
                    type="radio"
                    id="star2"
                    name="rate"
                    defaultvalue={review.stars}
                    onChange={() => setStars(2)}
                />
                <label htmlFor="star2" title="text">
                    2 stars
                </label>
                <input
                    type="radio"
                    id="star1"
                    name="rate"
                    defaultvalue={review.stars}
                    onChange={() => setStars(1)}
                />
                <label htmlFor="star1" title="text">
                    1 star
                </label>
            </div>
            Stars
        </div>

        <button
            className="submit-review-btn"
            disabled={review.length < 10 || stars < 1}
            onClick={handleSubmit}
        >
            Edit Review
        </button>
    </div>
);
};

export default EditReviewModal;