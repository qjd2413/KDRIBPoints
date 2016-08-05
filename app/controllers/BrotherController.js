'use strict';

var lodash = require('lodash');
var q = require('q');

var models = require('../../models');
var userCtrl = require('./UserController');

var Brother = models.Brother;
var Position = models.Position;
var SysAdmin = models.SysAdmin;

var functions = {
    // findAll
    // returns <promise>:
    //   every brother stored in the database, with relations
    findAll: function() {
        return Brother.findAll({
            include: [SysAdmin, Position]
        });

    },
    // findById
    // params:
    //   id: self-explanatory
    // returns <promise>:
    //   sequelize Brother object, with relations
    findById: function(id) {
        return Brother.findById(id, {
            include: [SysAdmin, Position]
        });
    }, // update // params:
    //   brother: key/value of information to be updated
    //   id: of brother to be updated
    // returns <promise>:
    //   resolved when successfully updated
    update: function(brother, id) {
        return Brother.update(brother,
            {
                where: { id: id },
                fields: ['pin']
            }
        );
    },
    // info
    // params:
    //   id: self-explanatory
    // returns <promise>:
    //   information about the specified brother
    info: function(id) {
        return q.all([
            Brother.findById(id),
            userCtrl.authorization(id)
        ]).then(function(brother) {
            //var brother = resp[0];
            var info = {};
            var fields = ['firstName', 'lastName', 'pin', 'email', 'id'];
            for(var i = 0; i < fields.length; i++) {
                info[fields[i]] = brother[fields[i]];
            }
            if(!info.pin) {
              info.incomplete = true;
            } 
            info.positions = lodash.map(brother.Positions, 'dataValues.name'); 
            return info;
        });
    }
};

module.exports = functions;

