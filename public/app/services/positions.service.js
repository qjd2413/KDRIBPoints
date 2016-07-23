
(function() {

  var positionService = function($http) {
    
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
      getAllPositions: function() {
        return getHttp('position/list');
      },
      assign: function(brother, position) {
        if(brother && position) {
          postHttp('position/assign',
              { brother: brother.id, position: position.id }
          );
        }
      }
    };
  };

  angular.module('KDRPoints')
    .factory('positionService', ['$http', positionService]);

})();
