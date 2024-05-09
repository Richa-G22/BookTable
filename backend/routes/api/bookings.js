const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const { Restaurant, RestaurantImage, Holiday, Slot, MenuDish, Review, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const router = express.Router();

// const validateBooking = [
//     check('endDate')
//       .custom((endDate, { req }) => {
//         const startDate = req.body.startDate;
//         if (startDate >= endDate) {
//             return false
//         }
//         return true
//     })
//       .withMessage('EndDate cannot come before startDate'),
//     handleValidationErrors
//   ]; 

//-----------------------------------------------------------------------------------------------------------------------
// Get all bookings
router.get("/", async (req, res) => {
    const bookings = await Booking.findAll({
        
        include: [        
            {
                model: Slot,
                attributes: ['id', 'restaurantId', 'slotStartTime', 'slotDuration', 'tableCapacity'],     
            },    
        ],
       
    });
    
    return res.json(bookings);
});
     
//-----------------------------------------------------------------------------------------------------------------------
// Get all of the Current User's Bookings 
router.get("/current", requireAuth, async (req, res) => {
    const bookingList = [];
    
	const bookings = await Booking.findAll({
        where: {
            userId: req.user.id,
        },
        include: [
            {
                model: Slot,
                attributes: ['id', 'restaurantId', 'slotStartTime', 'slotDuration', 'tableCapacity'], 
            },
            {
                model: Restaurant,
                attributes: ['id', 'name', 'address', 'city', 'state','country', 'zipCode'],
                include: [
                    {
                        model: RestaurantImage,
                        attributes: ['id', 'restaurantUrl']
                    }
                ]
            }
        ]
    });
    
	return res.json({"Bookings": bookings});
});


//-----------------------------------------------------------------------------------------------------------------------
//Edit a booking

 router.put("/:bookingId", requireAuth, async (req, res) => {
   
    const bookingId  = req.params.bookingId;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return res.json({ message: "Booking couldn't be found" }, err.status);
    };

    if (parseInt(booking.userId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden");
        err.status = 403;
        return res.json({ message: "Forbidden" }, err.status); 
    };

    const { bookingDate, slotId } = req.body;
    const newbookingDate = new Date(bookingDate);
    const today = new Date();
    console.log("--------", today);

    // Bookings in the past cannot be modified
    if (newbookingDate < today){    
        return res.status(403).json({ message: "Past bookings can't be modified"});
    };

    // Booking changes
    booking.bookingDate = bookingDate, 
    booking.slotId = slotId;

    await booking.save();
    return res.json( booking );
});

//--------------------------------------------------------------------------------------------------------
//DELETE a Booking

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const deleteBooking = await Booking.findByPk(req.params.bookingId);
   
    if (!deleteBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return res.json({ message: "Booking couldn't be found" }, err.status);
    };

    if (parseInt(deleteBooking.userId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden");
        err.status = 403;
        return res.json({ message: "Forbidden" }, err.status); 
    };

    const bookingDate = new Date(deleteBooking.bookingDate);
    const today = new Date();

    if (bookingDate < today) {
        return res.status(403).json({ message: "Bookings made in the past can not be deleted"});
    }

    await deleteBooking.destroy();
    return res.json({ message: "Successfully deleted" });
});

module.exports = router;