
(function() {
    'use strict';

    var KDRPoints = function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/home.html'
        })
        .state('new_user', {
            url: '/new_user',
            templateUrl: 'app/new_user/new_user.html'
        });

        $urlRouterProvider.otherwise('/');

    };

    angular.module('KDRPoints', [
        'ui.router',
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', KDRPoints]);
})();
