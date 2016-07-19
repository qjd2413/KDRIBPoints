
(function() {

  var positionService = function($http) {
    
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
      getAllPositions: function() {
        return getHttp('position/list');
      }
    };
  };

  angular.module('KDRPoints')
    .factory('positionService', ['$http', positionService]);

})();
