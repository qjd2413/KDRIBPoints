var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var SysAdmin = sequelize.define('SysAdmin', 
    {
      
    }, {
      classMethods: {
        associate: function(models) {
          SysAdmin.belongsTo(models.Brother, { as: 'admin' });
        }
      }
    }
  );
  return SysAdmin;
};

