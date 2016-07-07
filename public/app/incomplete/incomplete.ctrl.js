
(function() {

  var incompleteCtrl = function($scope, userService) {
    userService.getUser()
      .then(function(user) {
        $scope.user = user;
      });

    $scope.submit = function() {
      user = $scope.user;
      console.log(user.pin, user.pin.match(/\d{1,3}/));
      if(user.pin && user.pin.match(/\d{1,3}/)) {
        userService.updateUser(user);
      } else {
        $scope.pin_error = true;
      }
    };
  }


  angular.module('KDRPoints')
    .controller('incompleteCtrl', ['$scope', 'userService', incompleteCtrl]);

})();

