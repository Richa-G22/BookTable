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

//------------------------------------------------------------------------------------------------------
// Create a MenuDish for a restaurant based on the Restaurant's id

router.post("/new", requireAuth, async (req, res) => {
    const { dishCategory, dishName, dishIngredients, dishPrice, dishCalories, dishAllergies } = req.body;    
    
    res.status = 201;
    
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