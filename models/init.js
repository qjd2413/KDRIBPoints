var positions = require('./data/positions.json');
var auths = require('./data/authorizations.json');

var q = require('q');
var lodash = require('lodash');

module.exports = function(db) { 
    q.all(lodash.map(auths, function(auth) {
      return db.Authorization.findOrCreate({
        where: auth,
        defaults: auth
      });
    }))
    .then(function(data) {
      var auth = {};
      lodash.map(data, function(curr) {
        var tmp = curr[0].dataValues;
        auth[tmp.level] = tmp.id;
      })
      return q.all(lodash.map(positions, function(position) {
        position.AuthorizationId = auth[positions.AuthLevel];
        delete position.AuthLevel;
        return db.Position.findOrCreate({
          where: position
        });
      }));

    })
    .then(function() {
      console.log('Database initialized.');
    })
    .fail(function(err) {
      console.log('Error initializing database');
      console.log(err);
    })
};
