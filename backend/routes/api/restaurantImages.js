const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Restaurant, RestaurantImage, Holiday, Slot, MenuDish, Review, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const restaurant = require('../../db/models/restaurant');
const router = express.Router();

//Delete a Restaurant Image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const deleteImage = await RestaurantImage.findByPk(req.params.imageId);
   
    if (!deleteImage) {
        const err = new Error("Restaurant Image couldn't be found");
        err.status = 404;
        return res.json({ message: "Restaurant Image couldn't be found" }, err.status);
    };

    const restaurant = await Restaurant.findByPk(deleteImage.restaurantId);

    if (parseInt(restaurant.ownerId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden");
        err.status = 403;
        return res.json({ message: "Forbidden" }, err.status); 
    };

    await deleteImage.destroy();
    return res.json({ message: "Successfully deleted" });
});


module.exports = router;