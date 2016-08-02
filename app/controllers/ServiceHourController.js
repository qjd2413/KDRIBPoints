
(function() {
  'use strict';

  var models = require('../../models');
  var ServiceHour = models.ServiceHour;
  var Brother = models.Brother;

  module.exports = {
    findAll: function() {
      return ServiceHour.findAll({
        include: [Brother]
      });
    },
    submit: function(brotherId, hours) {
      hours.BrotherId = brotherId;
      hours.lookedAt = false;
      return ServiceHour.create(hours);
    },
    approve: function(hourId) {
      return ServiceHour.update(
          { lookedAt: true, approved: true },
          {
            where: { id: hourId }
          }
      );
    },
    reject: function(hourId) {
      return ServiceHour.update(
          { lookedAt: true, approved: false },
          {
            where: { id: hourId }
          }
      );
    }
  };

})();
