
(function() {
    'use strict';

    var dependencies = ['$scope', '$state', 'userService'];
    var ctrl = function($scope, $state, userService) {
        userService.getUser()
            .then(function(user) {
                $scope.user = user;
            });

        $scope.submit = function() {
            var user = $scope.user;
            if(user.pin && user.pin.toString().match(/\d{1,3}/)) {
                userService.updateUser(user)
                    .then(function(success) {
                        if(success) {
                            $state.go('root.home');
                        }
                    });
            } else {
                $scope.pinError = true;
            }
        };
    };

    angular.module('KDRPoints')
        .controller('incompleteCtrl', dependencies.concat(ctrl));
}());

