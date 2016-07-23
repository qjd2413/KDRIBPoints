(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var db = require('../controllers/db.js');
    var serviceHours = require('../controllers/ServiceHourController.js');

    var q = require('q');

    var verifyServiceAuth = function(user) {
      return q.all([
          db.getPosition(user),
          db.userAuthorization(user)
      ]).then(function(resp) {
          var position = resp[0];
          var auth = resp[1];

          var isServiceChair = position.indexOf('Service Chair') >= 0;
          var isEboardOrAdmin = auth === 'eboard' || auth === 'sysadmin';
          return isServiceChair || isEboardOrAdmin;
      });
    };

    module.exports = function(app) {
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
          var isDonation = hour.amount;
          if(!hour.description || isHours === isDonation) {
            res.sendStatus(400);
          }
          if(isDonation) {
            //remove extra data
            hour.startTime = hour.endTime = null;
          } else {
            //parse the dates
            hour.startTime = new Date(hour.startTime);
            hour.endTime = new Date(hour.endTime);
            if(hour.startTime.toString() === 'Invalid Date' || hour.endTime.toString() === 'Invalid Date') {
              res.sendStatus(400);
              return;
            }
          }
          serviceHours.submit(req.user, hour)
            .then(function() {
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

          verifyServiceAuth(req.user).then(function(resp) {
              if(!resp) {
                res.sendStatus(403);
                return;
              }
              serviceHours.approve(req.body.hour)
                .then(function() {
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

          verifyServiceAuth(req.user).then(function(resp) {
              if(!resp) {
                res.sendStatus(403);
                return;
              }
              serviceHours.reject(req.body.hour)
                .then(function() {
                  res.sendStatus(200);
                });
          });
        });

    };

})();
