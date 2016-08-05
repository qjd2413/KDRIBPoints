'use strict';

var models = require('../../models');

var Position = models.Position;


var functions = {
    // findAll
    // returns <promise>:
    //   every position stored in the database
    findAll: function() {
        return Position.findAll();
    },
    // heldBy
    // params: 
    //   BrotherId: self-explanatory
    // returns <promise>:
    //   all positions held by brother specified by parameter
    heldBy: function(BrotherId) {
        return Position.findAll({
            where: { BrotherId: BrotherId }
        });
    },
    // assign
    // params:
    //   brother: id of brother to be assigned
    //   position: id of position to be assigned
    // returns <promise>:
    //   resolved when query is successful
    assign: function(brother, position) {
        return Position.update(
            { BrotherId: brother },
            {
                where: { id: position},
                fields: ['BrotherId']
            }
        );
    }
};

module.exports = functions;

