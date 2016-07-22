
(function() {

  var submitServiceCtrl = function($scope, serviceService) {
    $scope.type = 'Hour';
    $scope.hour = {};

    $scope.submit = function() {
      var cleanHour = {};
      var hour = $scope.hour;
      cleanHour.description = hour.description;
      if($scope.type === 'Hour') {
        cleanHour.startTime = hour.startTime;
        cleanHour.endTime = hour.endTime;
      } else {
        cleanHour.amount = hour.amount;
      }
      serviceService.submit(cleanHour);
    };
  }

  angular.module('KDRPoints')
    .controller('submitServiceCtrl', ['$scope', 'serviceService', submitServiceCtrl]);

})();

