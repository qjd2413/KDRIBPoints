
(function() {
    'use strict';

    angular.module('nosql', [
        'ui.router',
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        // Now set up the states
        $stateProvider
        .state('home', {
            url: '/'
        });

        $urlRouterProvider.otherwise('/');
    }]);
})();
