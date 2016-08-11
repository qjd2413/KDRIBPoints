
(function() {
    'use strict';

    var brotherService = function($http) {
        var getHttp = function(url) {
            return $http.get(url)
                .then(function(data) {
                    return data.data;
                }, function() {
                    return null;
                });
        };

        return {
            getBrothers: function() {
                return getHttp('/brother');
            }
        };
    };

    angular.module('KDRPoints')
        .factory('brotherService', ['$http', brotherService]);
}());
