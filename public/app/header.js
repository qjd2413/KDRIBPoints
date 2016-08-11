
(function() {
    'use strict';

    var headerCtrl = function($scope, userService) {
        userService.getUser()
            .then(function(user) {
                $scope.user = user;
            });
    };

    angular.module('KDRPoints')
        .controller('header', ['$scope', 'userService', headerCtrl]);
}());
