
(function() {

  var serviceService = function($http) {
    
    var getHttp = function(url) { return $http.get(url)
        .then(function(data) {
          return data.data;
        }, function(err) {
          console.log(err);
          return null;
        });
    };

    var postHttp = function(url, data) {
      return $http.post(url, data)
        .then(function(data) {
          return data.data;
        }, function(err) {
          console.log(err);
          return null;
        });
    };

    var toDateObj = function(date) {
      var newDate = date.date + ' ' + date.hour + ':' + date.min + ' ' + date.cycle;
      newDate = new Date(Date.parse(newDate));
      return newDate.toString() !== 'Invalid Date' ? newDate : false;
    };

    var submitInProgress = false;

    return {
      cleanHour: function(hour, type) {
        var cleanHour = {};
        cleanHour.description = hour.description;
        if(!cleanHour.description) {
          return 'Description is required.';
        };
        if(type === 'Hour') {
          cleanHour.startTime = toDateObj(hour.start);
          cleanHour.endTime = toDateObj(hour.end); 
          if(!cleanHour.startTime || !cleanHour.endTime) {
            return 'Invalid Date';
          }
        } else {
          cleanHour.amount = hour.amount;
          if(cleanHour.amount < 0) {
            return 'Amount must be greater than zero.';
          }
        }
        return cleanHour;
      },
      calculateHourEquivalent: function(amount) {
        var amountToMinutes = amount / (5/60);
        if(amountToMinutes < 0) {
          return 'Amount must be greater than zero.';
        }
        duration = {
          hours: Math.floor(amountToMinutes / 60),
          minutes: amountToMinutes % 60
        };
        if(duration.minutes < 10) {
          duration.minutes = '0' + duration.minutes;
        }
        return duration;
      },
      calculateDuration: function(startDate, endDate) {
        startDate = toDateObj(startDate);
        endDate = toDateObj(endDate);
        var diffMinutes = (endDate - startDate) / 60000;
        if(diffMinutes < 0) {
          return 'Start date must be before end date.';
        }
        var duration = {
          hours: Math.floor(diffMinutes / 60),
          minutes: diffMinutes % 60
        };
        if(duration.minutes < 10) {
          duration.minutes = '0' + duration.minutes;
        }
        return duration;
      },
      submit: function(hour) {
        return postHttp('/service/submit', hour);
      },
      approvableHours: function() {
        return getHttp('/service')
          .then(function(hours) {
            var approvable = [];
            for(var i = 0; i < hours.length; i++) {
                if(!hours[i].lookedAt) {
                  if(hours[i].startTime) {
                    hours[i].startTime = new Date(hours[i].startTime);
                    hours[i].endTime = new Date(hours[i].endTime);
                    hours[i].duration = hours[i].startTime - hours[i].endTime;
                  }
                  approvable.push(hours[i]);
                }
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

})();
