
(function() {
    'use strict';

    var KDRPoints = function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/home/home.html'
        })
        .state('incomplete', {
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
