
(function() {
    'use strict';

    var months = ['January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December'];
    var hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    var minutes = ['00', '15', '30', '45'];

    var parseDate = function(date) {
        var month = months[date.getMonth()];
        var day = date.getDate();
        var year = date.getFullYear();
        var min = date.getMinutes();
        min = minutes[Math.floor(min / 15)];
        var hour = date.getHours();
        return {
            date: month + ' ' + day + ', ' + year,
            hour: (hour % 12).toString(),
            min: min,
            cycle: hour / 12 < 1 ? 'AM' : 'PM'
        };
    };

    var ctrl = function($scope, serviceService) {
        $scope.type = 'Hour';
        $scope.notify = {};

        $scope.hours = hours;
        $scope.minutes = minutes;

        var resetData = function() {
            $scope.hour = {};
            var endDate = new Date();
            var startDate = new Date(endDate.getTime() - (15 * 60000));

            $scope.hour.start = parseDate(startDate);
            $scope.hour.end = parseDate(endDate);
            $scope.hour.amount = 0;

            $scope.calculateDuration();
            $scope.calculateEquivalent();
        };

        $scope.submit = function() {
            var submission = serviceService.submit($scope.hour, $scope.type);
            if(submission.then) {
                submission.then(function(success) {
                    if(success) {
                        resetData();
                    } else {
                        $scope.notify.error = 'Submission failed.';
                        $scope.notify.success = null;
                    }
                });
            } else {
                $scope.notify.error = submission;
            }
        };

        $scope.calculateDuration = function() {
            var start = $scope.hour.start;
            var end = $scope.hour.end;
            var duration = null;
            try {
                duration = serviceService.calculateDuration(start, end);
            } catch(e) {
                $scope.notify.error = e;
                return;
            }
            $scope.hour.duration = duration;
        };

        $scope.calculateEquivalent = function() {
            var amount = $scope.hour.amount;
            var duration = null;
            try {
                duration = serviceService.calculateHourEquivalent(amount);
            } catch(e) {
                $scope.notify.error = e;
                return;
            }
            $scope.hour.equivalent = duration;
        };

        resetData();
    };

    angular.module('KDRPoints')
        .controller('serviceSubmitCtrl', ctrl);
}());

