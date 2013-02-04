'use strict';

/* Directives */


angular.module('SeedDraw.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('drawing', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var layers = $scope.layers = [
			{ id : "Canvas0" },
			{ id : "Canvas1" },
			{ id : "Canvas2" },
			{ id : "Canvas3" }
		];
 
        $scope.select = function(layer) {
          angular.forEach(layers, function(layer) {
            layer.selected = false;
          });
          layer.selected = true;
        }
 
        this.addLayer = function(layer) {
          if (layers.length == 0) $scope.select(layer);
          layers.push(layer);
        }
      },
      template:
        '<div class="drawing">' +
		  '{{layers.length}} Layers'+
          '<canvas ng-repeat="layer in layers" ng-id="{{layer.id}}" class="DrawCanvas"></canvas>' +
		  '<div class="DrawingContent" ng-transclude></div>'+
        '</div>',
      replace: true
    };
  }).
  directive('brush', function() {
    return {
      require: '',
      restrict: 'E',
      transclude: true,
      scope: {  },
      link: function(scope, element, attrs, tabsCtrl) {
        //tabsCtrl.addPane(scope);
      },
      template:
        '<div class="DrawingCanvas" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  });