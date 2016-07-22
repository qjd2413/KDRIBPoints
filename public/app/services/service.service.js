
(function() {

  var serviceService = function($http) {
    
    var getHttp = function(url) { return $http.get(url)
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
      submit: function(hour) {
        postHttp('/service/submit', hour);
      },
      approvableHours: function() {
        return getHttp('/service')
          .then(function(hours) {
            var approvable = [];
            for(var i = 0; i < hours.length; i++) {
                if(hours[i].state === 'u') {
                  hours[i].startTime = new Date(hours[i].startTime);
                  hours[i].endTime = new Date(hours[i].endTime);
                  hours[i].duration = hours[i].startTime - hours[i].endTime;
                  approvable.push(hours[i]);
                }
            }
            return approvable;
          });
      },
      approve: function(hourId) {
        return postHttp('/service/approve', { hour: hourId });
      },
      reject: function(hourId) {
        return postHttp('/service/reject', { hour: hourId });
      }
    };
  };

  angular.module('KDRPoints')
    .factory('serviceService', ['$http', serviceService]);

})();
