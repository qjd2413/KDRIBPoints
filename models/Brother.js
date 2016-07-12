
var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Brother = sequelize.define('Brother', 
    {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      }
    }, {
      classMethods: {
        associate: function(models) {
          Brother.hasMany(models.Position);
          Brother.hasOne(models.SysAdmin);
        }
      }
    }
  );
  return Brother;
};

