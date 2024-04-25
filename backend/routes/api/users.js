const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//backend validation for signup
const validateSignup = [
    check('firstName')
      .not()
      .isEmpty()
      .withMessage('First Name is required'),
    check('lastName')
      .not()
      .isEmpty()
      .withMessage('Last Name is required'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('email')
      .not()
      .isEmpty()
     // .withMessage('Email or username is required'),
     .withMessage('Invalid email'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username is required'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password is required.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {

    const { email, password, username, firstName, lastName, profileImg } = req.body;

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword, firstName, lastName, profileImg });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImg: user.profileImg
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});


module.exports = router;
