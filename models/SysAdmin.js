var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var SysAdmin = sequelize.define('SysAdmin', 
    {
      
    }, {
      timestamps: false,
      classMethods: {
        associate: function(models) {
          SysAdmin.belongsTo(models.Brother, { 
            as: 'admin',
            onDelete: 'CASCADE'
          });
        }
      }
    }
  );
  return SysAdmin;
};

