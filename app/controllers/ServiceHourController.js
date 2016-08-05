'use strict';

var models = require('../../models');
var ServiceHour = models.ServiceHour;
var Brother = models.Brother;

module.exports = {
    // findAll
    // returns <promise>:
    //   every hour stored in the database, with relations
    findAll: function() {
        return ServiceHour.findAll({
            include: [Brother]
        });
    },
    // submit
    // params:
    //   BrotherId: self-explanatory
    //   hour: data about hour to be submitted
    // returns <promise>:
    //   resolved when successfully submitted
    submit: function(brotherId, hour) {
        hour.BrotherId = brotherId;
        hour.lookedAt = false;
        return ServiceHour.create(hour);
    },
    // approve
    // params:
    //   hourId: self-explanatory
    // returns <promise>:
    //   resolved when successfully updated
    approve: function(hourId) {
        return ServiceHour.update(
            { lookedAt: true, approved: true },
            {
                where: { id: hourId }
            }
        );
    },
    // reject
    // params:
    //   hourId: self-explanatory
    // returns <promise>:
    //   resolved when successfully updated
    reject: function(hourId) {
        return ServiceHour.update(
            { lookedAt: true, approved: false },
            {
                where: { id: hourId }
            }
        );
    }
};

