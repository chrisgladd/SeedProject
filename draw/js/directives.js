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
      scope: {
          drawing:"="
      },
      controller: function($scope, $element) {
        $scope.drawing.layerIdx = 0;

        this.addLayer = function(layer) {
            $scope.drawing.layers[$scope.drawing.layerIdx].push(layer);
        }
      },
      template:
        '<div class="DrawingDirectiveTop">' +
          '<layer resize width="{{width}}" height="{{height}}" ng-repeat="layer in drawing.layers" layer="layer" ng-id="Layer{{layer.index}}" class="DrawCanvas"></layer>' +
		  //'<div class="DrawingContent" ng-transclude></div>'+
		  '<buffer resize width="{{width}}" height="{{height}}" buffer="drawing.buffer" ng-model="BufferCanvas" ng-id="BufferCanvas{{drawing.id}}" class="DrawCanvas"></buffer>'+
          '<mouse resize width="{{width}}" height="{{height}}" buffer="drawing.buffer" id="DrawMouseDiv" class="DrawCanvas"></mouse>'+
          '<brush resize width="{{width}}" height="{{height}}" brush="drawing.brush" ng-id="Brush{{drawing.id}}" class="DrawBrush"></brush>'+
        '</div>',
      replace: true
    };
  }).
  directive('layer', function() {
    return {
      require: '^drawing',
      restrict: 'E',
      transclude: true,
      scope: {
          layer:"="
      },
      controller: function($scope, $element) {
        $scope.layer.context = $element[0].getContext('2d');
      },
      link:function (scope, element, attrs) {
      },
      template: '<canvas></canvas>',
      replace: true
    };
  }).
  directive('buffer', function() {
    return {
      require: '^drawing',
      restrict: 'E',
      transclude: true,
      scope: {
          buffer:"="
      },
      controller: function($scope, $element) {
        $scope.buffer.context = $element[0].getContext('2d');
      },
      link:function (scope, element, attrs) {
      },
      template: '<canvas></canvas>',
      replace: true
    };
  }).
  directive('brush', function() {
    return {
      require: '^drawing',
      restrict: 'E',
      transclude: true,
      scope: {
          brush:"="
      },
      controller: function($scope, $element) {
        $scope.RedrawBrush = function() {
            if(!$scope.brush.element){
                $scope.brush.element = $element[0];
            }

            var size = $scope.brush.size;
            var center = $scope.brush.size / 2;

            var ctx = $scope.brush.element.getContext('2d');
            ctx.clearRect(0,0,size,size);
            //Redraw the brush
            if($scope.brush.type == Brush.Marker){
                ctx.beginPath();
                ctx.arc(center, center, center, 0, 2 * Math.PI, false);
                ctx.fillStyle = "#"+$scope.brush.color;
                ctx.fill();
                ctx.closePath();
            }
        };
      },
      link:function (scope, element, attrs) {
        scope.$watch(scope.brush, function (type) {
            scope.RedrawBrush();
        });
      },
      template: '<canvas></canvas>',
      replace: true
    };
  }).
  directive('mouse', function() {
    return {
      require: '^drawing',
      restrict: 'E',
      transclude: true,
      scope: {
          buffer:"="
      },
      link: function(scope, element, attrs, drawCtrl) {
        element.bind("mousedown", function() {
            console.log("Mouse down hit");
            scope.isMouseDown = true;
        });

        element.bind("mousemove", function(e) {
            //console.log("Mouse move hit");
            if(scope.isMouseDown){
                scope.buffer.x.push(e.x);
                scope.buffer.y.push(e.y);
            }
        });

        element.bind("mouseup", function() {
            console.log("Mouse up hit");
            scope.isMouseDown = false;
        });

        element.bind("mouseleave", function() {
            console.log("Mouse leave hit");
        });

        element.bind("touchstart", function() {
            console.log("Touch start hit");
        });

        element.bind("touchmove", function() {
            console.log("touch move hit");
        });

        element.bind("touchend", function() {
            console.log("touch end hit");
        });
      },
      template: '<canvas id="DrawingBrush"></canvas>',
      replace: true
    };
  })
  .directive('resize', function ($window) {
    return function (scope) {
        scope.width = $window.innerWidth;
        scope.height = $window.innerHeight;
        angular.element($window).bind('resize', function () {
            scope.$apply(function () {
                scope.width = $window.innerWidth;
                scope.height = $window.innerHeight;
            });
        });
        };
  })
  .factory('animate', function($window, $rootScope) {
      var requestAnimationFrame = $window.requestAnimationFrame ||
           $window.mozRequestAnimationFrame ||
           $window.msRequestAnimationFrame ||
           $window.webkitRequestAnimationFrame;
       
      
       return function(tick) {
           requestAnimationFrame(function() {
               $rootScope.$apply(tick);
           });
       };
  });


function animator(drawing, animate) {
    (function tick() {
        if(drawing.brush.element && drawing.buffer.x.length >= 0){
            var size = drawing.brush.size;
            var off = size/2;
            var imgData = drawing.brush.element;
            //drawing.brush.context.getImageData(0,0,size,size);

            var context = drawing.buffer.context;
            for(var i = 0; i < drawing.buffer.x.length; i++){
                context.drawImage(imgData, drawing.buffer.x[i]-off, drawing.buffer.y[i]-off);
                //, 0, 0, size, size);
            }
        }
        animate(tick);
    })();
}

