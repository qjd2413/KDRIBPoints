'use strict';

var express = require('express');

var logger = require('../util/logger');
var brotherCtrl = require('../controllers/BrotherController');

var router = express.Router();

var routes = function(app) {
    app.use('/brother', router);

    router.get('/', function(req, res) {
        brotherCtrl.findAll().then(function(brothers) {
            res.send(brothers);   
        });
    });

    router.get('/info', function(req, res) {
        if(!req.user) {
            res.send(null);
            return;
        }
        console.log(req.user);
        brotherCtrl.info(req.user)
        .then(function(info) {
            res.send(info);
        });
    });

    router.post('/update', function(req, res) {
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
            logger.warn(req.ip, 'attempted to update a different user');
            res.send('Stop');
            return;
        }
        brotherCtrl.update(req.body, req.body.id)
        .then(function() {
            logger.info(req.user, 'updated');
            res.sendStatus(200);
        });
    });
};

module.exports = routes;

