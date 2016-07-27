
(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var models = require('../../models');
  var eventCtrl = require('../controllers/EventController.js');

  module.exports = function(app) {
    app.use('/events', router);

    router.get('/', function(req, res) {
			eventCtrl.findAll()
				.then(function(events) {
					res.send(events);
			});
    });

    router.post('/new', function(req, res) {
      if(!req.user) {
        res.sendStatus(403);
        return;
      }
      if(!req.body) {
        res.sendStatus(400);
        return;
      }

      var event_info = req.body;
      eventCtrl.newEvent(event_info)
        .then(function() {
          res.sendStatus(200);
        });
    });
  };
})();
