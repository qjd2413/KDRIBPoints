
(function() {
    'use strict';

    var rootCtrl = function($scope, $state, userService) {
      $scope.$on('$stateChangeSuccess', function(event, toState) {
        userService.authenticate()
          .then(function(auth_status) {
            if(auth_status.incomplete) {
              $state.go('root.incomplete');
            }
            if(toState.name === 'root.incomplete' && !auth_status.incomplete) {
              $state.go('root.home');
            }
          });
      });
    }

    var KDRPoints = function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('root', {
            url: '',
            abstract: true,
            controller: ['$scope', '$state', 'userService', rootCtrl],
            templateUrl: 'root.html',
            resolve: {
              user: ['userService', function(userService) {
                  return userService.getUser();
              }]
            }
        })
          .state('root.home', {
            url: '/',
            templateUrl: 'app/home/home.html'
          })
          .state('root.incomplete', {
              url: '/incomplete',
              templateUrl: 'app/incomplete/incomplete.html',
              controller: 'incompleteCtrl',
          });

        $urlRouterProvider.otherwise('/');

    };

    angular.module('KDRPoints', [
        'ui.router',
    ])
    .config(['$stateProvider', '$urlRouterProvider', KDRPoints]);
})();
