
(function() {
    'use strict';

    var httpService = function($http) {
        var wrapHttpPromise = function(promise) {
            return promise.then(function(response) {
                return response.data;
            }, function(err) {
                /* eslint-disable no-console */

                console.log(err);
                return null;

                /* eslint-enable */
            });
        };

        return {
            get: function(url, params) {
                var config = {
                    params: params
                };
                return wrapHttpPromise($http.get(url, config));
            },
            post: function(url, data, params) {
                var config = {
                    params: params
                };
                return wrapHttpPromise($http.post(url, data, config));
            }
        };
    };

    angular.module('KDRPoints')
        .factory('httpService', ['$http', httpService]);
}());
