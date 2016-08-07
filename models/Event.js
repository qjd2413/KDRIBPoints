
var Sequelize = require('sequelize');

module.exports = function(sequelize) {
  var Event = sequelize.define('Event',
    {
      description: {
        type: Sequelize.STRING
      },
      point_value: {
        type: Sequelize.INTEGER
      },
      start_time: {
        type: Sequelize.DATE
      },
      end_time: {
        type: Sequelize.DATE
      },
      approved: {
        type: Sequelize.BOOLEAN
      }
    }, {
      classMethods: {
        associate: function(models) {
        }
      }
    }
  );
  return Event;
};
