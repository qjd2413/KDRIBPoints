'use strict';

var models = require('../../models');

var Authorization = models.Authorization;

var functions = {
    // findAll
    // returns <promise>:
    //   every authorization stored in the database
    findAll: function() {
        return Authorization.findAll();
    }
};

module.exports = functions;

