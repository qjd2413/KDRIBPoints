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
            return cb();
        })
    );

    module.exports = function(app) {
        app.use('/oauth', router);

        router.get('/google_signin',
            passport.authenticate('google', { scope: ['profile'] })
        );

        router.get('/google_callback',
            passport.authenticate('google', { failureRedirect: '/' }),
            function(req, res) {
                // Successful authentication, redirect home.
                res.redirect('/');
            }
        );

    };

})();
