'use strict';

var express = require('express');

var logger = require('../util/logger');

var serviceHours = require('../controllers/ServiceHourController');
var userCtrl = require('../controllers/UserController');

var router = express.Router();

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
            res.sendStatus(403);
            return;
        }
        if(!req.body) {
            res.sendStatus(400); 
            return;
        }

        var hour = req.body;
        //missing data
        var isHours = hour.startTime && hour.endTime;
        var isDonation = hour.amount !== undefined;
        if(!hour.description || isHours === isDonation) {
            res.sendStatus(400);
            return;
        }
        if(isDonation) {
            //remove extra data
            hour.startTime = hour.endTime = null;
        }
        serviceHours.submit(req.user, hour)
        .then(function() {
            logger.info(req.user, 'submitted service hour');
            res.sendStatus(200);
        });
    });

    router.post('/approve', function(req, res) {
        if(!req.user) {
            res.sendStatus(403);
            return;
        }
        if(!req.body || !req.body.hour) {
            res.sendStatus(400);
            return;
        }

        userCtrl.authorization(req.user, 'Service Chair').then(function(resp) {
            if(!resp) {
                logger.warn(req.user, 'attempted to approve service hours'); 
                res.sendStatus(403);
                return;
            }
            serviceHours.approve(req.body.hour)
            .then(function() {
                logger.info('Service hour', req.body.hour, 'approved');
                res.sendStatus(200);
            });
        });
    });

    router.post('/reject', function(req, res) {
        if(!req.user) {
            res.sendStatus(403);
            return;
        }
        if(!req.body || !req.body.hour) {
            res.sendStatus(400);
            return;
        }

        userCtrl.authorization(req.user, 'Service Chair').then(function(resp) {
            if(!resp) {
                logger.warn(req.user, 'attempted to approve service hours'); 
                res.sendStatus(403);
                return;
            }
            serviceHours.reject(req.body.hour)
            .then(function() {
                logger.info('Service hour', req.body.hour, 'rejected');
                res.sendStatus(200);
            });
        });
    });

};

module.exports = routes;

