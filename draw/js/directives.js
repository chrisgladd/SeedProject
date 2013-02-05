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
      controller: DrawingCtrl,
      template:
        '<div class="drawing">' +
		  '{{layers.length}} Layers'+
          '<canvas ng-repeat="layer in layers" ng-id="{{layer.id}}" class="DrawCanvas"></canvas>' +
		  //'<div class="DrawingContent" ng-transclude></div>'+
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
      template: '<canvas id="DrawingBrush"></canvas>',
      replace: true
    };
  });
