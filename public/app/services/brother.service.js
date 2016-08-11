
(function() {
    'use strict';

    var brotherService = function(httpService) {
        return {
            getBrothers: function() {
                return httpService.get('/brother');
            }
        };
    };

    angular.module('KDRPoints')
        .factory('brotherService', ['httpService', brotherService]);
}());
