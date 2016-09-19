
(function() {
    'use strict';

    var ctrl = function($scope, $state, user, userService) {
        $scope.user = user;

        $scope.headerLinks = {};
        if(user) {
            $scope.headerLinks.service = {
                submit: true
            };
            $scope.headerLinks.brother = true;
            $scope.headerLinks.profile = {
                signout: true
            };
            if(user.positions) {
                if(user.positions.indexOf('Service Chair') >= 0) {
                    $scope.headerLinks.service.approve = true;
                }
            }
            userService.authenticate()
            .then(function(authStatus) {
                if(authStatus.admin) {
                    $scope.headerLinks.service.approve = true;
                    $scope.headerLinks.profile.admin = true;
                }
            });
        }

        $scope.$on('$stateChangeSuccess', function(event, toState) {
            userService.authenticate()
            .then(function(authStatus) {
                if(authStatus.incomplete) {
                    $state.go('root.incomplete');
                }

                if(!toState.data ||
                  (!toState.data.authStatus && !toState.data.position)) {
                    return;
                }

                var requiredStatus = toState.data.authStatus;
                var requiredPosition = toState.data.position;
                if(requiredStatus && requiredStatus.length) {
                    for(var i = 0; i < requiredStatus.length; i++) {
                        if(authStatus[requiredStatus[i]]) {
                            return;
                        }
                    }
                } else if(requiredPosition && requiredPosition.length) {
                    if(authStatus.admin) {
                        // admin can do anything
                        return;
                    }

                    var positions = user.positions;
                    for(var j = 0; j < requiredPosition.length; j++) {
                        if(positions.indexOf(requiredPosition[j]) >= 0) {
                            return;
                        }
                    }
                }
                $state.go('root.home');
            });
        });
    };

    angular.module('KDRPoints')
        .controller('rootCtrl', ctrl);
}());

