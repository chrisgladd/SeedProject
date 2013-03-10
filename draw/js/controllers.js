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

function DrawCtrl($scope, $location, DrawingService, animate, Brushes) {
    $scope.menuOpen = false;
    $scope.sliderText = "+";
    $scope.tips = Brushes;
    $scope.pencilOpen = false;
    $scope.brushSize = 25;

    animator(DrawingService, animate);

    $scope.menu = function() {
        $scope.menuOpen = !$scope.menuOpen;
        $scope.sliderText = $scope.menuOpen ? "X" : "+";
    };

    $scope.pencil = function() {
        $scope.pencilOpen = !$scope.pencilOpen;
    };

    $scope.setBrushType = function(type) {
        console.log("BrushType: " + type);
        DrawingService.SetBrushType(type);
    };

    $scope.$watch("brushSize", function(value) {
        DrawingService.SetBrushSize(value);
    });

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

