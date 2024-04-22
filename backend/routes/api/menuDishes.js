const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Restaurant, RestaurantImage, Holiday, Slot, MenuDish, Review, ReviewImage, User, Booking, sequelize } = require('../../db/models');
const router = express.Router();


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Delete a MenuDish

router.delete('/:menudishId', requireAuth, async (req, res, next) => {
    const deleteMenuDish = await MenuDish.findByPk(req.params.menudishId);
   
    if (!deleteMenuDish) {
        const err = new Error("Menu Dish couldn't be found");
        err.status = 404;
        return res.json({ message: "Menu Dish couldn't be found" }, err.status);
    };

    const restaurant = await Restaurant.findByPk(deleteMenuDish.restaurantId);
    if (parseInt(restaurant.ownerId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden");
        err.status = 403;
        return res.json({ message: "Forbidden" }, err.status); 
    };

    await deleteMenuDish.destroy();
    return res.json({ message: "Successfully deleted" });
})

module.exports = router;