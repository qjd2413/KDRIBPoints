
(function() {

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'];
  var hours = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  var minutes = ['00','15','30','45'];

  var parseDate = function(date) {
    var month = months[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var min = date.getMinutes();
    min = minutes[Math.floor(min / 15)];
    var hour = date.getHours();
    return {
      date: month + ' ' + day + ', ' + year,
      hour: (hour % 12).toString(),
      min: min,
      cycle: hour / 12 < 1 ? 'AM' : 'PM'
    }
  };

  var submitServiceCtrl = function($scope, serviceService) {
    $scope.type = 'Hour';
    $scope.notify = {};
    
    $scope.hours = hours;
    $scope.minutes = minutes;

    
    var submitInProgress = false;
    $scope.submit = function() {
      if(submitInProgress) {
        return;
      }
      submitInProgress = true; 
      var cleanHour = serviceService.cleanHour($scope.hour, $scope.type);
      if(typeof cleanHour === 'string') {
        submitInProgress = false;
        $scope.notify.error = cleanHour;
        return;
      }
      serviceService.submit(cleanHour)
        .then(function(success) {
          submitInProgress = false;
          if(success) {
            resetData();
          } else {
            $scope.notify.error = 'Submission failed.';
            $scope.notify.success = null;
          }
        });
      
    };
    
    $scope.calculateDuration = function() {
      var duration = serviceService.calculateDuration($scope.hour.start,
                                                      $scope.hour.end);
      if(typeof duration === 'string') {
        $scope.notify.error = duration;
        return;
      }
      $scope.hour.duration = duration;
    };

    $scope.calculateEquivalent = function() {
      var duration = serviceService.calculateHourEquivalent($scope.hour.amount);
      if(typeof duration === 'string') {
        $scope.notify.error = duration;
        return;
      }
      $scope.hour.equivalent = duration;
    };

    var resetData = function() {
      $scope.hour = {};
      var endDate = new Date();
      var startDate = new Date(endDate.getTime() - 15 * 60000); 

      $scope.hour.start = parseDate(startDate);
      $scope.hour.end = parseDate(endDate);
      $scope.hour.amount = 0;
      
      $scope.calculateDuration(); 
      $scope.calculateEquivalent();
    };
    resetData();
  }

  angular.module('KDRPoints')
    .controller('submitServiceCtrl', ['$scope', 'serviceService', submitServiceCtrl]);

})();

