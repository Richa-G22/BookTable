const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Restaurant, RestaurantImage, Holiday, Slot, MenuDish, Review, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const { DATEONLY } = require('sequelize');
const router = express.Router();

const validateRestaurant = [
    check('restaurantType')    
      .not()
      .isEmpty()
      .withMessage('Restaurant Type is required'),
    check('address')    
      .not()
      .isEmpty()
      .withMessage('Street address is required'),
    check('city')
      .not()
      .isEmpty()
      .withMessage('City is required'),
    check('state')
      .not()
      .isEmpty()
     .withMessage('State is required'),
    check('country')
      .not()
      .isEmpty()
      .withMessage('Country is required'),
    check('zipCode')
      .not()
      .isEmpty()
      .exists({ checkFalsy: true })
      .isNumeric()
      .withMessage('ZipCode is not valid'),
    check('phone')
      .not()
      .isEmpty()
      .exists({ checkFalsy: true })
      .withMessage('Phone number is not valid'),
    check('name')
      .not()
      .isEmpty()
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Name is required')
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .not()
      .isEmpty()
      .withMessage('Description is required'),
    check('cuisines')
      .not()
      .isEmpty()
      .withMessage('Cuisine is required'),
    check('hoursOfOperation')
      .not()
      .isEmpty()
      .withMessage('Hours of operation are required are required'),
    check('avgMealPrice')
      .not()
      .isEmpty()
      .withMessage('Average meal price is required'),
    check('parkingAvailability')
      .not()
      .isEmpty()
      .withMessage('Parking availability is required'),
    check('paymentOption')
      .not()
      .isEmpty()
      .withMessage('Payment option is required'),
    check('dressCode')
      .not()
      .isEmpty()
      .withMessage('Dress Code is required'),
    check('executiveChef')
      .not()
      .isEmpty()
      .withMessage('Executive chef is required'),
    handleValidationErrors
  ]; 


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


//   const validateBooking = [
//     check('bookingDate')
//         .custom(({req}) => {
//             const currentDate = new DATE();
//             console.log("%%%%%currentDatehere", currentDate)
//             console.log("#####", bookingDate)

//             if (bookingDate < currentDate) {
//                 return false
//             }
//             return true
//         })
    
//       .withMessage('Booking can not be made for past dates'),
//     handleValidationErrors
//   ]; 

//-----------------------------------------------------------------------------------------------------------------------
// Get all Restaurants
// router.get("/", async (req, res) => {
//     const restaurants = await Restaurant.findAll({
        
//         include: [
            
//             {
//                 model: Review,
//                 attributes: [],
//             },    
//             {
//                 model: RestaurantImage,
//                 attributes: ['restaurantId','restaurantUrl'],  
//                 //attributes: [],  
//             }
//         ],
//         attributes: {
//             include: [
//                 [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
//                 //[sequelize.col('RestaurantImages.restaurantUrl'), 'previewImage'],
//             ]
//         },
//         group: ['Restaurant.id','RestaurantImages.restaurantUrl']
//     });
    
//     const restaurantList = [];
//     restaurants.forEach(restaurant => {
//         let restaurantJson = restaurant.toJSON()
//         if (restaurantJson['avgRating'] === null) {
//             restaurantJson['avgRating'] = 0
//         } 
//         restaurantJson['avgRating'] = Number(restaurantJson['avgRating'].toFixed(2))
//         if ( restaurantJson['previewImage'] === null ) {
//             restaurantJson['previewImage'] = "no image found"
//         }
//         restaurantList.push(restaurantJson)
//     });
    
//     return res.json(restaurantList);
router.get("/", async (req, res) => {
    const restaurants = await Restaurant.findAll({
        
        include: [
            
            {
                model: Review,
                attributes: ['id','restaurantId','userId','review','stars'],  
                include: [
                    {
                        model: ReviewImage,
                        attributes: ['reviewId','reviewUrl']   
                    },
                    {
                        model: User,
                        attributes: ['firstName', 'lastName', 'profileImg']
                    }
                ] ,
            },    
            {
                model: RestaurantImage,
                attributes: ['restaurantId','restaurantUrl'],  
                //attributes: [],  
            },{
                model: Holiday,
                attributes: ['id','occasion']
            }
        ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                //[sequelize.col('RestaurantImages.restaurantUrl'), 'previewImage'],
            ]
        },
        group: ['Restaurant.id','RestaurantImages.restaurantUrl','Holidays.id']
    });
    
    const restaurantList = [];
    restaurants.forEach(restaurant => {
        let restaurantJson = restaurant.toJSON()
        if (restaurantJson['avgRating'] === null) {
            restaurantJson['avgRating'] = 0
        } 
        restaurantJson['avgRating'] = Number(restaurantJson['avgRating'].toFixed(2))
        if ( restaurantJson['previewImage'] === null ) {
            restaurantJson['previewImage'] = "no image found"
        }
        restaurantList.push(restaurantJson)
    });
    
    return res.json(restaurantList);

    
    // restaurants.forEach(restaurant => {
    //     // let restaurantJson = restaurant.toJSON()
    //     if (restaurant.avgRating === null) {
    //         restaurant.avgRating = 0
    //     } 
    //     // restaurant.avgRating = Number(restaurant.avgRating.toFixed(2))
    //     // if ( restaurantJson['previewImage'] === null ) {
    //     //     restaurantJson['previewImage'] = "no image found"
    //     // }
    //      //restaurantList.push(restaurantJson)
    // });
    
    // return res.json(restaurants);
});


//-----------------------------------------------------------------------------------------------------------------------
// Get all Restaurants owned by the current logged in user

router.get("/current", requireAuth, async (req, res) => { 
    console.log("here", req)  
	const restaurants = await Restaurant.findAll({
        where: {
            ownerId: req.user.id,
        },
        include: [
            {
                model: Review,
                attributes: ['id','restaurantId','userId','review','stars'],  
                include: [
                    {
                        model: ReviewImage,
                        attributes: ['reviewId','reviewUrl']   
                    },
                    {
                        model: User,
                        attributes: ['firstName', 'lastName', 'profileImg']
                    }
                ] ,
            }, {
                model: RestaurantImage,
                attributes: ['restaurantUrl'],   
            },{
                model: Holiday,
                attributes: ['id','occasion']
            }
        ],
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
            ]
        },
        group: ['Restaurant.id', 'RestaurantImages.restaurantUrl', 'Holidays.id']
        
    });
    
    const restaurantList = [];
    restaurants.forEach(restaurant => {
        let restaurantJson = restaurant.toJSON()
        
        if (restaurantJson['avgRating']) {
            restaurantJson['avgRating'] = parseFloat(restaurantJson['avgRating'])
        };
        if ( restaurantJson['previewImage'] === null ) {
            restaurantJson['previewImage'] = "no image found"
        }
        restaurantList.push(restaurantJson)
        
    });
	return res.json({"Restaurants": restaurantList});
});

//-----------------------------------------------------------------------------------------------------------------------
// Get details of a Restaurant from an id

router.get("/:restaurantId", async (req, res) => {
    const  id = req.params.restaurantId; 
	const restaurants = await Restaurant.findOne({
        
        include: [
            {
                model: RestaurantImage,
                attributes: ['id', 'restaurantUrl'],   
            }, {
                model: Review,
                attributes: ['id','restaurantId','userId','review','stars'],  
                include: [
                    {
                        model: ReviewImage,
                        attributes: ['reviewId','reviewUrl']   
                    },
                    {
                        model: User,
                        attributes: ['firstName', 'lastName', 'profileImg']
                    }
                ],
            },
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            }, {
                model: Holiday,
                attributes: ['id','occasion']
            }, {
                model: MenuDish,
                attributes: ['id', 'dishCategory', 'dishName','dishIngredients','dishPrice','dishCalories','dishAllergies']
            }],
            where: {id},
            
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
                ],
            },
            group: ['Restaurant.id', 'RestaurantImages.id', 'Holidays.id','MenuDishes.id','Reviews.id'],
            //group: ['Restaurant.id'],
            
        });
        
        if (restaurants) {
            
            if (restaurants['numReviews']) {
                restaurants['numReviews'] = parseInt(restaurants['numReviews'])
            } else {
                restaurants['numReviews']  = 0
            };
            
            if (restaurants['avgStarRating']) {
                restaurants['avgStarRating'] = parseFloat(restaurants['avgStarRating'])
            };
            
            return res.json(restaurants);
        } else {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        }	
    });
    
    //-----------------------------------------------------------------------------------------------------------------------
    // Create a new Restaurant

    router.post("/new",requireAuth, validateRestaurant, async (req, res) => {
        const { restaurantType, address, city, state, country, zipCode, phone, name, description, cuisines, locationMapUrl, dayClosed, hoursOfOperation, avgMealPrice, parkingAvailability, paymentOption, dressCode, executiveChef, menuUrl  } = req.body;
        
        res.status = 201;
        const newRestaurant = await Restaurant.create({ 
            restaurantType,
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            zipCode,
            phone,
            name,
            description,
            cuisines,
            locationMapUrl,
            dayClosed,
            hoursOfOperation,
            avgMealPrice,
            parkingAvailability,
            paymentOption,
            dressCode,
            executiveChef,
            menuUrl
        });
        
        return res.json(newRestaurant,res.status);
    });
    
    //-----------------------------------------------------------------------------------------------------------------------
    // Add an image to a Restaurant based on the Restaurant's id

    router.post("/:restaurantId/images",requireAuth, async (req, res) => {
        const restaurantId  = req.params.restaurantId;
        const restaurant = await Restaurant.findByPk(restaurantId);
        
        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
        if (parseInt(restaurant.ownerId) !== parseInt(req.user.id)) {
            const err = new Error("Forbidden");
            err.status = 403;
            return res.json({ message: "Forbidden" }, err.status); 
        };
        
        const { restaurantUrl } = req.body;    
        const newImage = await RestaurantImage.create({ 
            restaurantId: req.params.restaurantId,
            restaurantUrl
        });
        
        const imgRes = {};
        imgRes.id = newImage.id;
        imgRes.restaurantId = restaurantId;
        imgRes.restaurantUrl = newImage.restaurantUrl;
        
        return res.json(imgRes);
    });
    
    //-----------------------------------------------------------------------------------------------------------------------
    // Edit a Restaurant Image for a particular restaurant

    router.put("/:restaurantId/images/:id", requireAuth,  async (req, res) => {
        const restaurantId  = req.params.restaurantId;
        const id = req.params.id;
        const restaurant = await Restaurant.findByPk(restaurantId);
        const image = await RestaurantImage.findByPk(id);

        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };

        if (!image) {
            const err = new Error("Restaurant Image couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant Image couldn't be found" }, err.status);
        };
        
        const { restaurantUrl } = req.body;
        
        image.restaurantUrl = restaurantUrl;
        
        await image.save();
        return res.json( image );
    });
    //-----------------------------------------------------------------------------------------------------------------------
    // Add a Holiday to a Restaurant based on the Restaurant's id

    router.post("/:restaurantId/holidays",requireAuth, async (req, res) => {
        const restaurantId  = req.params.restaurantId;
        const restaurant = await Restaurant.findByPk(restaurantId);
        
        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
        if (parseInt(restaurant.ownerId) !== parseInt(req.user.id)) {
            const err = new Error("Forbidden");
            err.status = 403;
            return res.json({ message: "Forbidden" }, err.status); 
        };
        
        const { occasion } = req.body;    
        const newHoliday = await Holiday.create({ 
            restaurantId: req.params.restaurantId,
            occasion
        });
        
        const imgRes = {};
        imgRes.id = newHoliday.id;
        imgRes.restaurantId = restaurantId;
        imgRes.occasion = newHoliday.occasion;
        
        return res.json(imgRes);
    });


    //-----------------------------------------------------------------------------------------------------------------------
    // Add a new MenuDish to a Restaurant based on the Restaurant's id

    router.post("/:restaurantId/menudishes",requireAuth, async (req, res) => {
        const restaurantId  = req.params.restaurantId;
        const restaurant = await Restaurant.findByPk(restaurantId);
        
        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
        if (parseInt(restaurant.ownerId) !== parseInt(req.user.id)) {
            const err = new Error("Forbidden");
            err.status = 403;
            return res.json({ message: "Forbidden" }, err.status); 
        };
        
        const { dishCategory, dishName, dishIngredients, dishPrice, dishCalories, dishAllergies } = req.body;    
        const newMenuDish = await MenuDish.create({ 
            restaurantId: req.params.restaurantId,
            dishCategory,
            dishName,
            dishIngredients,
            dishPrice,
            dishCalories,
            dishAllergies
        });
        
        const menuObj = {};
        menuObj.id = newMenuDish.id;
        menuObj.restaurantId = restaurantId;
        menuObj.dishCategory = newMenuDish.dishCategory;
        menuObj.dishName = newMenuDish.dishName;
        menuObj.dishIngredients = newMenuDish.dishIngredients;
        menuObj.dishPrice = parseFloat(newMenuDish.dishPrice);
        menuObj.dishCalories = newMenuDish.dishCalories;
        menuObj.dishAllergies = newMenuDish.dishAllergies;
        
        return res.json(menuObj);
    });
    
    //-----------------------------------------------------------------------------------------------------------------------
    // Edit a Restaurant

    router.put("/update/:id", requireAuth, validateRestaurant, async (req, res) => {
        const { restaurantType, address, city, state, country, zipCode, phone, name, description, cuisines, locationMapUrl, dayClosed, hoursOfOperation, avgMealPrice, parkingAvailability, paymentOption, dressCode, executiveChef, menuUrl } = req.body;
        let id  = req.params.id;
        // id = parseInt(id);
        
        const restaurant = await Restaurant.findByPk(id);
        console.log("....restaurant....", restaurant);
        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
        if (parseInt(restaurant.ownerId) !== parseInt(req.user.id)) {
            const err = new Error("Forbidden");
            err.status = 403;
            return res.json({ message: "Forbidden" }, err.status); 
        };

        restaurant.restaurantType = restaurantType;
        restaurant.ownerId = req.user.id, 
        restaurant.address = address;
        restaurant.city = city;
        restaurant.state = state;
        restaurant.country = country;
        restaurant.zipCode = zipCode;
        restaurant.phone = phone;
        restaurant.name = name;
        restaurant.description = description;
        restaurant.cuisines = cuisines;
        restaurant.locationMapUrl = locationMapUrl;
        restaurant.dayClosed = dayClosed;
        restaurant.hoursOfOperation = hoursOfOperation;
        restaurant.avgMealPrice = avgMealPrice;
        restaurant.parkingAvailability = parkingAvailability;
        restaurant.paymentOption = paymentOption;
        restaurant.dressCode = dressCode;
        restaurant.executiveChef = executiveChef;
        restaurant.menuUrl = menuUrl;
        
        await restaurant.save(); 
        return res.json( restaurant );
    });
    
    
    //-----------------------------------------------------------------------------------------------------------------------
    // Delete a Restaurant

    router.delete('/:restaurantId', requireAuth, async (req, res, next) => {
        const deleteRestaurant = await Restaurant.findByPk(req.params.restaurantId);
    
        if (!deleteRestaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };

        if (parseInt(deleteRestaurant.ownerId) !== parseInt(req.user.id)) {
            const err = new Error("Forbidden");
            err.status = 403;
            return res.json({ message: "Forbidden" }, err.status); 
        };

        await deleteRestaurant.destroy();
        return res.json({ message: "Successfully deleted" });
    });


    //-----------------------------------------------------------------------------------------------------------------------
    // Get all Reviews of a restaurant by Restaurant's id

    router.get("/:restaurantId/reviews", async (req, res) => {
        const restaurantId  = req.params.restaurantId;
        const restaurant = await Restaurant.findByPk(restaurantId);

        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
        const reviews = await Review.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "firstName", "lastName"] 
            }, {
                    model: ReviewImage,
                    attributes: ['id','reviewUrl'],  
            }],
            where: {
                    restaurantId: req.params.restaurantId
            },   
        });
        return res.json({"Reviews": reviews});    
    });


    // router.get("/reviews/:restaurantId", async (req, res) => {
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


    //-----------------------------------------------------------------------------------------------------------------------
    // Create a Review for a restaurant based on the Restaurant's id

    router.post("/:restaurantId/reviews", requireAuth, validateReview, async (req, res) => {
        const restaurantId  = req.params.restaurantId;
        const restaurant = await Restaurant.findByPk(restaurantId);

        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
        const rev = await Review.findAll({
            where: {
                userId: req.user.id, 
                restaurantId: req.params.restaurantId
            }
        });

        if (parseInt(restaurant.ownerId) === parseInt(req.user.id)) {
            const err = new Error("Forbidden");
            err.status = 403;
            return res.json({ message: "Forbidden" }, err.status); 
        };

        if (rev.length) {
            const err = new Error("User already has a review for this restaurant");
            err.status = 500;
            return res.json({ message: "User already has a review for this restaurant" }, err.status);
        };

        res.status = 201;
        const { review, stars } = req.body;    
        
        const newReview = await Review.create({ 
            userId: req.user.id,
            restaurantId: req.params.restaurantId,
            review,
            stars,
        });
        
        const revRes = {};
        revRes.id = newReview.id;
        revRes.userId = newReview.userId;
        revRes.restaurantId = newReview.restaurantId;
        revRes.review = newReview.review;
        revRes.stars = newReview.stars;
        revRes.createdAt = newReview.createdAt;
        revRes.updatedAt = newReview.updatedAt;

        return res.json(revRes, res.status);
    });


    //-----------------------------------------------------------------------------------------------------------------------
    // Get all Bookings for a Restaurant based on the Restaurant's id

    router.get("/:restaurantId/bookings", requireAuth, async (req, res) => {

        const restaurant = await Restaurant.findByPk(req.params.restaurantId);

        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
            const bookings =  await Booking.findAll({
                where: {
                        restaurantId: req.params.restaurantId,       
                },       
        })


        console.log("$$$$$$$", bookings);
        const bookingList = []; 
        if ( bookings ) {
            for ( let index = 0; index < bookings.length ; index++ ) {
                let slot_id = bookings[index].dataValues.slotId
                console.log("slotId $$$", slot_id)
                const allOpenSlots = await Slot.findByPk(slot_id)
                console.log('******', allOpenSlots);
                const bookingObj = {};
                bookingObj.id = bookings[index].dataValues.id;
                bookingObj.userId = bookings[index].dataValues.userId;
                bookingObj.restaurantId = allOpenSlots.restaurantId;
                bookingObj.slotId = bookings[index].dataValues.slotId;
                bookingObj.slotStartTime = allOpenSlots.slotStartTime;
                bookingObj.slotDuration = slotDetails.slotDuration;
                bookingObj.tableCapacity = slotDetails.tableCapacity;
                bookingObj.tableNum = slotDetails.tableNum;
                bookingList.push(bookingObj)
            }
        }else {
            return res.json({ message: "No bookings have been made for the restaurant." }); 
        } 
            
            return res.json({"Bookings": bookingList})
        }    
    );


    //-----------------------------------------------------------------------------------------------------------------------
    // Get all Bookings for a Restaurant based on the Restaurant's id and booking date

    router.get("/:restaurantId/bookings/:bookingDate", requireAuth, async (req, res) => {

        const restaurant = await Restaurant.findByPk(req.params.restaurantId);

        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
            const bookings =  await Booking.findAll({
           
                where: {
                        restaurantId: req.params.restaurantId,   
                        bookingDate: req.params.bookingDate     
                },   
        })

        console.log("$$$$$$$", bookings);
        const bookingList = []; 
        if ( bookings ) {
            for ( let index = 0; index < bookings.length ; index++ ) {
                let slot_id = bookings[index].dataValues.slotId
                console.log("slotId $$$", slot_id)
                const slotDetails = await Slot.findByPk(slot_id)
                console.log('******', slotDetails);
                const bookingObj = {};
                bookingObj.id = bookings[index].dataValues.id;
                bookingObj.userId = bookings[index].dataValues.userId;
                bookingObj.bookingDate = req.params.bookingDate;
                bookingObj.restaurantId = slotDetails.restaurantId;
                bookingObj.slotId = bookings[index].dataValues.slotId;
                bookingObj.slotStartTime = slotDetails.slotStartTime;
                bookingObj.slotDuration = slotDetails.slotDuration;
                bookingObj.tableCapacity = slotDetails.tableCapacity;
                bookingObj.tableNum = slotDetails.tableNum;
                bookingList.push(bookingObj)
            }
        } else {
            return res.json({ message: "No bookings have been made for the restaurant." }); 
        } 
            
            return res.json({"Bookings": bookingList})
        }    
    );


    //-----------------------------------------------------------------------------------------------------------------------
    // Get all open Slots for a Restaurant based on the Restaurant's id and booking date

    router.get("/:restaurantId/bookings/:bookingDate/slots", requireAuth, async (req, res) => {

        const restaurant = await Restaurant.findByPk(req.params.restaurantId);

        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
            const bookings =  await Booking.findAll({
           
                where: {
                        restaurantId: req.params.restaurantId,   
                        bookingDate: req.params.bookingDate     
                },   
        })

        console.log("$$$$$$$", bookings);
        const bookedSlots = [];
        const bookingList = []; 

        if (bookings) {
            for ( let i = 0; i < bookings.length; i++) {
                 let booked_slotId = bookings[i].slotId;
                 bookedSlots.push(booked_slotId);
            }
            console.log('^^^^^^^^^',bookedSlots);

            const allOpenSlots = await Slot.findAll({
                where: {
                    id: {
                        [Op.notIn]: bookedSlots 
                    },
                    restaurantId : req.params.restaurantId
                }
            })
            console.log('######',allOpenSlots);
        
            for ( let i = 0; i < allOpenSlots.length; i++) {
                    const bookingObj = {};
                    bookingObj.bookingDate = req.params.bookingDate;
                    bookingObj.restaurantId = allOpenSlots[i].restaurantId;
                    bookingObj.slotId = allOpenSlots[i].id;
                    bookingObj.slotStartTime = allOpenSlots[i].slotStartTime;
                    bookingObj.slotDuration = allOpenSlots[i].slotDuration;
                    bookingObj.tableCapacity = allOpenSlots[i].tableCapacity;
                    bookingObj.tableNum = allOpenSlots[i].tableNum;
                    bookingList.push(bookingObj)
            }
            
        } else {
            return res.json({ message: "No bookings have been made for the restaurant." }); 
        } 
            
            return res.json({"Bookings": bookingList})
        }    
    );

    //-----------------------------------------------------------------------------------------------------------------------
    // Create a new booking for a restaurant based on restaurantId and slotId

    router.post("/:restaurantId/:slotId", requireAuth, async (req, res) => {
        const restaurantId  = req.params.restaurantId;
        const restaurant = await Restaurant.findByPk(restaurantId);

        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
        const booking = await Booking.findOne({
            where: {    
                restaurantId: req.params.restaurantId,
                slotId: req.params.slotId
            }
        });
        console.log('@@@@@@', booking);

        if(booking) {
            const err = new Error("This slot has already been booked.");
            err.status = 500;
            return res.json({ message: "This slot has already been booked." }, err.status); 
        }

        res.status = 201;
        const { bookingDate } = req.body;    
        
        const newBooking = await Booking.create({ 
            restaurantId: req.params.restaurantId,
            userId: req.user.id,
            slotId: req.params.slotId, 
            bookingDate
        });
        
        const bookingObj = {};
     
        bookingObj.userId = newBooking.userId;
        bookingObj.restaurantId = newBooking.restaurantId;
        bookingObj.slotId = newBooking.slotId;
        bookingObj.bookingDate = newBooking.bookingDate;
        bookingObj.createdAt = newBooking.createdAt;
        bookingObj.updatedAt = newBooking.updatedAt;

        return res.json(bookingObj, res.status);
    });

    //-----------------------------------------------------------------------------------------------------------------------
    // Edit a Review for a particular restaurant

    router.put("/:restaurantId/:reviewId", requireAuth, validateReview, async (req, res) => {
        const restaurantId  = req.params.restaurantId;
        const restaurant = await Restaurant.findByPk(restaurantId);

        if (!restaurant) {
            const err = new Error("Restaurant couldn't be found");
            err.status = 404;
            return res.json({ message: "Restaurant couldn't be found" }, err.status);
        };
        
        const { review, stars } = req.body;
        const reviewId  = req.params.reviewId;
        const existingReview = await Review.findByPk(reviewId);
        
        if (!existingReview) {
            const err = new Error("Review couldn't be found");
            err.status = 404;
            return res.json({ message: "Review couldn't be found" }, err.status);
        };
        
        if (parseInt(existingReview.userId) !== parseInt(req.user.id)) {
            const err = new Error("Forbidden");
            err.status = 403;
            return res.json({ message: "Forbidden" }, err.status); 
        };

        
        existingReview.review = review;
        existingReview.stars = stars;
        
        await existingReview.save();
        return res.json( existingReview );
    });

//-----------------------------------------------------------------------------------------------------------------------
// Get all MenuDishes of a restaurant by Restaurant's id

router.get("/:restaurantId/menudishes", async (req, res) => {
    const restaurantId  = req.params.restaurantId;
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
        const err = new Error("Restaurant couldn't be found");
        err.status = 404;
        return res.json({ message: "Restaurant couldn't be found" }, err.status);
    };
    
    const menuDishes = await MenuDish.findAll({
        where: {
                restaurantId: req.params.restaurantId
        },   
    });

    for (i = 0; i < menuDishes.leength; i++) {
        menuDishes[i].dishPrice = parseFloat(menuDishes[i].dishPrice)
    }
    return res.json({"MenuDishes": menuDishes});    
});


//-----------------------------------------------------------------------------------------------------------------------
// Get all RestaurantImages of a restaurant by Restaurant's id

router.get("/:restaurantId/images", async (req, res) => {
    const restaurantId  = req.params.restaurantId;
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
        const err = new Error("Restaurant couldn't be found");
        err.status = 404;
        return res.json({ message: "Restaurant couldn't be found" }, err.status);
    };
    
    const images = await RestaurantImage.findAll({
        where: {
                restaurantId: req.params.restaurantId
        },   
    });

    return res.json({"RestaurantImages": images});    
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Edit a MenuDish for a particular restaurant

router.put("/:restaurantId/menudishes/:menudishId", requireAuth, async (req, res) => {
    const restaurantId  = req.params.restaurantId;
    const menudishId  = req.params.menudishId;
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
        const err = new Error("Restaurant couldn't be found");
        err.status = 404;
        return res.json({ message: "Restaurant couldn't be found" }, err.status);
    };
    
    const existingMenudish = await MenuDish.findByPk(menudishId);
    
    if (!existingMenudish) {
        const err = new Error("MenuDish couldn't be found");
        err.status = 404;
        return res.json({ message: "MenuDish couldn't be found" }, err.status);
    };
    
    if (parseInt(restaurant.ownerId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden");
        err.status = 403;
        return res.json({ message: "Forbidden" }, err.status); 
    };
    
    const { dishCategory, dishName, dishIngredients, dishPrice, dishCalories, dishAllergies } = req.body;
    
    existingMenudish.dishCategory = dishCategory;
    existingMenudish.dishName = dishName;
    existingMenudish.dishIngredients = dishIngredients;
    existingMenudish.dishPrice = parseFloat(dishPrice);
    existingMenudish.dishCalories = dishCalories;
    existingMenudish.dishAllergies = dishAllergies;
    
    await existingMenudish.save();
    return res.json( existingMenudish );
});

//------------------------------------------------------------------------------------------------------
// Create a MenuDish for a restaurant based on the Restaurant's id

router.post("/:restaurantId/menudishes", requireAuth, async (req, res) => {
    const restaurantId  = req.params.restaurantId;
    const restaurant = await Restaurant.findByPk(restaurantId);
    
    if (!restaurant) {
        const err = new Error("Restaurant couldn't be found");
        err.status = 404;
        return res.json({ message: "Restaurant couldn't be found" }, err.status);
    };
    
    if (parseInt(restaurant.ownerId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden");
        err.status = 403;
        return res.json({ message: "Forbidden" }, err.status); 
    };
    
    res.status = 201;
    const { dishCategory, dishName, dishIngredients, dishPrice, dishCalories, dishAllergies } = req.body;    
    
    const newMenuDish = await MenuDish.create({ 
        restaurantId: req.params.restaurantId,
        dishCategory,
        dishName,
        dishIngredients,
        dishPrice,
        dishCalories,
        dishAllergies 
    });
    
    const menudishObj = {};
    menudishObj.id = newMenuDish.id;
    menudishObj.userId = newMenuDish.userId;
    menudishObj.restaurantId = newMenuDish.restaurantId;
    menudishObj.review = newMenuDish.review;
    menudishObj.stars = newMenuDish.stars;
    menudishObj.createdAt = newMenuDish.createdAt;
    menudishObj.updatedAt = newMenuDish.updatedAt;
    
    return res.json(menudishObj, res.status);
    
});

//------------------------------------------------------------------------------------------------------

module.exports = router;