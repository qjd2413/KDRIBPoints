
(function() {
    'use strict';

    var serviceService = function($http) {
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
            submit: function(hour) {
                return postHttp('/service/submit', hour);
            },
            approvableHours: function() {
                return getHttp('/service')
                .then(function(hours) {
                    var approvable = [];
                    for(var i = 0; i < hours.length; i++) {
                        if(hours[i].lookedAt) {
                            continue;
                        }
                        if(hours[i].startTime) {
                            var start = new Date(hours[i].startTime);
                            var end = new Date(hours[i].endTime);
                            hours[i].duration = start - end;
                            hours[i].startTime = start;
                            hours[i].endTime = end;
                        }
                        approvable.push(hours[i]);
                    }
                    return approvable;
                });
            },
            approve: function(hourId) {
                return postHttp('/service/approve', { hour: hourId });
            },
            reject: function(hourId) {
                return postHttp('/service/reject', { hour: hourId });
            }
        };
    };

    angular.module('KDRPoints')
        .factory('serviceService', ['$http', serviceService]);
}());
