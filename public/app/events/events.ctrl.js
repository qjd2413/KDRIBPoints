
(function() {

  var eventsCtrl = function($scope, $state, eventService) {
    eventService.getEvents()
      .then(function(events) {
        $scope.events = events;
      });

    $scope.addEvent = function() {
      eventDescription = $scope.eventDescription;
      eventPointValue = $scope.eventPointValue;
      eventService.createEvent(eventDescription, eventPointValue)
        .then(function(success) {
          if(success) {
            $state.go('root.events')
          }
        });
    } 
      
  angular.module('KDRPoints')
    .controller('eventsCtrl', ['$scope', '$state', 'eventService', eventsCtrl]);

})();

