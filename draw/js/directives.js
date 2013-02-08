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
            var color = $scope.brush.color;
            var cint = parseInt(color, 16);
            var rgb = "rgba("+((cint >> 16) & 255)+","+((cint >> 8) & 255)+","+(cint & 255);

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
            else if($scope.brush.type == Brush.Radial){
                var width = size;//*.95;
                
                //ctx.beginPath();
                //ctx.arc(center,center,center,0,Math.PI*2,false);
                //ctx.closePath();
                //ctx.clip();
                
                var gradient = ctx.createRadialGradient(center,center,0,center,center,center);  
                gradient.addColorStop(0, rgb+",1)");
                gradient.addColorStop(.5, rgb+",.3)");
                gradient.addColorStop(1, rgb+",0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0,0,size,size);
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
        element.bind("mousedown", function(e) {
            console.log("Mouse down hit");
            scope.isMouseDown = true;
            scope.buffer.prev.x = e.x;
            scope.buffer.prev.y = e.y;
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

        element.bind("mouseleave", function(e) {
            console.log("Mouse leave hit");
            scope.isMouseDown = false;
        });

        element.bind("touchstart", function(e) {
            e.preventDefault();
            
            scope.isMouseDown = true;
            var x = e.targetTouches[0].clientX;
            var y = e.targetTouches[0].clientY;
            scope.buffer.prev.x = x;
            scope.buffer.prev.y = y;
        });

        element.bind("touchmove", function(e) {
            e.preventDefault();
            if(scope.isMouseDown){
                var x = e.targetTouches[0].clientX;
                var y = e.targetTouches[0].clientY;
                scope.buffer.x.push(x);
                scope.buffer.y.push(y);
            }
        });

        element.bind("touchend", function(e) {
            e.preventDefault();
            console.log("touch end hit");
            scope.isMouseDown = false;
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
.directive('sTap', function() {
    //Thanks to GoodFilms for the inpiration
    //http://goodfil.ms/blog/posts/2012/08/13/angularjs-and-the-goodfilms-mobile-site-part-1/
    return function(scope, element, attrs) {
        tapping = false;
        element.bind('touchstart', function() {
            tapping = true;
        });
        element.bind('touchmove', function() {
            tapping = false;
        });
        element.bind('touchstart', function() {
            if(tapping){
                scope.$apply(attrs['gfTap']);
            }
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

                var xdiff = drawing.buffer.x[i]-drawing.buffer.prev.x;
                var ydiff = drawing.buffer.y[i]-drawing.buffer.prev.y;
                var steps = Math.abs(xdiff) > Math.abs(ydiff) ? Math.abs(xdiff) : Math.abs(ydiff);

                if(steps != 0){
                    var xstep = xdiff / steps;
                    var ystep = ydiff / steps;
                    var xsc = 0;
                    var ysc = 0;

                    for(var k = 1; k < steps+1; k++){
                        context.drawImage(imgData, drawing.buffer.x[i]-off+xsc, drawing.buffer.y[i]-off+ysc);
                        xsc -= xstep;
                        ysc -= ystep;
                    }
                }
                drawing.buffer.prev.x = drawing.buffer.x[i];
                drawing.buffer.prev.y = drawing.buffer.y[i];
            }
            drawing.buffer.x=[];
            drawing.buffer.y=[];
        }
        animate(tick);
    })();
}

