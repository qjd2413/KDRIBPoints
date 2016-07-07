var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Authorization = sequelize.define('Authorization', 
    {
      level: Sequelize.STRING
    }
  );
  return Authorization;
};

