var fs = require('fs');
var path = require('path');

var Sequelize = require('sequelize');

var config = require('../config/config').mysql;
var init = require('./init.js');
var logger = require('../app/util/logger');

(function() {
    'use strict';

    var sequelize = new Sequelize(
            config.database, config.user, config.pass, { logging: false }
            );
    var db = {};

    var processFiles = function(files) {
        files.filter(function(file) {
            return file.indexOf('.') !== 0 &&
                file.indexOf('.js') !== -1 &&
                file !== 'index.js' &&
                file !== 'init.js';
        })
        .forEach(function(file) {
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

        module.exports = db;
    };

    fs.readdir(__dirname, function(err, files) {
        if(err) {
            logger.err(err);
            return;
        }
        processFiles(files);
    });

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
}());
