
(function() {

  var approveServiceCtrl = function($scope, serviceService, approvableHours) {
    $scope.done = approvableHours.length === 0;
    $scope.currentHour = approvableHours.shift();
    
    var next = function() {
      console.log(approvableHours);
      $scope.done = approvableHours.length === 0;
      if($scope.done) {
        $scope.currentHour = null;
        return;
      }
      $scope.currentHour = approvableHours.shift();
    }

    $scope.skip = next;
    $scope.approve = function() {
      serviceService.approve($scope.currentHour.id)
        .then(function() {
          next();
        });
    };
    $scope.reject = function() {
      serviceService.reject($scope.currentHour.id)
        .then(function() {
          next();
        });
    };
  }

  angular.module('KDRPoints')
    .controller('approveServiceCtrl', ['$scope', 'serviceService', 'approvableHours', approveServiceCtrl]);

})();

