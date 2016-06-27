
var glob = require('glob');
var config = require('../config/config');

var setup_database = function(sequelize) {
  var models = glob.sync(config.root + '/models/*.js');
  models.forEach(function (model) {
    var m = require(model);
    sequelize.define(m.name, m.definition);
  });
  sequelize.sync({force: true});
  console.log('sequelize synced');
};

module.exports = setup_database;
