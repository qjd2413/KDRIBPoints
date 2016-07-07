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
            console.log(profile.displayName,'has signed in.');
            db.sign_in(profile.id, profile.name, profile. emails);
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
        app.use('/user', router);

        router.get('/sign_in', function(req, res) {
          if(!req.user) {
            passport.authenticate('google', 
              { scope: ['profile', 'email'], hd: 'kdrib.org' })(req,res)
          } else {
            console.log('User', req.user, 'already logged in.');
            res.redirect('/'); 
          }
        });

        router.get('/google_callback',
          passport.authenticate('google', { failureRedirect: '/error' }),
          function(req, res) {
            res.redirect('/');
          }
        );

        router.get('/sign_out', function(req, res) {
          if(req.user) {
            console.log('User', req.user, ' has logged out.');
            req.logout();
          }
          res.redirect('/');
        });

        router.get('/info', function(req, res) {
          if(req.user) {
            db.findUser(req.user)
              .then(function(brother) {
                var info = {};
                info.firstName = brother.firstName;
                info.lastName = brother.lastName;
                info.pin = brother.pin;
                info.email = brother.email;
                info.id = brother.id;
                if(!info.pin) {
                  info.incomplete = true;
                } 
                res.send(info); 
              });
          } else {
            res.send(null); 
          }
        });

        router.post('/update', function(req, res) {
          var http_status;
          // not signed in
          if(!req.user) {
            res.sendStatus(403);
            return;
          } 
          // no body
          if(!req.body || !req.body.id) {
            res.sendStatus(400);
            return;
          }
          // attempting to change a different user
          if(req.body.id !== req.user) {
            res.send('Stop');
            return;
          }
          db.updateUser(req.body, req.body.id);
          res.sendStatus(200);
        });

    };

})();
