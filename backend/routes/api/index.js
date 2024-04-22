// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const restaurantsRouter = require('./restaurants.js');
const bookingsRouter = require('./bookings.js');
const reviewsRouter = require('./reviews.js');
const restaurantImagesRouter = require('./restaurantImages.js');
const reviewImagesRouter = require('./reviewImages.js');
const menuDishesRouter = require('./menuDishes.js');

//You can use requireAuth as middleware for routes that require sign in
//You can use setTokenCookie as a func to set cookie for user

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);
router.use('/reviewImages', reviewImagesRouter);
router.use('/restaurantImages', restaurantImagesRouter);
router.use('/menuDishes', menuDishesRouter);


// Restore user
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});



module.exports = router;
