'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('SeedDraw.services', []).
    value('version', '0.1')
    .factory('animate', function($window, $rootScope) {
        var requestAnimationFrame = $window.requestAnimationFrame ||
        $window.mozRequestAnimationFrame ||
        $window.msRequestAnimationFrame ||
        $window.webkitRequestAnimationFrame ||
        function(callback, element){
            $window.setTimeout(callback, 1000/62);
        };

        console.log(requestAnimationFrame);

        return function(tick) {
            requestAnimationFrame(function() {
                $rootScope.$apply(tick);
            });
        };
    })
    .factory('DrawingService', function() {
        var DrawingService = {};
        var drawing = {};

    });
