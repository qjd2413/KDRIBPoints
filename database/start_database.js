var start_database = function() {
  'use strict';
  var mysql_config = require('../config/mysql_config');
  var Sequelize = require('sequelize');

  console.log('Attempting to connect to database...');

  var sequelize = new Sequelize(mysql_config.database, mysql_config.user, mysql_config.pass);

  sequelize.authenticate()
    .then(function(err) {
      console.log('Connected to database.');
      require('./setup_database.js')(sequelize);
    })
    .catch(function (err) {
      console.log('Unable to connect to the database:', err);
    });
};

module.exports = start_database;
