'use strict';

var models = require('../../models');

var SysAdmin = models.SysAdmin;


var functions = {
    // findAll
    // returns <promise>:
    //   every sysadmin stored in the database
    findAll: function() {
        return SysAdmin.findAll();
    },
    // isAdmin
    // params:
    //   BrotherId: self-explanatory
    // returns <promise>
    //   sequelize object if admin, null if not 
    isAdmin: function(BrotherId) {
        return SysAdmin.findOne({
            where: { BrotherId: BrotherId }
        });
    }
};

module.exports = functions;

