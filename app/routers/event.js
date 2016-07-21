
(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var models = require('../../models');
  var Event = models.Event;

  module.exports = function(app) {
    app.use('/events', router);

    router.get('/', function(req, res) {
			var events = Event.findAll()
				.then(function(events) {
					res.send(events);
			});
    });
  };
})();
