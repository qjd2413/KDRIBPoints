
(function() {
    'use strict';

    var approveServiceCtrl = function($scope, serviceService, approvableHours) {
        $scope.done = approvableHours.length === 0;
        $scope.nextServiceHour = approvableHours.shift();

        var next = function() {
            $scope.done = approvableHours.length === 0;
            if($scope.done) {
                $scope.nextServiceHour = null;
                return;
            }
            $scope.nextServiceHour = approvableHours.shift();
        };

        $scope.skip = next;
        $scope.approve = function() {
            serviceService.approve($scope.nextServiceHour.id)
        .then(function() {
            next();
        });
        };
        $scope.reject = function() {
            serviceService.reject($scope.nextServiceHour.id)
        .then(function() {
            next();
        });
        };
    };

    angular.module('KDRPoints')
    .controller('approveServiceCtrl', ['$scope', 'serviceService',
                                       'approvableHours', approveServiceCtrl]);
}());

