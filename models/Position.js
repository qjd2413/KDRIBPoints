var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Position = sequelize.define('Position', 
    {
      name: Sequelize.STRING,
    }, {
      classMethods: {
        associate: function(models) {
          Position.belongsTo(models.Authorization);
        } 
      },
      hooks: {
        afterCreate: function(instance) {
          console.log(instance);
        },
        afterUpdate: function(instance) {
          console.log(instance); 
        }
      }
    }
  );
  return Position;
};

