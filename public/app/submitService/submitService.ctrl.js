
(function() {
    'use strict';

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
            serviceService.submit(cleanHour)
                .then(function() {
                    $scope.hour = {};
                    $scope.success = true;
                });
        };

        // remove success when new service hour is input
        $scope.$watch('hour', function() {
            $scope.success = false;
        }, true);
    };

    angular.module('KDRPoints')
        .controller('submitServiceCtrl', ['$scope', 'serviceService',
                                          submitServiceCtrl]);
}());

