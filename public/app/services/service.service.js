
(function() {
    'use strict';

    var serviceService = function(httpService) {
        return {
            submit: function(hour) {
                return httpService.post('/service/submit', hour);
            },
            approvableHours: function() {
                return httpService.get('/service')
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
                return httpService.post('/service/approve', { hour: hourId });
            },
            reject: function(hourId) {
                return httpService.post('/service/reject', { hour: hourId });
            }
        };
    };

    angular.module('KDRPoints')
        .factory('serviceService', ['httpService', serviceService]);
}());
