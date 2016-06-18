var Sequelize = require('sequelize');

var Brother = {
	name: 'brother',
	definition: {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    pin: {
      type: Sequelize.INTEGER
    }
	}
};

module.exports = Brother;
