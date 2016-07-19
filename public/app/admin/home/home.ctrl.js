
(function() {

  var rootHomeCtrl = function($scope, positionService, brothers, positions) {
    $scope.positions = positions;
    $scope.brothers = brothers;
    $scope.new_position = {};

    $scope.submit = function() {
      positionService.assign($scope.new_position.brother, $scope.new_position.position);
    };
  }


  angular.module('KDRPoints')
    .controller('rootHomeCtrl', ['$scope', 'positionService', 'brothers', 'positions', rootHomeCtrl]);

})();

