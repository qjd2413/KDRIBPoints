var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var ServiceHour = sequelize.define('ServiceHour', 
    {
      description: Sequelize.STRING,
      startTime: Sequelize.DATE,
      endTime: Sequelize.DATE,
      amount: Sequelize.INTEGER,
      lookedAt: Sequelize.BOOLEAN,
      approved: Sequelize.BOOLEAN
    }, {
      classMethods: {
        associate: function(models) {
          ServiceHour.belongsTo(models.Brother);
        }
      }
    }
  );
  return ServiceHour;
};

