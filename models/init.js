var q = require('q');
var lodash = require('lodash');

var positions = require('./data/positions.json');
var auths = require('./data/authorizations.json');
var logger = require('../app/util/logger');

(function() {
    'use strict';

    var createAuths = function(db) {
        return q.all(lodash.map(auths, function(auth) {
            return db.Authorization.findOrCreate({
                where: auth
            });
        }))
        .then(function(authLevels) {
            var cleanedAuthLevels = {};
            lodash.map(authLevels, function(curr) {
                var tmp = curr[0].dataValues;
                cleanedAuthLevels[tmp.name] = tmp.id;
            });
            return cleanedAuthLevels;
        });
    };

    var createPositions = function(db, authLevels) {
        return q.all(lodash.map(positions, function(position) {
            position.AuthorizationId = authLevels[position.AuthLevel];
            delete position.AuthLevel;
            return db.Position.findOrCreate({
                where: position
            });
        }));
    };

    var initialize = function(db) {
        createAuths(db)
            .then(function(authLevels) {
                return createPositions(db, authLevels);
            })
        .then(function() {
            logger.info('Database initialized.');
        })
        .catch(function(err) {
            logger.err('Error initializing database');
            logger.err(err);
        });
    };

    module.exports = initialize;
}());
