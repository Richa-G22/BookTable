const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Restaurant, RestaurantImage, Holiday, Slot, MenuDish, Review, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const router = express.Router();

const validateReview = [
    check('stars')
      .not()
      .isEmpty()
      .isInt({ min: 1})
      .withMessage('Stars must be an integer from 1 to 5')
      .isInt({ max: 5})
      .withMessage('Stars must be an integer from 1 to 5'),
    check('review')
      .not()
      .isEmpty()
      .withMessage('Review text is required'),
    handleValidationErrors
  ]; 

// Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
    
	let reviews = await Review.findAll({
        where: {
            userId: req.user.id,    
        },
        include: [
            {
                model: User,
                attributes: ['id','firstName','lastName'], 
        },
            {
                model: Restaurant,
                attributes: ['id','restaurantType','ownerId','address','city','state','country','zipCode','phone','name','description','cuisines','locationMapUrl','dayClosed','hoursOfOperation','avgMealPrice','parkingAvailability','paymentOption','dressCode','executiveChef','menuUrl' ], 
                include: [
                    {
                        model: RestaurantImage,
                        attributes: [],
                    },
                ]   
            }, 
            {
                model: ReviewImage,
                attributes: ['id', 'reviewId','reviewUrl']
            },
        ],
        group: ['Review.id', 'User.id', 'ReviewImages.id','Restaurant.RestaurantImages.restaurantUrl', 'Restaurant.id']
    });
    
   return res.json({"Reviews": reviews});
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Add an Image to a Review based on the Review's id

router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const reviewId  = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    
    if (!review) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return res.json({ message: "Review couldn't be found" }, err.status);
    };
    
    if (parseInt(review.userId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden");
        err.status = 403;
        return res.json({ message: "Forbidden" }, err.status) 
    } else {
        const existingImages = await ReviewImage.findAll({
            where: { 
                reviewId: req.params.reviewId
            },    
        });
        if (existingImages.length < 5 ){
            const { reviewUrl } = req.body;    
            const newImage = await ReviewImage.create({ reviewId, reviewUrl });
            
            const imgRes = {};
            imgRes.id = newImage.id;
            imgRes.reviewUrl = newImage.Url;
            return res.json(imgRes);
        } else {
            return res.status(403).json({ message: "Maximum number of images for this resource was reached" })
        }
    };    
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Delete a Review

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const deleteReview = await Review.findByPk(req.params.reviewId);
   
    if (!deleteReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return res.json({ message: "Review couldn't be found" }, err.status);
    };

    if (parseInt(deleteReview.userId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden");
        err.status = 403;
        return res.json({ message: "Forbidden" }, err.status); 
    };

    await deleteReview.destroy();
    return res.json({ message: "Successfully deleted" });
})

// //get

// router.get("/:restaurantId", async (req, res) => {
//     const restaurantId  = req.params.restaurantId;
//     const restaurant = await Restaurant.findByPk(restaurantId);

//     if (!restaurant) {
//         const err = new Error("Restaurant couldn't be found");
//         err.status = 404;
//         return res.json({ message: "Restaurant couldn't be found" }, err.status);
//     };
    
//     const reviews = await Review.findAll({
//         include: [
//             {
//                 model: User,
//                 attributes: ["id", "firstName", "lastName"] 
//         }, {
//                 model: ReviewImage,
//                 attributes: ['id','reviewUrl'],  
//         }],
//         where: {
//                 restaurantId: req.params.restaurantId
//         },   
//     });
//     return res.json({"Reviews": reviews});    
// });


module.exports = router;