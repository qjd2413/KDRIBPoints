
(function() {

  var incompleteCtrl = function($scope, $state, userService) {
    userService.getUser()
      .then(function(user) {
        $scope.user = user;
      });

    $scope.submit = function() {
      user = $scope.user;
      if(user.pin && user.pin.toString().match(/\d{1,3}/)) {
        userService.updateUser(user)
          .then(function(success) {
            if(success) {
              $state.go('root.home')
            }
          });
      } else {
        $scope.pin_error = true;
      }
    };
  }


  angular.module('KDRPoints')
    .controller('incompleteCtrl', ['$scope', '$state', 'userService', incompleteCtrl]);

})();

