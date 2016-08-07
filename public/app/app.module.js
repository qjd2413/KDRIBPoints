
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


    var adminCtrl = function($scope, $state, AuthStatus) {
      if(!AuthStatus.admin) {
        $state.go('root.home');
      }
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
        })
        .state('root.brothers', {
          url: '/brothers',
          templateUrl: '/app/brothers/brothers.html',
          controller: 'brothersCtrl',
          resolve: {
            brothers: ['brotherService', function(brotherService) {
              return brotherService.getBrothers();
            }]
          }
        })
        .state('root.submitService', {
          url: '/serviceSubmission',
          templateUrl: 'app/submitService/submitService.html',
          controller: 'submitServiceCtrl'
        })
        .state('root.approveService', {
          url: '/approveService',
          templateUrl: 'app/approveService/approveService.html',
          controller: 'approveServiceCtrl',
          resolve: {
            approvableHours: ['serviceService', function(serviceService) {
              return serviceService.approvableHours();
            }]
          }
        })
        .state('root.admin', {
          url: '/admin',
          abstract: true,
          template: '<ui-view />',
          controller: ['$scope', '$state', 'AuthStatus', adminCtrl],
          resolve: {
            AuthStatus: ['userService', function(userService) {
              return userService.authenticate();
            }]
          }
        })
        .state('root.admin.home', {
          url: '/home',
          templateUrl: 'app/admin/home/home.html',
          controller: 'rootHomeCtrl',
          resolve: {
            brothers: ['brotherService', function(brotherService) {
              return brotherService.getBrothers();
            }],
            positions: ['positionService', function(positionService) {
              return positionService.getAllPositions();
            }]
          }
        })
        .state('root.events', {
          url: '/events',
          templateUrl: 'app/events/events.html',
          controller: 'eventsCtrl'
        });

        $urlRouterProvider.otherwise('/');

    };

    angular.module('KDRPoints', [
        'ui.router',
    ])
    .config(['$stateProvider', '$urlRouterProvider', KDRPoints]);
})();
