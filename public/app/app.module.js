
(function() {
    'use strict';

    var KDRPoints = function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                controller: 'rootCtrl',
                templateUrl: 'root.html',
                resolve: {
                    user: ['userService', function(userService) {
                        return userService.getUser();
                    }]
                }
            })
        .state('root.home', {
            url: '/',
            templateUrl: 'app/home/template.html',
        })
        .state('root.incomplete', {
            url: '/incomplete',
            templateUrl: 'app/incomplete/template.html',
            controller: 'incompleteCtrl',
            data: ['incomplete']
        })
        .state('root.brothers', {
            url: '/brothers',
            templateUrl: '/app/brothers/template.html',
            controller: 'brothersCtrl',
            resolve: {
                brothers: ['brotherService', function(brotherService) {
                    return brotherService.getBrothers();
                }]
            }
        })
        .state('root.service', {
            url: '/service',
            abstract: true,
            template: '<ui-view />'
        })
        .state('root.service.submit', {
            url: '/submit',
            templateUrl: 'app/service/submit/template.html',
            controller: 'serviceSubmitCtrl'
        })
        .state('root.service.approve', {
            url: '/approve',
            templateUrl: 'app/service/approve/template.html',
            controller: 'serviceApproveCtrl',
            resolve: {
                approvableHours: ['serviceService', function(serviceService) {
                    return serviceService.approvableHours();
                }]
            },
            data: {
                position: ['Service Chair']
            }
        })
        .state('root.admin', {
            url: '/admin',
            abstract: true,
            template: '<ui-view />',
            data: {
                authStatus: ['admin']
            }
        })
        .state('root.admin.home', {
            url: '/',
            templateUrl: 'app/admin/template.html',
            controller: 'adminCtrl',
            resolve: {
                brothers: ['brotherService', function(brotherService) {
                    return brotherService.getBrothers();
                }],
                positions: ['positionService', function(positionService) {
                    return positionService.getAllPositions();
                }]
            }
        });

        $urlRouterProvider.otherwise('/');
    };

    angular.module('KDRPoints', [
        'ui.router',
        '720kb.datepicker'
    ]).config(KDRPoints);
}());
