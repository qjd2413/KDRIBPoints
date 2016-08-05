'use strict';

var express = require('express');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');

var logger = require('../util/logger');

var userCtrl = require('../controllers/UserController');
var googleConfig = require('../../config/google_config');

var router = express.Router();

passport.use(
    new GoogleStrategy({
        clientID: googleConfig.client_id,
        clientSecret: googleConfig.client_secret,
        callbackURL: googleConfig.callback
    },
    function(accessToken, refreshToken, profile, cb) {
        logger.info(profile.displayName,'has signed in.');
        userCtrl.signIn(profile.id, profile.name, profile. emails);
        return cb(null, profile.id);
    })
);

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

var routes = function(app) {
    app.use('/user', router);

    router.get('/sign_in', function(req, res) {
        if(!req.user) {  
            var passportOptions = { 
                scope: ['profile', 'email'], 
                hd: 'kdrib.org' 
            };
            passport.authenticate('google', passportOptions)(req,res);
        } else {
            logger.warn('User', req.user, 'already logged in.');
            res.redirect('/'); 
        }
    });

    router.get('/google_callback',
                passport.authenticate('google'), 
                function(req, res) {
                    res.redirect('/');
                }
    );

    router.get('/sign_out', function(req, res) {
        if(req.user) {
            logger.info('User', req.user, ' has logged out.');
            req.logout();
        }
        res.redirect('/');
    });

};

module.exports = routes;

