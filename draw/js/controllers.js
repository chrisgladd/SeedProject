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


function DrawCtrl($scope, $location) {
    $scope.menuOpen = false;
    $scope.sliderText = "<";

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

function DrawingCtrl($scope, $element) {
    var layers = $scope.layers = [
    { id : "Canvas0" },
    { id : "Canvas1" },
    { id : "Canvas2" },
    { id : "Canvas3" }
    ];

    var brush = $scope.brush = {
        type: Brush.Marker,
        color: '000',
        size: 10,
        opacity: 1
    };

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
