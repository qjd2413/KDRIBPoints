var Sequelize = require('sequelize');

(function() {
    'use strict';

    module.exports = function(sequelize) {
        var Authorization = sequelize.define('Authorization',
            {
                name: Sequelize.STRING,
                level: Sequelize.INTEGER
            }
        );
        return Authorization;
    };
}());
