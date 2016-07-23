(function() {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var db = require('../controllers/db.js');

    module.exports = function(app) {
        app.use('/position', router);

        router.get('/list', function(req, res) {
          db.findAllPositions()
            .then(function(positions) {
              res.send(positions);
            });
        });

        //req.body includes
        //  brother, the id of a brother
        //  position, the id of a position
        //the requesting user must have admin rights or 
        //  an error is returned
        router.post('/assign', function(req, res) {
          if(!req.user) {
            res.sendStatus(403);
            return;
          }
          if(!req.body || !req.body.brother || !req.body.position) {
            res.sendStatus(400);
            return;
          }
          db.userAuthorization(req.user)
            .then(function(auth) {
              if(auth !== 'sysadmin' && auth !== 'eboard') {
                res.sendStatus(403);
              } else {
                db.assignPosition(req.body.brother, req.body.position)
                  .then(function() {
                    res.sendStatus(200);
                  });
              }
            });
        });

    };

})();
