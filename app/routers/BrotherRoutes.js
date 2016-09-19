var express = require('express');

var logger = require('../util/logger');
var brotherCtrl = require('../controllers/BrotherController');

(function() {
    'use strict';

    var router = express.Router();

    var statusCodes = {
        success: 200,
        badRequest: 400,
        unauthed: 403
    };

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
            brotherCtrl.info(req.user)
                .then(function(info) {
                    res.send(info);
                });
        });

        router.post('/update', function(req, res) {
            if(!req.user) {
                res.sendStatus(statusCodes.unauthed);
                return;
            }

            if(!req.body || !req.body.id) {
                res.sendStatus(statusCodes.badRequest);
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
                    res.sendStatus(statusCodes.success);
                });
        });
    };

    module.exports = routes;
}());
