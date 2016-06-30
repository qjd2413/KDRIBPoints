(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var config = require('../../config/google_config');
    var db = require('../controllers/db.js');

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
            db.create(profile.id, profile.name, profile. emails);
            return cb(null, profile.id);
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
            { scope: ['profile', 'email'], hd: 'kdrib.org' })
        );

        router.get('/google_callback',
          passport.authenticate('google', { failureRedirect: '/error' }),
          function(req, res) {
            res.redirect('/');
          }
        );

        router.get('/sequelize', function(req, res) {
          console.log(req.user);
          res.redirect('/');
        });
    };

})();
