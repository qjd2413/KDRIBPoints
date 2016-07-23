
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
          return data.data;
        }, function(err) {
          console.log(err);
          return null;
        });
    };

    return {
      // Returns authentication status(es) of current user
      // 'incomplete': a user that has an incomplete profile
      // 'user': regular user
      // 'admin': user with admin permissions
     authenticate: function() {
        return getHttp('/user/info')
          .then(function(info) {
            var auth_status = {};
            if(info && info.id) {
              auth_status.user = true;
              if(info.authStatus === 'eboard' || info.authStatus === 'sysadmin') {
                auth_status.admin = true;
              }
              if(info.incomplete) {
                auth_status.incomplete = true;
              }
            } 
            return auth_status;
          });
      },
      getUser: function() {
        return getHttp('/user/info')
          .then(function(info) {
            if(info && info.id) {
              user = info;
              user.name = info.firstName.charAt(0) + '. ' + info.lastName;
              return user;
            }
          });
      },
      updateUser: function(newUser) {
        return postHttp('/user/update', newUser)
          .then(function(stat) {
            return stat === 'OK';
          });
      }
    };
  };

  angular.module('KDRPoints')
    .factory('userService', ['$http', '$state', userService]);

})();
