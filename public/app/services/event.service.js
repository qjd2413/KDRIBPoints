(function() {

  var eventService = function($http, $state) {
    
    var getHttp = function(url) {
      return $http.get(url)
        .then(function(data) {
          return data.data;
        }, function(err) {
          console.log(err);
          return null;
        });
    };

    var postHttp = function(url, data) {
      return $http.post(url, data)
        .then(function(data) {
          return data.data;
        }, function(err) {
          console.log(err);
          return null;
        });
    };

    return {
      getEvents: function() {
        return getHttp('/events')
          .then(function(events) {
              return events;
            }
          });
      },
      createEvent: function(description, point_value) {
        return postHttp('/events/new', newEvent)
          .then(function(stat) {
            return stat === 'OK';
          });
      }
    };
  };

  angular.module('KDRPoints')
    .factory('eventService', ['$http', '$state', eventService]);

})();
