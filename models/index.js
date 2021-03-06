var fs = require('fs');
var path = require('path');

var Sequelize = require('sequelize');

var config = require('../config/config').mysql;
var init = require('./init.js');

(function() {
    'use strict';

    var sequelize = new Sequelize(
            config.database, config.user, config.pass, { logging: false }
            );
    var db = {};

    /* eslint-disable no-sync */
    fs.readdirSync(__dirname)
        .filter(function(file) {
            return file.indexOf('.') !== 0 &&
                file.indexOf('.js') !== -1 &&
                file !== 'index.js' &&
                file !== 'init.js';
        })
        .forEach(function(file) {
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    /* eslint-enable */

    Object.keys(db).forEach(function(modelName) {
        if('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    sequelize.sync().then(function() {
        init(db);
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    module.exports = db;
}());
