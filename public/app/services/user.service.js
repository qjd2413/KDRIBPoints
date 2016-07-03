
(function() {

  var userService = function($http) {
    
    var getHttp = function(url) {
      return $http.get(url)
        .then(function(data) {
          return data.data;
        }, function(err) {
          console.log(err);
          return null;
        });
    };

    return {
      getUser: function() {
        
        return getHttp('/user/info')
          .then(function(info) {
            if(info && info.id) {
              user = {};
              user.name = info.firstName.charAt(0) + '. ' + info.lastName;
              user.id = info.id;
              return user;
            }
          });
      }
    };
  };

  angular.module('KDRPoints')
    .factory('userService', ['$http', userService]);

})();
