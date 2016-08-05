'use strict';

var express = require('express');

var logger = require('../util/logger');
var positionCtrl = require('../controllers/PositionController');
var userCtrl = require('../controllers/UserController');

var router = express.Router();

var routes = function(app) {
    app.use('/position', router);

    router.get('/', function(req, res) {
        positionCtrl.findAll().then(function(positions) {
            res.send(positions); 
        });
    });

    router.post('/assign', function(req, res) {
        if(!req.user) {
            res.sendStatus(403);
            return;
        }
        if(!req.body || !req.body.brother || !req.body.position) {
            res.sendStatus(400);
            return;
        }
        userCtrl.authorization(req.user)
        .then(function(auth) {
            if(auth !== 'sysadmin' && auth !== 'eboard') {
                logger.warn(req.user, 'attempted to assign a position');
                res.sendStatus(403);
            } else {
                positionCtrl.assign(req.body.brother, req.body.position)
                .then(function() {
                    logger.info(req.body.brother, 'assigned to', 
                                req.body.position);
                    res.sendStatus(200);
                });
            }
        });
    });

};

module.exports = routes;

