
(function() {
    'use strict';

    var rootCtrl = function($scope, $state, userService) {
      $scope.$on('$stateChangeStart', function(event, toState) {
        userService.authenticate()
          .then(function(auth_status) {
            console.log(auth_status, toState);
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
            template: '<ui-view />',
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
