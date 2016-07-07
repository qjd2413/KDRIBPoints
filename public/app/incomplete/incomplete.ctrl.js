
(function() {

  var incompleteCtrl = function($scope, $state, userService) {
    userService.getUser()
      .then(function(user) {
        $scope.user = user;
      });

    $scope.submit = function() {
      user = $scope.user;
      console.log(user.pin, user.pin.match(/\d{1,3}/));
      if(user.pin && user.pin.match(/\d{1,3}/)) {
        userService.updateUser(user)
          .then(function(success) {
            if(success) {
              $state.go('home')
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

