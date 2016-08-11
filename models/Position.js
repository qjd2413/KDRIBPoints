var Sequelize = require('sequelize');

(function() {
    'use strict';

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
}());
