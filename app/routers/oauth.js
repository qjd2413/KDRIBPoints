(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var config = require('../../config/google_config');
    var passport = require('passport');

    var GoogleStrategy = require('passport-google-oauth20').Strategy;

    passport.use(
        new GoogleStrategy({
            clientID: config.client_id,
            clientSecret: config.client_secret,
            callbackURL: config.callback
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log(profile.displayName + ' has signed in.');
            return cb(null, profile);
        })
    );

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });

    module.exports = function(app) {
        app.use('/oauth', router);

        router.get('/google_signin',
          passport.authenticate('google', 
            { scope: ['profile'], hd: 'kdrib.org' })
        );

        router.get('/google_callback',
          passport.authenticate('google', { failureRedirect: '/error' }),
          function(req, res) {
            res.redirect('/');
          }
        );

        router.get('/user_test', function(req, res) {
          res.send(req.user);
        });

    };

})();
