
(function() {
    'use strict';

    var brothersCtrl = function($scope, brothers) {
        $scope.brothers = brothers;
    };

    angular.module('KDRPoints')
    .controller('brothersCtrl', ['$scope', 'brothers', brothersCtrl]);
}());
