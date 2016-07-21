var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var ServiceHour = sequelize.define('ServiceHour', 
    {
      description: Sequelize.STRING,
      startTime: Sequelize.DATE,
      endTime: Sequelize.DATE,
      amount: Sequelize.INTEGER,
      state: Sequelize.CHAR(1)
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

