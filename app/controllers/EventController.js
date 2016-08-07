
(function() {
  'use strict';

  var models = require('../../models');
  var Event = models.Event;
  var Brother = models.Brother;

  module.exports = {
    findAll: function() {
      return Event.findAll({
        //include: [Brother]
      });
    },
    newEvent: function(event_info) {
      return Event.create(event_info);
    }
  };

})();
