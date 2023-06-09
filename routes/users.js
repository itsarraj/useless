const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get(
    '/profile/:id',
    passport.checkAuthentication,
    usersController.profile
);

router.post(
    '/update/:id',
    passport.checkAuthentication,
    usersController.update
);

router.get('/sign-up', usersController.signup);
router.get('/sign-in', usersController.signin);

router.post('/create', usersController.create);
// use passport as the middleware to authenticate
router.post(
    '/create-session',
    passport.authenticate('local', {
        failureRedirect: '/users/sign-in',
    }),
    usersController.createSession
);

router.get('/sign-out', usersController.destroySession);
router.get('/forget-password', usersController.forgetpasswordpage);
router.post('/forget-password/generate', usersController.forgetpassword);

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/users/sign-in' }),
    usersController.createSession
);

module.exports = router;

// router.use('/post', require('./post'));
