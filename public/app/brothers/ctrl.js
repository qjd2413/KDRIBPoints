
(function() {
    'use strict';

    var ctrl = function($scope, brothers) {
        $scope.brothers = brothers;
    };

    angular.module('KDRPoints')
    .controller('brothersCtrl', ctrl);
}());
