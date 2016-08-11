
(function() {
    'use strict';

    var dependencies = ['$scope', 'brothers'];
    var ctrl = function($scope, brothers) {
        $scope.brothers = brothers;
    };

    angular.module('KDRPoints')
    .controller('brothersCtrl', dependencies.concat(ctrl));
}());
