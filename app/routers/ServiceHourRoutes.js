var express = require('express');

var logger = require('../util/logger');

var serviceHours = require('../controllers/ServiceHourController');
var userCtrl = require('../controllers/UserController');

(function() {
    'use strict';

    var router = express.Router();

    var statusCodes = {
        success: 200,
        badRequest: 400,
        unauthed: 403
    };

    var routes = function(app) {
        app.use('/service', router);

        router.get('/', function(req, res) {
            serviceHours.findAll()
                .then(function(hours) {
                    res.send(hours);
                });
        });

        router.post('/submit', function(req, res) {
            if(!req.user) {
                res.sendStatus(statusCodes.unauthed);
                return;
            }
            if(!req.body) {
                res.sendStatus(statusCodes.badRequest);
                return;
            }

            var hour = req.body;

            // missing data
            var isHours = hour.startTime && hour.endTime;
            var isDonation = hour.amount !== undefined;
            if(!hour.description || isHours === isDonation) {
                res.sendStatus(statusCodes.badRequest);
                return;
            }
            if(isDonation) {
                hour.startTime = hour.endTime = null;
            }
            serviceHours.submit(req.user, hour)
                .then(function() {
                    logger.info(req.user, 'submitted service hour');
                    res.sendStatus(statusCodes.success);
                });
        });

        router.post('/approve', function(req, res) {
            if(!req.user) {
                res.sendStatus(statusCodes.unauthed);
                return;
            }
            if(!req.body || !req.body.hour) {
                res.sendStatus(statusCodes.badRequest);
                return;
            }

            userCtrl.authorization(req.user, 'Service Chair')
                .then(function(resp) {
                    if(!resp) {
                        logger.warn(req.user,
                                'attempted to approve service hours');
                        res.sendStatus(statusCodes.unauthed);
                        return;
                    }
                    serviceHours.approve(req.body.hour)
                        .then(function() {
                            logger.info('Service hour', req.body.hour,
                                    'approved');
                            res.sendStatus(statusCodes.success);
                        });
                });
        });

        router.post('/reject', function(req, res) {
            if(!req.user) {
                res.sendStatus(statusCodes.unauthed);
                return;
            }
            if(!req.body || !req.body.hour) {
                res.sendStatus(statusCodes.badRequest);
                return;
            }

            userCtrl.authorization(req.user, 'Service Chair')
                .then(function(resp) {
                    if(!resp) {
                        logger.warn(req.user,
                                    'attempted to approve service hours');
                        res.sendStatus(statusCodes.unauthed);
                        return;
                    }
                    serviceHours.reject(req.body.hour)
                        .then(function() {
                            logger.info('Service hour', req.body.hour,
                                        'rejected');
                            res.sendStatus(statusCodes.success);
                        });
                });
        });
    };

    module.exports = routes;
}());
