
(function() {
    'use strict';

    var rootHomeCtrl = function($scope, positionService, brothers, positions) {
        $scope.positions = positions;
        $scope.brothers = brothers;
        $scope.newPosition = {};

        $scope.submit = function() {
            var brother = $scope.newPosition.brother;
            var position = $scope.newPosition.position;
            positionService.assign(brother, position);
        };
    };

    angular.module('KDRPoints')
    .controller('rootHomeCtrl', ['$scope', 'positionService',
                                 'brothers', 'positions', rootHomeCtrl]);
}());

