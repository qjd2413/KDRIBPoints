
(function() {

  var userService = function($http, $state) {
    
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
          return data.data
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
              if(info.incomplete && !$state.includes('incomplete')) {
                $state.go('incomplete');
                return;
              }
              user = {};
              user.name = info.firstName.charAt(0) + '. ' + info.lastName;
              user.id = info.id;
              return user;
            }
          });
      },
      updateUser: function(newUser) {
        return postHttp('/user/update', newUser)
          .then(function(stat) {
            return stat;
          });
      }
    };
  };

  angular.module('KDRPoints')
    .factory('userService', ['$http', '$state', userService]);

})();
