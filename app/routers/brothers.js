(function() {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var models = require('../../models');
  var Brother = models.Brother;
  var SysAdmin = models.SysAdmin;
  var Position = models.Position;

  module.exports = function(app) {
    app.use('/brothers', router);

    router.get('/', function(req, res) {
      var brothers = Brother.findAll({
        include: [SysAdmin, Position]
      })
        .then(function(brothers) {
          res.send(brothers);
        });
    });
  };
})();
