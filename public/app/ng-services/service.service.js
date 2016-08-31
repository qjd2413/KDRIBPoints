
(function() {
    'use strict';

    var toDateObj = function(date) {
        var newDate = date.date + ' ' + date.hour + ':' +
                      date.min + ' ' + date.cycle;
        newDate = new Date(Date.parse(newDate));
        return newDate.toString() === 'Invalid Date' ? false : newDate;
    };

    var cleanHour = function(hour, type) {
        var cleanedHour = {};
        cleanedHour.description = hour.description;
        if(!cleanedHour.description) {
            throw 'Description is required.';
        }
        if(type === 'Hour') {
            cleanedHour.startTime = toDateObj(hour.start);
            cleanedHour.endTime = toDateObj(hour.end);
            if(!cleanedHour.startTime || !cleanedHour.endTime) {
                throw 'Invalid Date';
            }
        } else {
            cleanedHour.amount = hour.amount;
            if(cleanedHour.amount < 0) {
                throw 'Amount must be greater than zero.';
            }
        }
        return cleanedHour;
    };

    var submitInProgress = false;

    var serviceService = function(httpService) {
        return {
            calculateHourEquivalent: function(amount) {
                var hour = 60;
                var scale = 60 / 5;
                var amountToMinutes = amount * scale;
                if(amountToMinutes < 0) {
                    throw 'Amount must be greater than zero.';
                }
                var duration = {
                    hours: Math.floor(amountToMinutes / hour),
                    minutes: amountToMinutes % hour
                };
                if(duration.minutes < 10) {
                    duration.minutes = '0' + duration.minutes;
                }
                return duration;
            },
            calculateDuration: function(start, end) {
                var startDate = toDateObj(start);
                var endDate = toDateObj(end);

                var diffMinutes = (endDate - startDate) / 60000;
                if(diffMinutes < 0) {
                    throw 'Start date must be before end date.';
                }
                var hour = 60;
                var duration = {
                    hours: Math.floor(diffMinutes / hour),
                    minutes: diffMinutes % hour
                };
                if(duration.minutes < 10) {
                    duration.minutes = '0' + duration.minutes;
                }
                return duration;
            },
            submit: function(hour, type) {
                if(submitInProgress) {
                    return;
                }
                submitInProgress = true;
                var cleanedHour = null;
                try {
                    cleanedHour = cleanHour(hour, type);
                } catch(e) {
                    submitInProgress = false;
                    throw e;
                }
                return httpService.post('/service/submit', cleanedHour)
                    .then(function(success) {
                        submitInProgress = false;
                        return success;
                    })
                    .catch(function() {
                        submitInProgress = false;
                        return false;
                    });
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
        .factory('serviceService', serviceService);
}());
