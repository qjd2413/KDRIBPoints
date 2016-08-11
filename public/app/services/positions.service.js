
(function() {
    'use strict';
    var positionService = function($http) {
        var getHttp = function(url) {
            return $http.get(url)
                .then(function(data) {
                    return data.data;
                }, function() {
                    return null;
                });
        };

        var postHttp = function(url, data) {
            return $http.post(url, data)
                .then(function(response) {
                    return response.data;
                }, function() {
                    return null;
                });
        };

        return {
            getAllPositions: function() {
                return getHttp('position/');
            },
            assign: function(brother, position) {
                if(brother && position) {
                    postHttp('position/assign',
                            { brother: brother.id, position: position.id }
                            );
                }
            }
        };
    };

    angular.module('KDRPoints')
        .factory('positionService', ['$http', positionService]);
}());
