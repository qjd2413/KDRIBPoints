var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Position = sequelize.define('Position', 
    {
      name: { 
        type: Sequelize.STRING,
        unique: true
      }
    }, {
      classMethods: {
        associate: function(models) {
          Position.belongsTo(models.Authorization);
        }
      }
    }
  );
  return Position;
};

