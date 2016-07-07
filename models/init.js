var positions = require('./data/positions.json');
var auths = require('./data/authorizations.json');

var q = require('q');

module.exports = function(db) { 

    var auth_calls = [];
    for(var i = 0; i < auths.length; i++) {
      auth_calls.push(db.Authorization.findOrCreate({
        where: auths[i],
        defaults: auths[i]
      }));
    }
    q.all(auth_calls)
      .then(function(data) {
        var auth = {};
        var values;
        for(var i = 0; i < data.length; i++) {
          values = data[i][0].dataValues;
          auth[values.level] = values.id;
        }
        var position_calls = [];
        for(var i = 0; i < positions.length; i++) {
          positions[i].AuthorizationId = auth[positions[i].AuthLevel];
          delete positions[i].AuthLevel;
          position_calls.push(db.Position.findOrCreate({
            where: positions[i]
          }));
        }
        return q.all(position_calls);

      })
      .then(function() {
        console.log('Database initialized.');
      })
      .fail(function(err) {
        console.log('Error initializing database');
        console.log(err);
      })
};
