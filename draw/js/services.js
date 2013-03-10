'use strict';

// Services for the drawing module
// Data model for the current drawing
angular.module('SeedDraw.services', [])
    //.value('version', '0.1')
    .factory('DrawingService', function($rootScope) {
        var DrawingService = {};

        var drawing = {
            id : 0,
            name : "TestDrawing",
            brush : {
                id: 0,
                context: null,
                type: Brush.Radial,
                color: '000',
                size: 30,
                opacity: 1
            },
            background : {
                type: Background.Color,
                color: 'FFF',
                image: '',
                gradType: Gradient.Radial,
                gradStops: [
                    { stop: 0, color: 'FFF' },
                    { stop: .5, color: 'FFF' },
                    { stop: 1, color: '000' },
                ]
            },
            brushes : [
                //id=0,type=Brush.Marker,color='000',size=10,opacity=1
                [0, 0, '000', 10, 1],
                //id=1,type=Brush.Radial,color='000',size=10,opacity=1
                [1, 1, '000', 10, 1],
            ],
            layerIdx : 0,
            layers : [
                { 
                    index : 0,
                    context: null,
                    lines : [
                        {
                            x: [1,1,2,2,3,3,4,4,5,5],
                            y: [1,1,2,2,3,3,4,4,5,5],
                            brush: 1
                        }
                    ]
                },
                { 
                    index : 1,
                    context: null,
                    lines : [
                        {
                            x: [1,1,2,2,3,3,4,4,5,5],
                            y: [1,1,2,2,3,3,4,4,5,5],
                            brush: 0
                        }
                    ]
                }
            ],
            buffer : {
                context: null,
                prev: {
                    x:0,
                    y:0
                },
                x: [],
                y: [],
            }
        };

        DrawingService.GetEditing = function() {
            return drawing;
        }

        DrawingService.GetLayers = function() {
            return drawing.layers;
        }

        DrawingService.GetBuffer = function() {
            return drawing.buffer;
        }

        DrawingService.GetBrush = function() {
            return drawing.brush;
        } 

        DrawingService.SetBrushElement = function(element){
            drawing.brush.element = element;
        }

        DrawingService.SetBrushType = function(type){
            console.log("DrawingService.SetBrushType: " + type);
            drawing.brush.type = type;
            $rootScope.$broadcast('event:BrushChanged');
        }

        DrawingService.SetBrushSize = function(size){
            console.log("DrawingService.SetBrushSize: " + size);
            drawing.brush.size = size;
            $rootScope.$broadcast('event:BrushChanged');
        }

        DrawingService.SetBrushColor = function(color){
            drawing.brush.color = color;
            $rootScope.$broadcast('event:BrushChanged');
        }

        DrawingService.SetLayerContext = function(id, context){
            drawing.layer[id].context = context;
        }

        DrawingService.SetBufferContext = function(context){
            drawing.buffer.context = context;
        }

        DrawingService.SetPrevious = function(x, y){
            drawing.buffer.prev.x = x;
            drawing.buffer.prev.y = y;
        }

        DrawingService.PushToBuffer = function(x, y){
            drawing.buffer.x.push(x);
            drawing.buffer.y.push(y);
        }

        DrawingService.DrawBuffer = function() {
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
        }

        return DrawingService;
    })
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
    .factory('Brushes', function() {
        var BrushTypes = [
            {
                type: Brush.Marker,
                img: "img/Brushes/Marker.png"
            },
            {
                type: Brush.Radial,
                img: "img/Brushes/Radial.png"
            }
        ];
        
        return BrushTypes;
    });

function animator(DrawingService, animate) {
    (function tick() {
        DrawingService.DrawBuffer();
        animate(tick);
    })();
}
