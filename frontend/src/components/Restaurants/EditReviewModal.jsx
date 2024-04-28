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
    //const [reviewMsg, setReviewMsg] = useState('');
    const [reviewMsg, setReviewMsg] = useState(review.review);
    const [stars, setStars] = useState(review.stars);
    //const [star1, setStar1] = useState(1);
    //const [star2, setStar2] = useState(2);
    //const [star3, setStar3] = useState(3);
    //const [star4, setStar4] = useState(4);
    //const [star5, setStar5] = useState(5);
    //const [error, setError] = useState({});
    //const [error, setError] = useState('');
    let foundError = false;

    let star1Value = false;
    let star2Value = false;
    let star3Value = false;
    let star4Value = false;
    let star5Value = false;

    if ( stars == 5 ) {
      star5Value = true;
    }
    else if ( stars == 4 ) {
      star4Value = true;
    }
    else if ( stars == 3 ) {
      star3Value = true;
    }
    else if ( stars == 2 ) {
      star2Value = true;
    }
    else if ( stars == 1 ) {
      star1Value = true;
    }

    console.log("star5 ",star5Value )
    console.log("star4 ",star4Value )
    console.log("star3 ",star3Value )
    console.log("star2 ",star2Value )
    console.log("star1 ",star1Value )

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

        console.log("review Msg",reviewMsg)

        if (!reviewMsg.trim().length) {
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
        //review.review = reviewMsg
        //review.stars = stars
        try {
            if (!foundError) {
                review.review = reviewMsg
                review.stars = stars
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
                    // defaultValue={review.stars}
                    //defaultValue={review.star5}
                    //defaultValue={star5Value}
                    // onChange={() => setStars(5)}
                    checked={star5Value}
                    value={stars}
                    //onChange={() => setStars(5)}
                    //onChange={(e) => {e.target.value=!star5Value;setStars(5)}}
                    onChange={() => {setStars(5)}}
                />
                <label htmlFor="star5" title="text">
                    5 stars
                </label>
                <input
                    type="radio"
                    id="star4"
                    name="rate"
                    // defaultvalue={review.stars}
                    // onChange={() => setStars(4)}
                    //defaultValue={review.star4}
                    //defaultValue={star4Value}
                    checked={star4Value}
                    value={stars}
                    //onChange={() => setStars(4)}
                    //onChange={(e) => {e.target.value=!star4Value;setStars(4)}}
                    onChange={() => {setStars(4)}}
                />
                <label htmlFor="star4" title="text">
                    4 stars
                </label>
                <input
                    type="radio"
                    id="star3"
                    name="rate"
                    // defaultvalue={review.stars}
                    //defaultValue={review.star3}
                    // onChange={() => setStars(3)}
                    //defaultValue={star3Value}
                    value={stars}
                    checked={star3Value}
                    //onChange={() => setStars(3)}
                    //onChange={(e) => {e.target.value=!star3Value;setStars(3)}}
                    onChange={() => {setStars(3)}}
                />
                <label htmlFor="star3" title="text">
                    3 stars
                </label>
                <input
                    type="radio"
                    id="star2"
                    name="rate"
                    // defaultvalue={review.stars}
                    // onChange={() => setStars(2)}
                    //defaultValue={review.star2}
                    //defaultValue={star2Value}
                    value={stars}
                    checked={star2Value}
                    //onChange={() => setStars(2)}
                    //onChange={(e) => {e.target.value=!star2Value;setStars(2)}}
                    onChange={() => {setStars(2)}}
                />
                <label htmlFor="star2" title="text">
                    2 stars
                </label>
                <input
                    type="radio"
                    id="star1"
                    name="rate"
                    // defaultvalue={review.stars}
                    // onChange={() => setStars(1)}
                    // defaultValue={review.star1}
                    // defaultValue={star1Value}
                    value={stars}
                    checked={star1Value}
                    //onChange={(e) => {e.target.value=!star1Value;setStars(1)}}
                    onChange={() => {setStars(1)}}
                />
                <label htmlFor="star1" title="text">
                    1 star
                </label>
            </div>
            Stars
        </div>

        <button
            className="submit-review-btn"
            // disabled={review.length < 10 || stars < 1}
            disabled={review.length < 10 }
            onClick={handleSubmit}
        >
            Edit Review
        </button>
    </div>
);
};

export default EditReviewModal;