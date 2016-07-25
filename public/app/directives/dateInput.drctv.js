(function() {
  var months = [
    { id: 1, name: 'January' }, { id: 2, name: 'February' }, 
    { id: 3, name: 'March' }, { id: 4, name: 'April' },
    { id: 5, name: 'May' }, { id: 6, name: 'June' },
    { id: 7, name: 'July' }, { id: 8, name: 'August' },
    { id: 9, name: 'September' }, { id: 10, name: 'October' },
    { id: 11, name: 'November' }, { id: 12, name: 'December' }
  ];

  var monthToDays = function(month, year) {
    if(month === 2) {
      return (year % 4) ? 28 : 29;
    } else if(month < 8) {
      return 30 + month % 2;
    } else {
      return 30 + (month+1) % 2;
    }
  };
  
  var verifyDate = function(date) {
    date.min = parseInt(date.min);
    var validHour = date.hour <= 12 && date.hour >= 1;
    var validMin = date.min <=59 && date.min >= 0;
    var validDay = date.day < monthToDays(date.month, date.year);
    var currentDate = new Date();
    return (currentDate >= revParseDate(date)) && validHour && validMin && validDay;
  };

  var revParseDate = function(date) {
    return new Date(date.year, date.month-1, date.day, date.hour, date.min);
  };

  var dateInputDirective = function() {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        date: '=',
        notify: '=',
        changeFn: '&'
      },
      templateUrl: 'app/directives/templates/dateInput.html',
      link: function(scope) {
        scope.months = months;
        scope.changeFunction = function() {
          scope.notify = {};
          if(!verifyDate(scope.date)) {
            scope.notify.error = 'Invalid Date.';
            return;
          }
          if(scope.changeFn) scope.notify.error = scope.changeFn();
        };

      }
    }
  };

  angular.module('KDRPoints')
    .directive('dateInput', dateInputDirective);
})();
