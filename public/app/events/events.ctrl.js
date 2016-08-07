
(function() {

  var eventsCtrl = function($scope, $state, eventService) {
    eventService.getEvents()
      .then(function(events) {
        $scope.events = events;
      });

    $scope.addEvent = function() {
      eventService.createEvent($scope.event)
        .then(function() {
          $scope.events.unshift($scope.event);
          $scope.event = {};
        });
    } 

  };
      
  angular.module('KDRPoints')
    .controller('eventsCtrl', ['$scope', '$state', 'eventService', eventsCtrl]);

})();

