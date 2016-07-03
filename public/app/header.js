angular.module('KDRPoints')
  .controller('header', ['$scope', 'userService', function($scope, userService) {
    
    userService.getUser()
      .then(function(user) {
        $scope.user = user;
      });

  }]);
