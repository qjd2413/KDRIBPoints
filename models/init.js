'use strict';

var q = require('q');
var lodash = require('lodash');

var positions = require('./data/positions.json');
var auths = require('./data/authorizations.json');

var createAuths = function(db) {
    return q.all(lodash.map(auths, function(auth) {
        return db.Authorization.findOrCreate({
            where: auth
        });
    }))
    .then(function(auths) {
        var authLevels = {};
        lodash.map(auths, function(curr) {
            var tmp = curr[0].dataValues;
            authLevels[tmp.name] = tmp.id;
        });
        return authLevels;
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
        console.log('Database initialized.');
    })
    .catch(function(err) {
        console.log('Error initializing database');
        console.log(err);
    });
};

module.exports = initialize;
