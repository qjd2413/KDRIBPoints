var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Authorization = sequelize.define('Authorization', 
    {
      name: Sequelize.STRING,
      level: Sequelize.INTEGER
    }
  );
  return Authorization;
};

