'use strict';

//Development Flag
var D = true;

/* Controllers */

function SplashCtrl($scope, $location) {
    $scope.skip = function() {
        $location.path('/login/');
    };
}

function LoginCtrl($scope, $location) {
    if(D){
        $scope.loginEmail = "cmg301@gmail.com";
        $scope.loginPass = "blkajdf";
    }

    $scope.login = function() {
        $location.path('/menu/');
    };
}

function MenuCtrl($scope, $location) {
    $scope.load = function(newLoc) {
        $location.path('/'+newLoc+'/');
    };
}

function DrawCtrl($scope, $location, animate) {
    $scope.menuOpen = false;
    $scope.sliderText = "<";

    $scope.ctrlDrawing = {
        id : 0,
        name : "TestDrawing",
        brush : {
            id: 0,
            context: null,
            type: Brush.Marker,
            color: '000',
            size: 10,
            opacity: 1
        },
        layerIdx : 0,
        layers : [
            { 
                index : 0,
                context: null,
                lines : [
                    {
                        x: [1,1,2,2,3,3,4,4,5,5],
                        y: [1,1,2,2,3,3,4,4,5,5],
                        brush: [0, 0, 10, 1]
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
                        brush: [0, 0, 10, 1]
                    }
                ]
            }
        ],
        buffer : {
            context: null,
            x: [1,1,2,2,3,3,4,4,5,5],
            y: [1,1,2,2,3,3,4,4,5,5],
        }
    };

    animator($scope.ctrlDrawing, animate);

    $scope.menu = function() {
        $scope.menuOpen = !$scope.menuOpen;
        $scope.sliderText = $scope.menuOpen ? ">" : "<";
    };

    $scope.pencil = function() {
        $scope.pencilOpen = !$scope.pencilOpen;
    };

    $scope.erase = function() {
        $scope.eraseOpen = !$scope.eraseOpen;
    };

    $scope.undo = function() {

    };

    $scope.layer = function() {

    };

    $scope.palette = function() {

    };

    $scope.save = function() {

    };

    $scope.back = function() {
        $location.path('/menu/');
    };
}

function BranchCtrl() {
}


function ReplayCtrl() {
}


function HistCtrl() {
}


function SetCtrl() {
}
//SetCtrl.$inject = [];

